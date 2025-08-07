import { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Wifi } from "lucide-react";

export function Terminal() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-b border-green-400/30 bg-black/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-bold">NEURAL-NET v3.7</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">CONNECTED</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="text-green-400">
              SYS: {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-cyan-400">
              NET: SECURE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
