import type { Schema } from "../../data/resource";
import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConverseCommandInput,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient();

const SYSTEMPROMPT = "You are the best teacher in the world.";

export const handler: Schema["BedrockChat"]["functionHandler"] = async (
  event,
) => {
  const prompt = event.arguments.prompt;
  const modelId = event.arguments.modelId;

  const input: ConverseCommandInput = {
    modelId: modelId,
    system: [
      {
        text: SYSTEMPROMPT,
      },
    ],
    messages: [
      {
        role: "user",
        content: [
          {
            text: prompt,
          },
        ],
      },
    ],
    inferenceConfig: {
      maxTokens: 1000,
      temperature: 0.5,
    },
  };

  const command = new ConverseCommand(input);
  const response = await client.send(command);
  return response.output?.message?.content?.[0]?.text || "";
};
