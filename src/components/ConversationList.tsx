import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Conversation } from "../components/types/chat.types";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeId,
  onSelectConversation,
}: ConversationListProps): JSX.Element {
  return (
    // Mobile: fixed sidebar, Desktop: static sidebar
    <div className="flex flex-col h-full bg-white border-r mb-0 md:mb-4">
      <div className="p-4 border-b">
        <h1 className="font-semibold mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
          />
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                activeId === conversation.id ? "bg-gray-100" : ""
              }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                </Avatar>
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm truncate">
                    {conversation.name}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {conversation.timestamp}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}