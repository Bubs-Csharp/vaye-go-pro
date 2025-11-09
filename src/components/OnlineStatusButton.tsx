import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const OnlineStatusButton = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const { toast } = useToast();
  
  const handleToggle = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    toast({
      title: newStatus ? "You're Online" : "You're Offline",
      description: newStatus 
        ? "You'll now receive ride requests in your area" 
        : "You won't receive any ride requests",
      variant: newStatus ? "default" : "destructive",
    });
  };
  
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30">
      <Button
        size="lg"
        onClick={handleToggle}
        onMouseDown={() => !isOnline && setIsHolding(true)}
        onMouseUp={() => setIsHolding(false)}
        onMouseLeave={() => setIsHolding(false)}
        className={`
          px-8 py-6 rounded-full text-base font-semibold transition-all duration-300
          ${isOnline 
            ? "bg-success hover:bg-success/90 text-success-foreground shadow-lg shadow-success/30 hover:scale-105" 
            : "bg-muted-foreground hover:bg-muted-foreground/90 text-background hover:scale-105"
          }
          ${isHolding ? "scale-95" : ""}
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
