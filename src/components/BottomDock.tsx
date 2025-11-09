import { Home, MapPin, Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TripStatsPanel } from "./TripStatsPanel";
import { MoreMenu } from "./MoreMenu";

export const BottomDock = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showTripStats, setShowTripStats] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === "trips") {
      setShowTripStats(true);
    } else if (tab === "more") {
      setShowMoreMenu(true);
    }
  };
  
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-border/50">
        <div className="max-w-[480px] mx-auto px-6 py-3">
          <div className="flex items-center justify-around gap-2">
            <Button
              variant="ghost"
              size="lg"
              className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 transition-all ${
                activeTab === "dashboard" ? "text-info scale-105" : "text-muted-foreground"
              }`}
              onClick={() => handleTabClick("dashboard")}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs font-medium">Dashboard</span>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 relative transition-all ${
                activeTab === "trips" ? "text-success scale-105" : "text-muted-foreground"
              }`}
              onClick={() => handleTabClick("trips")}
            >
              <MapPin className="h-6 w-6" />
              <span className="text-xs font-medium">Trips</span>
              <span className="absolute top-1 right-1 px-1.5 text-[10px] bg-danger text-danger-foreground rounded-full font-bold animate-pulse">
                Live
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className={`flex-1 flex flex-col items-center gap-1 h-auto py-2 transition-all ${
                activeTab === "more" ? "text-vaye-navy scale-105" : "text-muted-foreground"
              }`}
              onClick={() => handleTabClick("more")}
            >
              <Grid3x3 className="h-6 w-6" />
              <span className="text-xs font-medium">More</span>
            </Button>
          </div>
        </div>
      </nav>
      
      <TripStatsPanel 
        isOpen={showTripStats} 
        onClose={() => {
          setShowTripStats(false);
          setActiveTab("dashboard");
        }} 
      />
      
      <MoreMenu 
        isOpen={showMoreMenu} 
        onClose={() => {
          setShowMoreMenu(false);
          setActiveTab("dashboard");
        }} 
      />
    </>
  );
};
