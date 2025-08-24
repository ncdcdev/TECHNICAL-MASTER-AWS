import { client } from "./client";

export const callBedrockChat = async (
  prompt: string,
  modelId: string,
  conversationId: string | undefined,
) => {
  try {
    const response = await client.queries.BedrockChat({
      prompt,
      modelId,
      conversationId,
    });
    return response.data;
  } catch (error) {
    console.error("チャットの送信リクエストでエラーが発生しました:", error);
    throw new Error("チャットの送信リクエストでエラーが発生しました");
  }
};
