import type { Message } from "../../types/chat";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AIMessageProps {
  message: Message;
}

export default function AIMessage({ message }: AIMessageProps) {
  return (
    <div>
      <div className="text-sm text-gray-600">AI</div>
      <div className="bg-cream-100 prose max-w-3/4 rounded-lg px-4 py-2 text-gray-800">
        <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
      </div>
    </div>
  );
}
