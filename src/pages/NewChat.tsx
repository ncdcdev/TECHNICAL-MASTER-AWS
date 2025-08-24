import ChatInput from "../components/ui/ChatInput";
import { useNavigate } from "react-router";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function NewChat() {
  const { user } = useAuthenticator((context) => [context.user]);
  const userName = user?.signInDetails?.loginId?.split("@")[0] ?? "";
  const navigate = useNavigate();
  const sendMessage = (message: string, model: string) => {
    const conversationId = self.crypto.randomUUID();
    navigate(`/chat/${conversationId}`, { state: { message, model } });
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-xl flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">{userName} さん</h1>
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}
