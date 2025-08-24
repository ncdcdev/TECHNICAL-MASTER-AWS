import type { Schema } from "../../data/resource";

export const handler: Schema["HelloWorld"]["functionHandler"] = async () => {
  return "Hello, world!";
};
