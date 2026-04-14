import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Paperclip, Smile } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState<string>("");

  const handleSend = (): void => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon" className="shrink-0">
          <Paperclip className="size-5 text-gray-500" />
        </Button>
        
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="resize-none pr-10 min-h-[44px] max-h-32"
            rows={1}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2 size-8"
          >
            <Smile className="size-5 text-gray-500" />
          </Button>
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="shrink-0 bg-blue-500 hover:bg-blue-600"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}