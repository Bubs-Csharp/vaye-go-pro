import { Header } from "@/components/Header";
import { DashboardMap } from "@/components/DashboardMap";
import { OnlineStatusButton } from "@/components/OnlineStatusButton";
import { RideDrawer } from "@/components/RideDrawer";
import { BottomDock } from "@/components/BottomDock";

const Index = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      {/* Map Layer */}
      <DashboardMap />
      
      {/* Header */}
      <Header />
      
      {/* Online Status Button */}
      <OnlineStatusButton />
      
      {/* Ride Drawer */}
      <RideDrawer />
      
      {/* Bottom Navigation */}
      <BottomDock />
    </div>
  );
};

export default Index;
