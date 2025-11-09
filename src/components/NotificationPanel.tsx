import { X, DollarSign, TrendingUp, Award, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: "earnings",
    icon: DollarSign,
    title: "Daily Earnings Milestone",
    message: "You've earned $247 today! Keep up the great work.",
    time: "5 min ago",
    color: "success",
  },
  {
    id: 2,
    type: "promotion",
    icon: TrendingUp,
    title: "Peak Hours Starting Soon",
    message: "1.5x surge pricing starts in 30 minutes. Get ready!",
    time: "15 min ago",
    color: "warning",
  },
  {
    id: 3,
    type: "achievement",
    icon: Award,
    title: "New Badge Earned",
    message: "You've completed 100 rides this month. Amazing!",
    time: "2 hours ago",
    color: "primary",
  },
  {
    id: 4,
    type: "alert",
    icon: AlertCircle,
    title: "Document Expiring",
    message: "Your vehicle insurance expires in 7 days. Please update.",
    time: "1 day ago",
    color: "danger",
  },
];

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-background z-50 animate-slide-in-right shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Notifications List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <NotificationCard key={notification.id} {...notification} />
              ))}
            </div>
          </ScrollArea>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onClose}
            >
              Mark All as Read
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const NotificationCard = ({ 
  icon: Icon, 
  title, 
  message, 
  time, 
  color 
}: { 
  icon: any; 
  title: string; 
  message: string; 
  time: string; 
  color: string;
}) => {
  const colorClasses: Record<string, string> = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    primary: "bg-primary/10 text-primary-foreground",
    danger: "bg-danger/10 text-danger",
  };

  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex gap-3">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{message}</p>
          <p className="text-xs text-muted-foreground mt-2">{time}</p>
        </div>
      </div>
    </Card>
  );
};
