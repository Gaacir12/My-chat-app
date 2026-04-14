import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";

import { Message } from "../components/types/chat.types";

interface MessageBubbleProps {
  message: Message;
  senderName?: string;
  senderAvatar?: string;
}

export function MessageBubble({ message, senderName, senderAvatar }: MessageBubbleProps): JSX.Element {
  return (
    <div
      className={`flex gap-3 mb-4 ${
        message.isOwn ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {!message.isOwn && (
        <Avatar className="size-8">
          <AvatarImage src={senderAvatar} alt={senderName} />
          <AvatarFallback>{senderName?.[0]}</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`flex flex-col ${
          message.isOwn ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`max-w-md px-4 py-2 rounded-2xl ${
            message.isOwn
              ? "bg-blue-500 text-white rounded-br-sm"
              : "bg-gray-200 text-gray-900 rounded-bl-sm"
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 px-1">
          {format(message.timestamp, "h:mm a")}
        </span>
      </div>
    </div>
  );
}