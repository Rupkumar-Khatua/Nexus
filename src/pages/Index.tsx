
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PlatformView from "@/components/PlatformView";
import EmptyState from "@/components/EmptyState";
import PlatformCards from "@/components/PlatformCards";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { 
  MessageCircle, MessageSquare, Phone, 
  Mail, MessageSquareDashed, Video, Video as VideoIcon
} from "lucide-react";

const Index = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedPlatforms = localStorage.getItem("crossmessage-platforms");
    if (storedPlatforms) {
      try {
        const parsedPlatforms = JSON.parse(storedPlatforms);
        const hydratedPlatforms = parsedPlatforms.map((platform: any) => {
          return {
            ...platform,
            icon: platform.id === "custom" ? MessageSquare : 
                  platform.id === "whatsapp" ? Phone :
                  platform.id === "telegram" ? Mail :
                  platform.id === "discord" ? MessageSquareDashed :
                  platform.id === "zoom" ? VideoIcon :
                  platform.id === "google-meet" ? Video : MessageCircle
          };
        });
        setPlatforms(hydratedPlatforms);
        
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

  useEffect(() => {
    if (platforms.length > 0) {
      const serializablePlatforms = platforms.map(platform => ({
        ...platform,
        iconName: platform.id
      }));
      localStorage.setItem("crossmessage-platforms", JSON.stringify(serializablePlatforms));
    }
  }, [platforms]);

  const handleAddPlatform = (platform: Platform) => {
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
    
    const newPlatforms = [...platforms, platform];
    setPlatforms(newPlatforms);
    setActivePlatform(platform);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

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
