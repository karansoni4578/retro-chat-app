import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Terminal, Zap } from "lucide-react";

interface UserSetupProps {
  onSetup: (username: string, color: string) => void;
}

const hackerColors = [
  { name: "Matrix Green", value: "#00ff00" },
  { name: "Neon Pink", value: "#ff00ff" },
  { name: "Cyber Blue", value: "#00ffff" },
  { name: "Electric Yellow", value: "#ffff00" },
  { name: "Plasma Orange", value: "#ff8000" },
  { name: "Laser Red", value: "#ff0040" },
];

export function UserSetup({ onSetup }: UserSetupProps) {
  const [username, setUsername] = useState("");
  const [selectedColor, setSelectedColor] = useState(hackerColors[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSetup(username.trim(), selectedColor);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="relative z-10 w-full max-w-md p-8">
        <div className="border border-green-400/30 bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-cyan-400">
              CHAT.EXE v2.1
            </h1>
          </div>
          
          <div className="mb-6">
            <div className="text-green-400 text-sm mb-2">
              &gt; INITIALIZING SECURE CONNECTION...
            </div>
            <div className="text-green-400 text-sm mb-2">
              &gt; ENCRYPTION: AES-256 ✓
            </div>
            <div className="text-green-400 text-sm mb-4">
              &gt; READY FOR USER INPUT
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-cyan-400 text-sm font-bold">
                HACKER ALIAS:
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your codename..."
                className="mt-2 bg-black border-green-400/50 text-green-400 placeholder-green-400/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                required
              />
            </div>

            <div>
              <Label className="text-cyan-400 text-sm font-bold">
                TERMINAL COLOR:
              </Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {hackerColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-3 border rounded text-xs font-bold transition-all ${
                      selectedColor === color.value
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-green-400/30 hover:border-green-400/60"
                    }`}
                    style={{ color: color.value }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-400/20 border border-green-400 text-green-400 hover:bg-green-400/30 hover:text-black font-bold"
              disabled={!username.trim()}
            >
              <Zap className="w-4 h-4 mr-2" />
              JACK IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
