import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { helloWorldFunction } from "../function/helloWorld/resource";
import { bedrockChatFunction } from "../function/bedrockChat/resource";

const schema = a.schema({
  Message: a
    .model({
      conversationId: a.id().required(),
      createdAt: a.datetime().required(),
      conversation: a.belongsTo("Conversation", "conversationId"),
      sender: a.string(),
      content: a.string(),
    })
    .identifier(["conversationId", "createdAt"])
    .authorization((allow) => [allow.owner()]),

  Conversation: a
    .model({
      conversationId: a.id().required(),
      title: a.string().required(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      messages: a.hasMany("Message", "conversationId"),
    })
    .identifier(["conversationId"])
    .authorization((allow) => [allow.owner()]),

  HelloWorld: a
    .query()
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()]) // 認証されたユーザーからのアクセスを許可
    .handler(a.handler.function(helloWorldFunction)), // helloWorldFunctionをハンドラとして指定

  BedrockChat: a
    .query()
    .arguments({
      prompt: a.string().required(),
      modelId: a.string().required(),
    })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(bedrockChatFunction)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
});
