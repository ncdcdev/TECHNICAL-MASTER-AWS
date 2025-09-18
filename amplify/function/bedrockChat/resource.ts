import { defineFunction } from "@aws-amplify/backend";

export const bedrockChatFunction = defineFunction({
  entry: "./handler.ts",
  name: "bedrock-chat",
  runtime: 22,
  resourceGroupName: "data",
  timeoutSeconds: 300,
});
