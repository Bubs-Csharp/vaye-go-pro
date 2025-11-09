import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NotificationPanel } from "./NotificationPanel";

export const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[70px] gradient-primary glass-effect">
        <div className="max-w-[480px] mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-secondary drop-shadow-lg">
              VAYE
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowNotifications(true)}
            className="relative text-secondary hover:bg-vaye-navy/10"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-danger rounded-full animate-pulse" />
          </Button>
        </div>
      </header>
      
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
};
