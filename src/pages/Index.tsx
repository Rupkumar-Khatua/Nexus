
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PlatformView from "@/components/PlatformView";
import EmptyState from "@/components/EmptyState";
import PlatformCards from "@/components/PlatformCards";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useState as useLocalStorageState } from "react-use";

const Index = () => {
  // Use localStorage to persist platforms between sessions
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load platforms from localStorage on initial render
    const storedPlatforms = localStorage.getItem("crossmessage-platforms");
    if (storedPlatforms) {
      try {
        const parsedPlatforms = JSON.parse(storedPlatforms);
        // Handle icon conversion from string to function
        const hydratedPlatforms = parsedPlatforms.map((platform: any) => {
          // This is a simplified version - in a real app, we'd need a more robust solution
          // for serializing/deserializing the icon components
          return {
            ...platform,
            // We'll recreate the icon component during runtime
            icon: platform.id === "custom" ? MessageSquare : 
                  platform.id === "whatsapp" ? BrandWhatsapp :
                  platform.id === "telegram" ? BrandTelegram :
                  platform.id === "discord" ? BrandDiscord :
                  platform.id === "zoom" ? BrandZoom :
                  platform.id === "google-meet" ? BrandGoogle : MessageCircle
          };
        });
        setPlatforms(hydratedPlatforms);
        
        // Set the first platform as active if available
        if (hydratedPlatforms.length > 0) {
          setActivePlatform(hydratedPlatforms[0]);
        }
      } catch (e) {
        console.error("Error loading platforms from localStorage", e);
        toast({
          title: "Error",
          description: "Could not load your saved platforms",
          variant: "destructive"
        });
      }
    }
  }, []);

  // Save platforms to localStorage whenever they change
  useEffect(() => {
    if (platforms.length > 0) {
      // Create a serializable version of platforms
      const serializablePlatforms = platforms.map(platform => ({
        ...platform,
        // We'll just store the icon as a string identifier
        iconName: platform.id
      }));
      localStorage.setItem("crossmessage-platforms", JSON.stringify(serializablePlatforms));
    }
  }, [platforms]);

  const handleAddPlatform = (platform: Platform) => {
    // Check for duplicates
    const existingPlatform = platforms.find(p => 
      p.id === platform.id && 
      (platform.id !== "custom" || p.url === platform.url)
    );
    
    if (existingPlatform) {
      toast({
        title: "Platform already exists",
        description: "This platform is already in your dashboard",
        variant: "destructive"
      });
      return;
    }
    
    // Add new platform
    const newPlatforms = [...platforms, platform];
    setPlatforms(newPlatforms);
    setActivePlatform(platform);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Import all the icons to use in the app
  const {
    MessageCircle, MessageSquare, BrandWhatsapp, 
    BrandTelegram, BrandDiscord, BrandZoom, BrandGoogle
  } = require("lucide-react");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        platforms={platforms}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        onAddPlatform={handleOpenDialog}
      />
      
      <main className="flex-1 overflow-hidden">
        {platforms.length === 0 ? (
          <EmptyState onAddPlatform={handleOpenDialog} />
        ) : activePlatform ? (
          <PlatformView platform={activePlatform} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-muted-foreground">
              Select a platform from the sidebar
            </p>
          </div>
        )}
      </main>
      
      <PlatformCards 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddPlatform={handleAddPlatform}
      />
    </div>
  );
};

export default Index;
