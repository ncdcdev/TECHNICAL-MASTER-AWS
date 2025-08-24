import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { helloWorldFunction } from "./function/helloWorld/resource";
import { bedrockChatFunction } from "./function/bedrockChat/resource";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

export const backend = defineBackend({
  auth,
  data,
  helloWorldFunction,
  bedrockChatFunction,
});

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
