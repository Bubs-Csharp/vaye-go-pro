import { useState } from "react";
import { Button } from "@/components/ui/button";

export const OnlineStatusButton = () => {
  const [isOnline, setIsOnline] = useState(false);
  
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
      <Button
        size="lg"
        onClick={() => setIsOnline(!isOnline)}
        className={`
          px-8 py-6 rounded-full text-base font-semibold transition-all duration-300
          ${isOnline 
            ? "bg-success hover:bg-success/90 text-success-foreground shadow-lg shadow-success/30" 
            : "bg-muted-foreground hover:bg-muted-foreground/90 text-background"
          }
        `}
      >
        {isOnline ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-success-foreground"></span>
            </span>
            Online
          </div>
        ) : (
          "Go Online"
        )}
      </Button>
    </div>
  );
};
