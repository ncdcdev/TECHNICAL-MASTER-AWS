import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { helloWorldFunction } from "./function/helloWorld/resource";
import { bedrockChatFunction } from "./function/bedrockChat/resource";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Tags } from "aws-cdk-lib";

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
