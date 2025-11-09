import { MapPin, Navigation, Key } from "lucide-react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const DashboardMap = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [tempApiKey, setTempApiKey] = useState<string>("");
  const [isEditingKey, setIsEditingKey] = useState<boolean>(false);

  // Default center (Harare, Zimbabwe)
  const defaultCenter = { lat: -17.8252, lng: 31.0335 };
  
  // Sample destination locations
  const sampleDestinations = [
    { lat: -17.8352, lng: 31.0435, type: "pickup" },
    { lat: -17.8152, lng: 31.0235, type: "dropoff" }
  ];

  useEffect(() => {
    const savedKey = localStorage.getItem("google_maps_api_key");
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setIsEditingKey(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem("google_maps_api_key", tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setIsEditingKey(false);
    }
  };

  if (!apiKey || isEditingKey) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-muted via-background to-muted flex items-center justify-center p-4">
        <div className="glass-effect p-6 rounded-2xl border border-border/50 shadow-xl max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-vaye-yellow/20 flex items-center justify-center">
              <Key className="h-6 w-6 text-vaye-yellow" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Google Maps API Key</h2>
              <p className="text-xs text-muted-foreground">Required for map functionality</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Get your API key from{" "}
            <a 
              href="https://console.cloud.google.com/google/maps-apis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-vaye-yellow hover:underline"
            >
              Google Cloud Console
            </a>
          </p>

          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Paste your Google Maps API key"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={handleSaveApiKey}
              disabled={!tempApiKey.trim()}
              className="w-full"
            >
              Save & Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={13}
          mapId="vaye-driver-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Driver Location Marker */}
          <AdvancedMarker position={defaultCenter}>
            <div className="relative">
              {/* Pulse animation */}
              <div className="absolute inset-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                <div className="h-20 w-20 rounded-full bg-info/20 animate-pulse-slow" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                <div className="h-12 w-12 rounded-full bg-info/30 animate-pulse" />
              </div>
              
              {/* Marker */}
              <div className="relative h-8 w-8 rounded-full bg-info border-4 border-background shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                <Navigation className="h-4 w-4 text-info-foreground" fill="currentColor" />
              </div>
            </div>
          </AdvancedMarker>

          {/* Sample destination pins */}
          {sampleDestinations.map((dest, idx) => (
            <AdvancedMarker key={idx} position={dest}>
              <MapPin 
                className={`h-8 w-8 drop-shadow-lg ${
                  dest.type === "pickup" ? "text-success" : "text-warning"
                }`} 
                fill="currentColor" 
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>

      {/* Location Accuracy Badge */}
      <div className="absolute top-24 left-4 z-20 glass-effect px-3 py-2 rounded-full border border-border/50 shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-foreground">GPS Active</span>
        </div>
      </div>

      {/* API Key Edit Button */}
      <button
        onClick={() => setIsEditingKey(true)}
        className="absolute top-24 right-4 z-20 glass-effect p-2 rounded-full border border-border/50 shadow-md hover:bg-muted/50 transition-colors"
        title="Change API Key"
      >
        <Key className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
};
