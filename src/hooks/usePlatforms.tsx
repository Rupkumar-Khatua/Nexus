
import { useState, useEffect } from "react";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { 
  MessageCircle, MessageSquare, Phone, 
  Mail, MessageSquareDashed, Video, Video as VideoIcon,
  Signal, Instagram, Facebook, Linkedin,
  Github, Twitter, Slack
} from "lucide-react";

export const usePlatforms = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);
  const { toast } = useToast();

  // Load platforms from localStorage
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
                  platform.id === "signal" ? Signal :
                  platform.id === "telegram" ? Mail :
                  platform.id === "discord" ? MessageSquareDashed :
                  platform.id === "facebook" ? Facebook :
                  platform.id === "instagram" ? Instagram :
                  platform.id === "twitter" ? Twitter :
                  platform.id === "linkedin" ? Linkedin :
                  platform.id === "github" ? Github :
                  platform.id === "slack" ? Slack :
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

  // Save platforms to localStorage when they change
  useEffect(() => {
    if (platforms.length > 0) {
      const serializablePlatforms = platforms.map(platform => ({
        ...platform,
        iconName: platform.id
      }));
      localStorage.setItem("crossmessage-platforms", JSON.stringify(serializablePlatforms));
    }
  }, [platforms]);

  // Add a new platform
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

  return {
    platforms,
    setPlatforms,
    activePlatform,
    setActivePlatform,
    handleAddPlatform
  };
};
