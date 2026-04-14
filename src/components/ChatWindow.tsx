import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Phone, Video, MoreVertical } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { Message } from "../components/types/chat.types";

interface ChatWindowProps {
  conversationName: string;
  conversationAvatar: string;
  online: boolean;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export function ChatWindow({
  conversationName,
  conversationAvatar,
  online,
  messages,
  onSendMessage,
}: ChatWindowProps): JSX.Element {
  return (
    <div className="flex flex-col h-full bg-gray-50 mb-0 md:mb-4">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar>
              <AvatarImage src={conversationAvatar} alt={conversationName} />
              <AvatarFallback>{conversationName[0]}</AvatarFallback>
            </Avatar>
            {online && (
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div>
            <h2 className="font-semibold">{conversationName}</h2>
            <p className="text-sm text-gray-500">
              {online ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="size-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="size-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="size-5 text-gray-600" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              senderName={conversationName}
              senderAvatar={conversationAvatar}
            />
          ))}
        </div>
      </ScrollArea>
      
      {/* Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
}