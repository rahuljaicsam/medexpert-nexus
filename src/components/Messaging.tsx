"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  MessageSquare,
  Send,
  Image as ImageIcon,
  AtSign,
  Search,
  Clock,
  X,
  ChevronDown,
  ChevronRight,
  Bell,
} from "lucide-react";

interface Message {
  id: string;
  taskId?: string;
  text: string;
  sender: {
    id: string;
    name: string;
    role: "labeler" | "admin" | "customer";
    avatar: string;
  };
  timestamp: Date;
  attachments?: Array<{
    type: "image";
    url: string;
  }>;
  mentions?: Array<{
    id: string;
    name: string;
  }>;
  parentId?: string;
  responseTime?: number;
}

interface Thread {
  id: string;
  title: string;
  lastMessage: Date;
  unread: number;
  messages: Message[];
}

// Dummy data
const threads: Thread[] = [
  {
    id: "1",
    title: "Chest X-Ray Classification Questions",
    lastMessage: new Date(),
    unread: 2,
    messages: [
      {
        id: "1",
        taskId: "TASK-001",
        text: "Could you clarify the criteria for marking subtle nodules?",
        sender: {
          id: "1",
          name: "Dr. Sarah Chen",
          role: "labeler",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },
        timestamp: new Date(Date.now() - 3600000),
        mentions: [
          { id: "2", name: "Dr. Michael Admin" }
        ]
      },
      {
        id: "2",
        taskId: "TASK-001",
        text: "For nodules less than 3mm in diameter, mark them only if they have distinct borders.",
        sender: {
          id: "2",
          name: "Dr. Michael Admin",
          role: "admin",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        },
        timestamp: new Date(),
        responseTime: 45
      }
    ]
  }
];

export function Messaging() {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.messages.some(msg => 
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSendMessage = () => {
    if (!messageText.trim() && attachments.length === 0) return;
    
    // In a real app, send to backend
    console.log("Sending message:", {
      text: messageText,
      attachments,
      threadId: selectedThread?.id
    });
    
    setMessageText("");
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Threads Sidebar */}
      <div className="w-80 border-r border-gray-200">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            {filteredThreads.map((thread) => (
              <motion.button
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  selectedThread?.id === thread.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{thread.title}</span>
                  {thread.unread > 0 && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                      {thread.unread}
                    </span>
                  )}
                </div>
                <div className="mt-1 text-sm opacity-80">
                  {format(thread.lastMessage, "MMM d, h:mm a")}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex flex-1 flex-col">
        {selectedThread ? (
          <>
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{selectedThread.title}</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {selectedThread.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={message.sender.avatar}
                      alt={message.sender.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{message.sender.name}</span>
                        <span className="text-xs text-gray-500">
                          {format(message.timestamp, "MMM d, h:mm a")}
                        </span>
                        {message.responseTime && (
                          <span className="flex items-center text-xs text-green-600">
                            <Clock className="mr-1 h-3 w-3" />
                            {message.responseTime}m response
                          </span>
                        )}
                      </div>
                      {message.taskId && (
                        <div className="mb-1 text-xs text-gray-500">
                          Re: Task {message.taskId}
                        </div>
                      )}
                      <p className="text-gray-800">{message.text}</p>
                      {message.mentions?.length > 0 && (
                        <div className="mt-1 text-xs text-blue-600">
                          {message.mentions.map((mention) => (
                            <span key={mention.id} className="mr-2">
                              @{mention.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="mb-2 flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm"
                  >
                    <ImageIcon className="h-4 w-4 text-gray-500" />
                    <span className="max-w-[150px] truncate">{file.name}</span>
                    <button
                      onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <label className="cursor-pointer rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <ImageIcon className="h-5 w-5" />
                </label>
                <button
                  onClick={() => setShowMentions(!showMentions)}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                >
                  <AtSign className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="rounded-lg bg-primary p-2 text-white hover:bg-primary/90"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageSquare className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-2">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
