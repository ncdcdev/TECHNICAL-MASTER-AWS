import { defineFunction } from "@aws-amplify/backend";

export const bedrockChatFunction = defineFunction({
  entry: "./handler.ts",
  name: "bedrock-chat",
  runtime: 22,
  timeoutSeconds: 300,
});
