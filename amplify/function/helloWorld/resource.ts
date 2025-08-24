import { defineFunction } from "@aws-amplify/backend";

export const helloWorldFunction = defineFunction({
  runtime: 20,
  name: "hello-world",
  entry: "./handler.ts",
});
