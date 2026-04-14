import { useState } from "react";
import { ConversationList } from "./components/ConversationList";
import { ChatWindow } from "./components/ChatWindow";
import { Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import { Conversation, Message, MessageRecord } from "./components/types/chat.types";

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Fatima Jama",
    avatar: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTcwODE5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    lastMessage: "That sounds great! Let's do it.",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Abdirahman Hassan",
    avatar: "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzU2Njg4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    lastMessage: "Can you send me the files?",
    timestamp: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Eng Aisha Omar",
    avatar: "https://images.unsplash.com/photo-1630939687530-241d630735df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NzU3MzMwNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    lastMessage: "Thanks for the update!",
    timestamp: "3h ago",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Boss Ali Yusuf",
    avatar: "https://images.unsplash.com/photo-1652471943570-f3590a4e52ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzU2MzE5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    lastMessage: "See you tomorrow!",
    timestamp: "5h ago",
    unread: 1,
    online: false,
  },
  {
    id: "5",
    name: "Eng Mohamed Abdi",
    avatar: "https://images.unsplash.com/photo-1609091289242-735df7a2207a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGNhc3VhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTczMzY1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    lastMessage: "Perfect! I'll get started on it.",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
  },
   {
    id: "6",
    name: "Maria Osman ",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGxlYWRlcnxlbnwxfHx8fDE3NzU2ODg5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    lastMessage: "Am on my way to the meeting, see you there!",
    timestamp: "30m ago",
    unread: 4,
    online: true,
  },
];

const mockMessages: MessageRecord = {
  "1": [
    {
      id: "1",
      senderId: "1",
      text: "Hey! How are you doing?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: "2",
      senderId: "me",
      text: "I'm great, thanks! How about you?",
      timestamp: new Date(Date.now() - 3300000),
      isOwn: true,
    },
    {
      id: "3",
      senderId: "1",
      text: "Doing well! I wanted to discuss the project we talked about last week.",
      timestamp: new Date(Date.now() - 3000000),
      isOwn: false,
    },
    {
      id: "4",
      senderId: "me",
      text: "Sure! I've been working on some ideas. What did you have in mind?",
      timestamp: new Date(Date.now() - 2700000),
      isOwn: true,
    },
    {
      id: "5",
      senderId: "1",
      text: "I think we should meet up this week to go over everything in detail.",
      timestamp: new Date(Date.now() - 2400000),
      isOwn: false,
    },
    {
      id: "6",
      senderId: "me",
      text: "That sounds great! Let's do it.",
      timestamp: new Date(Date.now() - 120000),
      isOwn: true,
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "2",
      text: "Hi there! Do you have the presentation files?",
      timestamp: new Date(Date.now() - 7200000),
      isOwn: false,
    },
    {
      id: "2",
      senderId: "me",
      text: "Yes! Let me find them for you.",
      timestamp: new Date(Date.now() - 7000000),
      isOwn: true,
    },
    {
      id: "3",
      senderId: "2",
      text: "Can you send me the files?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
  ],
  "3": [
    {
      id: "1",
      senderId: "3",
      text: "Just wanted to let you know I finished the report.",
      timestamp: new Date(Date.now() - 10800000),
      isOwn: false,
    },
    {
      id: "2",
      senderId: "me",
      text: "Awesome! Thanks for letting me know.",
      timestamp: new Date(Date.now() - 10700000),
      isOwn: true,
    },
    {
      id: "3",
      senderId: "3",
      text: "Thanks for the update!",
      timestamp: new Date(Date.now() - 10600000),
      isOwn: false,
    },
    
  ],
  "4": [
      {
      id: "4",
      senderId: "4",
      text: "Hey, i liked our last conversation. Let's catch up soon.",
      timestamp: new Date(Date.now() - 10600000),
      isOwn: false,
    },
    {
      id: "5",
      senderId: "me",
      text: "Sure, looking forward to it!",
      timestamp: new Date(Date.now() - 10500000),
      isOwn: true,
    },
    {
      id: "6",
      senderId: "4",
      text: "See you tomorrow!",
      timestamp: new Date(Date.now() - 10400000),
      isOwn: false,
    },
    {
      id: "7",
      senderId: "me",
      text: "See you tomorrow!",
      timestamp: new Date(Date.now() - 10300000),
      isOwn: true,
    }
  ]
};

export default function App(): JSX.Element {
  const [activeConversationId, setActiveConversationId] = useState<string>("1");
  const [messages, setMessages] = useState<MessageRecord>(mockMessages);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const activeConversation: Conversation | undefined = mockConversations.find(
    (c) => c.id === activeConversationId
  );

  const handleSendMessage = (text: string): void => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      text,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => ({
      ...prev,
      [activeConversationId]: [
        ...(prev[activeConversationId] || []),
        newMessage,
      ],
    }));
  };

  const handleSelectConversation = (id: string): void => {
    setActiveConversationId(id);
    setShowSidebar(false);
  };

  const toggleSidebar = (): void => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="size-full flex bg-gray-100">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-md"
        onClick={toggleSidebar}
      >
        <Menu className="size-6" />
      </Button>

      {/* Conversation List */}
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block w-full md:w-80 lg:w-96 h-full absolute md:relative z-40 md:z-0`}
      >
        <ConversationList
          conversations={mockConversations}
          activeId={activeConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Chat Window */}
      <div className="flex-1 h-full">
        {activeConversation ? (
          <ChatWindow
            conversationName={activeConversation.name}
            conversationAvatar={activeConversation.avatar}
            online={activeConversation.online}
            messages={messages[activeConversationId] || []}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="size-full flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}