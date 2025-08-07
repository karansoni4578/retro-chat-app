import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Zap } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="border border-green-400/30 bg-black/80 backdrop-blur-sm rounded-lg p-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400/60 text-sm pointer-events-none">
            &gt;
          </div>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter transmission..."
            className="pl-8 bg-black border-green-400/50 text-green-400 placeholder-green-400/50 focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
        <Button
          type="submit"
          disabled={!message.trim()}
          className="bg-green-400/20 border border-green-400 text-green-400 hover:bg-green-400/30 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
      
      <div className="mt-2 text-xs text-green-400/60">
        <Zap className="w-3 h-3 inline mr-1" />
        ENCRYPTION: ACTIVE | STATUS: READY
      </div>
    </div>
  );
}
