import { Home, MapPin, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const BottomDock = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-border/50">
      <div className="max-w-[480px] mx-auto px-6 py-3">
        <div className="flex items-center justify-around gap-2">
          <Button
            variant="ghost"
            size="lg"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 ${
              activeTab === "dashboard" ? "text-info" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 relative ${
              activeTab === "trips" ? "text-success" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("trips")}
          >
            <MapPin className="h-6 w-6" />
            <span className="text-xs font-medium">Trips</span>
            <span className="absolute top-1 right-1 px-1.5 text-[10px] bg-danger text-danger-foreground rounded-full font-bold">
              Live
            </span>
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 ${
              activeTab === "more" ? "text-vaye-navy" : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("more")}
          >
            <Grid3x3 className="h-6 w-6" />
            <span className="text-xs font-medium">More</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
