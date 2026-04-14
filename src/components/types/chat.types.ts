// Core type definitions for the chat application

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}

export type MessageRecord = Record<string, Message[]>;
