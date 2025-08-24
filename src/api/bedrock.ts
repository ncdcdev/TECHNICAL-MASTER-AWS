import { client } from "./client";

export const callBedrockChat = async (prompt: string, modelId: string) => {
  try {
    const response = await client.queries.BedrockChat({
      prompt,
      modelId,
    });
    return response.data;
  } catch (error) {
    console.error("チャットの送信リクエストでエラーが発生しました:", error);
    throw new Error("チャットの送信リクエストでエラーが発生しました");
  }
};
