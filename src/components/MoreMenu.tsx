import { 
  Inbox, 
  Users, 
  Wallet, 
  User, 
  Settings, 
  HelpCircle,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: "inbox", icon: Inbox, label: "Inbox", badge: 3, color: "danger" },
  { id: "referrals", icon: Users, label: "Referrals", color: "info" },
  { id: "wallet", icon: Wallet, label: "Wallet", color: "success" },
  { id: "account", icon: User, label: "Account", color: "primary" },
  { id: "settings", icon: Settings, label: "Settings", color: "muted" },
  { id: "help", icon: HelpCircle, label: "Help", color: "warning" },
];

export const MoreMenu = ({ isOpen, onClose }: MoreMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed bottom-20 left-0 right-0 z-50 animate-slide-up">
        <div className="max-w-[480px] mx-auto px-6 pb-6">
          <div className="glass-effect rounded-3xl p-6 border border-border/50 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">More Options</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Menu Grid */}
            <div className="grid grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <MenuButton key={item.id} {...item} onClick={onClose} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MenuButton = ({ 
  icon: Icon, 
  label, 
  badge, 
  color,
  onClick 
}: { 
  icon: any; 
  label: string; 
  badge?: number; 
  color: string;
  onClick: () => void;
}) => {
  const colorClasses: Record<string, string> = {
    danger: "bg-danger/10 text-danger",
    info: "bg-info/10 text-info",
    success: "bg-success/10 text-success",
    primary: "bg-primary/10 text-primary-foreground",
    muted: "bg-muted text-muted-foreground",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-muted/50 transition-colors relative"
    >
      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
      {badge && (
        <span className="absolute top-2 right-2 h-5 w-5 bg-danger text-danger-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};
