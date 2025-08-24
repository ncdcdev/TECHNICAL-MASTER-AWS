import { useParams, useLocation } from "react-router";
import { useEffect, useState, useRef } from "react";
import type { Conversation, Message } from "../types/chat";
import { sampleConversations } from "../sampleData";
import MessageList from "../components/ui/MessageList";
import ChatInput from "../components/ui/ChatInput";
import { callBedrockChat } from "../api/bedrock";
import { createChatTitle } from "../utils";

export default function ChatConversation() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { state: initChatDetail } = location;
  const initRenderRef = useRef(true);
  const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);

  const getAIResponse = async (message: string, model: string) => {
    setIsLoadingAIResponse(true);
    let newAssistantMessage: Message;
    try {
      const aiResponse = await callBedrockChat(message, model);

      newAssistantMessage = {
        id: `message-${self.crypto.randomUUID()}`,
        role: "assistant",
        content: aiResponse || "AIからの応答がありません",
        timestamp: new Date(),
      };
    } catch (error) {
      console.error("AI応答の取得に失敗しました:", error);
      newAssistantMessage = {
        id: `message-${self.crypto.randomUUID()}`,
        role: "assistant",
        content: "AIからの応答の取得に失敗しました。後ほど再試行してください。",
        timestamp: new Date(),
      };
    } finally {
      setConversation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, newAssistantMessage],
        };
      });
      setIsLoadingAIResponse(false);
    }
  };

  useEffect(() => {
    if (!conversationId) return;
    if (initChatDetail) {
      if (!initRenderRef.current) return;
      initRenderRef.current = false;
      const { message, model } = initChatDetail;
      setConversation({
        id: conversationId,
        title: createChatTitle(message),
        messages: [
          {
            id: `message-${self.crypto.randomUUID()}`,
            role: "user",
            content: message,
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      getAIResponse(message, model); // ここにgetAIResponseを追加
    } else {
      // TODO 実際のアプリではAPIからデータを取得する
      const foundConversation = sampleConversations.find(
        (c) => c.id === conversationId,
      );
      setConversation(foundConversation || null);
    }
  }, [conversationId, initChatDetail]);

  useEffect(() => {
    if (conversation?.messages.length) {
      messagesEndRef.current?.scrollIntoView();
    }
  }, [conversation]);

  if (!conversation) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-2xl font-bold">
          指定したIDの会話が見つかりません
        </div>
      </div>
    );
  }
  const sendMessage = async (message: string, model: string) => {
    const newUserMessage: Message = {
      id: `message-${self.crypto.randomUUID()}`,
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    setConversation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newUserMessage],
      };
    });

    await getAIResponse(message, model);
  };
  return (
    <div className="flex h-screen flex-col">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
        <h1 className="text-xl font-bold">{conversation.title}</h1>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto bg-white">
        <div className="w-3xl">
          <MessageList messages={conversation.messages} />
          {/* ローディングインジケーターの表示を追加 */}
          {isLoadingAIResponse && (
            <div className="px-6">
              <div className="border-cream-500 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="w-3xl mx-auto bg-white px-4 py-3">
        <ChatInput
          sendMessage={sendMessage}
          initialModel={initChatDetail?.model}
          disabled={isLoadingAIResponse}
        />
      </div>
    </div>
  );
}
