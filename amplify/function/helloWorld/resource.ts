import { defineFunction } from "@aws-amplify/backend";

export const helloWorldFunction = defineFunction({
  runtime: 22,
  name: "hello-world",
  entry: "./handler.ts",
});
