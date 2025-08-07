import { useState, useEffect, useRef } from "react";
import { ChatWindow } from "./components/ChatWindow";
import { MessageInput } from "./components/MessageInput";
import { UserSetup } from "./components/UserSetup";
import { Terminal } from "./components/Terminal";
import backend from "~backend/client";
import type { ChatMessage } from "~backend/chat/stream";

export default function App() {
  const [username, setUsername] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("#00ff00");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const streamRef = useRef<any>(null);

  const connectToChat = async () => {
    try {
      const stream = await backend.chat.chatStream();
      streamRef.current = stream;
      setIsConnected(true);

      // Listen for incoming messages
      (async () => {
        try {
          for await (const message of stream) {
            setMessages(prev => [...prev, message]);
          }
        } catch (error) {
          console.error("Stream error:", error);
          setIsConnected(false);
        }
      })();
    } catch (error) {
      console.error("Failed to connect to chat:", error);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!streamRef.current || !username.trim() || !messageText.trim()) return;

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      username: username.trim(),
      message: messageText.trim(),
      timestamp: new Date(),
      color: userColor,
    };

    try {
      await streamRef.current.send(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleUserSetup = (name: string, color: string) => {
    setUsername(name);
    setUserColor(color);
    connectToChat();
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.close?.();
      }
    };
  }, []);

  if (!username || !isConnected) {
    return <UserSetup onSetup={handleUserSetup} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Terminal />
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4 gap-4">
          <ChatWindow messages={messages} currentUser={username} />
          <MessageInput onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
