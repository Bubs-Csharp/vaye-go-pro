import { useState } from "react";
import { DollarSign, Car, Clock, Star, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type DrawerState = "compact" | "partial" | "full";

export const RideDrawer = () => {
  const [drawerState, setDrawerState] = useState<DrawerState>("compact");
  
  const handleDragHandleClick = () => {
    if (drawerState === "compact") setDrawerState("partial");
    else if (drawerState === "partial") setDrawerState("full");
    else setDrawerState("compact");
  };
  
  return (
    <div 
      className={`
        fixed left-0 right-0 z-30 glass-effect rounded-t-[20px] border-t border-border/50 shadow-xl transition-all duration-300 ease-out
        ${drawerState === "compact" ? "bottom-20 h-[120px]" : ""}
        ${drawerState === "partial" ? "bottom-20 h-[300px]" : ""}
        ${drawerState === "full" ? "bottom-20 h-[70vh]" : ""}
      `}
    >
      <div className="max-w-[480px] mx-auto h-full flex flex-col">
        {/* Drag Handle */}
        <button 
          onClick={handleDragHandleClick}
          className="w-full py-3 flex justify-center cursor-pointer hover:bg-muted/50 rounded-t-[20px] transition-colors"
        >
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </button>
        
        {/* Driver Stats - Always Visible */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-4 gap-3">
            <StatCard 
              icon={<DollarSign className="h-4 w-4" />} 
              value="$247" 
              label="Today"
              color="success"
            />
            <StatCard 
              icon={<Car className="h-4 w-4" />} 
              value="12" 
              label="Trips"
              color="info"
            />
            <StatCard 
              icon={<Clock className="h-4 w-4" />} 
              value="6.2h" 
              label="Hours"
              color="warning"
            />
            <StatCard 
              icon={<Star className="h-4 w-4" />} 
              value="4.9" 
              label="Rating"
              color="primary"
            />
          </div>
        </div>
        
        {/* Expandable Content */}
        {drawerState !== "compact" && (
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground">Ready for your next ride!</h3>
              <p className="text-sm text-muted-foreground">
                You're online and ready to accept ride requests. Stay in high-demand areas for more opportunities.
              </p>
              
              {drawerState === "full" && (
                <div className="space-y-3 mt-6 animate-scale-in">
                  <Card className="p-4 border-info/20 bg-info/5">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center">
                        <Car className="h-5 w-5 text-info" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Tip: Peak Hours</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Earn up to 1.5x during rush hours (7-9 AM, 5-7 PM)
                        </p>
                      </div>
                    </div>
                  </Card>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    <ChevronUp className="mr-2 h-4 w-4" />
                    View Trip History
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ 
  icon, 
  value, 
  label, 
  color 
}: { 
  icon: React.ReactNode; 
  value: string; 
  label: string; 
  color: "success" | "info" | "warning" | "primary";
}) => {
  const colorClasses = {
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
    warning: "bg-warning/10 text-warning",
    primary: "bg-primary/10 text-primary-foreground",
  };
  
  return (
    <Card className="p-3 flex flex-col items-center gap-1 border-border/50">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className="text-base font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </Card>
  );
};
