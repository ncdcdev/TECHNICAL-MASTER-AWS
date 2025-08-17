import type { Message } from "../../types/chat";

interface UserMessageProps {
  message: Message;
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-3/4 rounded-lg bg-emerald-600 px-4 py-2 text-white">
        {message.content}
      </div>
    </div>
  );
}
