import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatMessage } from "~backend/chat/stream";

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUser: string;
}

export function ChatWindow({ messages, currentUser }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex-1 border border-green-400/30 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden">
      <div className="border-b border-green-400/30 p-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 font-bold text-sm">
            SECURE CHANNEL #MAIN
          </span>
          <span className="text-green-400/60 text-xs ml-auto">
            {messages.length} TRANSMISSIONS
          </span>
        </div>
      </div>
      
      <ScrollArea className="h-96">
        <div ref={scrollRef} className="p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-green-400/60 text-sm py-8">
              &gt; CHANNEL INITIALIZED. AWAITING TRANSMISSIONS...
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col gap-1 ${
                  message.username === currentUser ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-400/60">
                    [{formatTime(message.timestamp)}]
                  </span>
                  <span
                    className="font-bold"
                    style={{ color: message.color }}
                  >
                    {message.username === currentUser ? "YOU" : message.username}
                  </span>
                </div>
                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded border text-sm ${
                    message.username === currentUser
                      ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-400"
                      : "bg-green-400/10 border-green-400/30"
                  }`}
                  style={{
                    color: message.username === currentUser ? "#00ffff" : message.color
                  }}
                >
                  &gt; {message.message}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
