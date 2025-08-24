import { createContext, useContext, type ReactNode } from "react";
import { useConversations } from "../hooks/useConversations";
import type { Conversation } from "../types/chat";

interface ConversationsContextType {
  conversations: Conversation[];
  isLoading: boolean;
  refreshConversations: () => Promise<void>;
  notifyConversationCreated: () => Promise<void>;
}

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

interface ConversationsProviderProps {
  children: ReactNode;
}

export const ConversationsProvider: React.FC<ConversationsProviderProps> = ({
  children,
}) => {
  const conversationsData = useConversations();

  // 新規チャット作成を通知する処理
  const notifyConversationCreated = async () => {
    await conversationsData.refreshConversations();
  };

  return (
    <ConversationsContext.Provider
      value={{
        ...conversationsData,
        notifyConversationCreated,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversationsContext = () => {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error(
      "useConversationsContextはConversationsProvider内で使用してください",
    );
  }
  return context;
};
