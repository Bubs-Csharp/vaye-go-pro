import { MapPin, Navigation } from "lucide-react";

export const DashboardMap = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-muted via-background to-muted">
      {/* Map Placeholder - In production, this would be Google Maps */}
      <div className="relative h-full w-full">
        {/* Simulated map with grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="h-full w-full" 
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
        
        {/* Driver Location Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            {/* Pulse animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-info/20 animate-pulse-slow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-info/30 animate-pulse" />
            </div>
            
            {/* Marker */}
            <div className="relative h-8 w-8 rounded-full bg-info border-4 border-background shadow-lg flex items-center justify-center">
              <Navigation className="h-4 w-4 text-info-foreground" fill="currentColor" />
            </div>
          </div>
        </div>
        
        {/* Location Accuracy Badge */}
        <div className="absolute top-24 left-4 z-20 glass-effect px-3 py-2 rounded-full border border-border/50 shadow-md">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-foreground">GPS Active</span>
          </div>
        </div>
        
        {/* Sample destination pins */}
        <div className="absolute top-1/3 right-1/3 z-10">
          <MapPin className="h-8 w-8 text-success drop-shadow-lg" fill="currentColor" />
        </div>
        <div className="absolute bottom-1/3 left-1/4 z-10">
          <MapPin className="h-8 w-8 text-warning drop-shadow-lg" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};
