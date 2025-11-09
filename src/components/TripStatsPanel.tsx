import { ArrowLeft, DollarSign, Car, Clock, Star, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TripStatsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TripStatsPanel = ({ isOpen, onClose }: TripStatsPanelProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed inset-0 bg-background z-50 animate-slide-up">
        <div className="flex flex-col h-full max-w-[480px] mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-bold text-foreground">Trip Statistics</h2>
          </div>
          
          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Today's Summary */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">TODAY'S SUMMARY</h3>
                <div className="grid grid-cols-2 gap-3">
                  <StatCard
                    icon={<DollarSign className="h-5 w-5" />}
                    label="Earnings"
                    value="$247.50"
                    change="+15%"
                    color="success"
                  />
                  <StatCard
                    icon={<Car className="h-5 w-5" />}
                    label="Trips"
                    value="12"
                    change="+3"
                    color="info"
                  />
                  <StatCard
                    icon={<Clock className="h-5 w-5" />}
                    label="Online Time"
                    value="6.2h"
                    change="-0.5h"
                    color="warning"
                  />
                  <StatCard
                    icon={<Star className="h-5 w-5" />}
                    label="Rating"
                    value="4.9"
                    change="+0.1"
                    color="primary"
                  />
                </div>
              </div>

              {/* Weekly Overview */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">THIS WEEK</h3>
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Earnings</span>
                      <span className="text-lg font-bold text-success">$1,248.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Trips</span>
                      <span className="text-lg font-bold text-foreground">58</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Rating</span>
                      <span className="text-lg font-bold text-primary">4.87</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Trips */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">RECENT TRIPS</h3>
                <div className="space-y-2">
                  {[
                    { time: "2:45 PM", route: "Downtown → Airport", earnings: "$42.50", rating: 5 },
                    { time: "1:30 PM", route: "Mall → University", earnings: "$18.00", rating: 5 },
                    { time: "12:15 PM", route: "Hotel → Convention Center", earnings: "$25.50", rating: 4 },
                    { time: "11:00 AM", route: "Station → Business District", earnings: "$32.00", rating: 5 },
                  ].map((trip, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{trip.route}</p>
                          <p className="text-xs text-muted-foreground mt-1">{trip.time}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-success">{trip.earnings}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-primary fill-primary" />
                            <span className="text-xs font-medium">{trip.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  change, 
  color 
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  color: "success" | "info" | "warning" | "primary";
}) => {
  const colorClasses = {
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
    warning: "bg-warning/10 text-warning",
    primary: "bg-primary/10 text-primary-foreground",
  };

  const isPositive = change.startsWith('+');

  return (
    <Card className="p-4">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold text-foreground mb-1">{value}</p>
      <p className={`text-xs font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
        {change} vs yesterday
      </p>
    </Card>
  );
};
