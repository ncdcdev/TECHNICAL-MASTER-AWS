import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { helloWorldFunction } from "./function/helloWorld/resource";
import { bedrockChatFunction } from "./function/bedrockChat/resource";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Tags } from "aws-cdk-lib";
// 第10章 REST API用のインポート
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import { fileURLToPath } from "url";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export const backend = defineBackend({
  auth,
  data,
  helloWorldFunction,
  bedrockChatFunction,
});

// タグの設定
const tags = Tags.of(backend.stack);
tags.add("Billing", "aws-ai-chat");
tags.add("Project", "aws-ai-chat");
tags.add("Environment", "development");

backend.bedrockChatFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:InvokeModel"],
    resources: [
      "arn:aws:bedrock:*::foundation-model/*",
      "arn:aws:bedrock:*:*:inference-profile/*",
      "arn:aws:bedrock:*:*:application-inference-profile/*",
    ],
  }),
);

// DynamoDBテーブルへのアクセス権限を追加
backend.bedrockChatFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:Query"],
    resources: [
      backend.data.resources.tables["Conversation"].tableArn,
      backend.data.resources.tables["Message"].tableArn,
    ],
  }),
);

// 環境変数にテーブル名を設定
backend.bedrockChatFunction.addEnvironment(
  "CONVERSATION_TABLE_NAME",
  backend.data.resources.tables["Conversation"].tableName,
);
backend.bedrockChatFunction.addEnvironment(
  "MESSAGE_TABLE_NAME",
  backend.data.resources.tables["Message"].tableName,
);

// 第10章: REST API用のスタックを作成
const ch10ApiStack = backend.createStack("Chapter10RestApiStack");

// Lambda関数を作成
const lambdaFunction = new NodejsFunction(
  ch10ApiStack,
  "Chapter10LambdaFunction",
  {
    runtime: lambda.Runtime.NODEJS_22_X, // 使用しているNode.jsのバージョンに変更してください
    handler: "handler",
    entry: path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "function/restApi/users/index.ts",
    ),
    bundling: {
      externalModules: ["aws-sdk"], // AWS SDKは外部モジュールとして除外
      minify: true,
      sourceMap: true,
    },
  },
);

// API Gatewayを作成
const api = new apigateway.RestApi(ch10ApiStack, "Chapter10RestApi", {
  restApiName: "Chapter10_REST_API",
  defaultCorsPreflightOptions: {
    allowOrigins: ["*"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  },
});

// /usersリソースとメソッドを追加
const usersResource = api.root.addResource("users");
usersResource.addMethod(
  "GET",
  new apigateway.LambdaIntegration(lambdaFunction),
);
usersResource.addMethod(
  "POST",
  new apigateway.LambdaIntegration(lambdaFunction),
);

// フロントエンドからアクセスするためのAPI URLを出力
backend.addOutput({
  custom: {
    API: {
      [api.restApiName]: {
        endpoint: api.url,
        region: ch10ApiStack.region,
        apiName: api.restApiName,
      },
    },
  },
});
