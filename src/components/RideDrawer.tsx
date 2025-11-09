import { DollarSign, Car, Clock, Star, ChevronUp, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDrawerDrag } from "@/hooks/useDrawerDrag";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DRAWER_HEIGHTS = {
  compact: 120,
  partial: 300,
  full: window.innerHeight * 0.7,
};

export const RideDrawer = () => {
  const { drawerRef, currentHeight, isDragging } = useDrawerDrag(DRAWER_HEIGHTS, 80);
  
  const getDrawerState = () => {
    if (currentHeight <= DRAWER_HEIGHTS.compact + 20) return "compact";
    if (currentHeight <= DRAWER_HEIGHTS.partial + 50) return "partial";
    return "full";
  };
  
  const drawerState = getDrawerState();
  
  return (
    <div 
      ref={drawerRef}
      style={{ height: `${currentHeight}px` }}
      className={`
        fixed left-0 right-0 bottom-20 z-30 glass-effect rounded-t-[20px] border-t border-border/50 shadow-xl
        ${isDragging ? '' : 'transition-all duration-300 ease-out'}
      `}
    >
      <div className="max-w-[480px] mx-auto h-full flex flex-col">
        {/* Drag Handle */}
        <div 
          data-drawer-handle
          className="w-full py-3 flex justify-center cursor-grab active:cursor-grabbing hover:bg-muted/50 rounded-t-[20px] transition-colors"
        >
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>
        
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
          <ScrollArea className="flex-1 px-6 pb-6">
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground">Ready for your next ride!</h3>
              <p className="text-sm text-muted-foreground">
                You're online and ready to accept ride requests. Stay in high-demand areas for more opportunities.
              </p>
              
              {drawerState === "full" && (
                <div className="space-y-4 mt-6 animate-scale-in">
                  {/* Tip Card */}
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
                  
                  {/* Example Trip Request (Demo) */}
                  <Card className="p-4 border-primary/20 bg-primary/5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">Incoming Request</h4>
                        <span className="text-xs font-medium text-muted-foreground">2.3 km away</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary-foreground">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">John Doe</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 text-primary fill-primary" />
                            <span className="text-sm text-muted-foreground">4.8</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-success">$24.50</p>
                          <p className="text-xs text-muted-foreground">Est. earnings</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-success mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Pickup</p>
                            <p className="text-xs text-muted-foreground">123 Main Street</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-danger mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Dropoff</p>
                            <p className="text-xs text-muted-foreground">456 Oak Avenue</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Decline
                        </Button>
                        <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                          Accept
                        </Button>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                      <ChevronUp className="h-4 w-4" />
                      <span className="text-xs">Trip History</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex flex-col gap-1">
                      <Phone className="h-4 w-4" />
                      <span className="text-xs">Support</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
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
    <Card className="p-3 flex flex-col items-center gap-1 border-border/50 cursor-pointer hover:bg-muted/50 transition-colors">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className="text-base font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </Card>
  );
};
