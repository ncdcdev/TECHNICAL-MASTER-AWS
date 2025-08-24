import { FaArrowUp } from "react-icons/fa";
import { type FormEvent, useState } from "react";

interface ChatInputProps {
  sendMessage: (message: string, model: string) => void;
  initialModel?: string;
  disabled?: boolean;
}

export default function ChatInput({
  sendMessage,
  initialModel,
  disabled,
}: ChatInputProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim() || !selectedModel) {
      return;
    }
    sendMessage(message, selectedModel);
    setMessage("");
  };
  const models = [
    {
      id: "apac.anthropic.claude-3-haiku-20240307-v1:0",
      name: "Claude 3 Haiku v1",
    },
    {
      id: "apac.anthropic.claude-sonnet-4-20250514-v1:0",
      name: "Claude Sonnet 4 v1",
    },
    {
      id: "apac.amazon.nova-pro-v1:0",
      name: "Amazon Nova Pro 1.0",
    },
  ];
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState(
    initialModel || models[0].id,
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200 p-4">
        <textarea
          name="message"
          className="field-sizing-content max-h-80 w-full resize-none overflow-y-auto break-words border-none outline-none"
          placeholder="質問を入力してください"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const form = e.currentTarget.closest("form");
              if (form) {
                form.requestSubmit();
              }
            }
          }}
        />
        <div className="flex justify-end gap-2">
          <div className="flex items-center justify-center rounded-md text-sm">
            <select
              name="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full rounded-md p-2"
            >
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={disabled || message.trim() === ""} // ここでdisabledを使用
            className="flex items-center justify-center rounded-md bg-emerald-600 p-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600"
          >
            <FaArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
