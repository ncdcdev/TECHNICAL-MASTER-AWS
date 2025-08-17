import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

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
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
});
