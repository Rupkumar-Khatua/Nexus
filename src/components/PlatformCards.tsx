
import React from "react";
import { 
  MessageCircle, Video, 
  MessageSquare, Phone,
  Mail, Discord, 
  Video as VideoIcon, LucideIcon
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Platform } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface PlatformCardsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPlatform: (platform: Platform) => void;
}

const platforms: Omit<Platform, "url">[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: Phone,
    color: "messaging-green",
    description: "Connect to WhatsApp Web",
    type: "chat",
    directUrl: true
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Mail,
    color: "messaging-blue",
    description: "Access Telegram Web",
    type: "chat",
    directUrl: true
  },
  {
    id: "discord",
    name: "Discord",
    icon: Discord,
    color: "messaging-purple",
    description: "Connect to Discord Web",
    type: "chat",
    directUrl: true
  },
  {
    id: "zoom",
    name: "Zoom",
    icon: VideoIcon,
    color: "messaging-blue",
    description: "Join or host Zoom meetings",
    type: "video",
    directUrl: false
  },
  {
    id: "google-meet",
    name: "Google Meet",
    icon: Video,
    color: "messaging-red",
    description: "Join Google Meet calls",
    type: "video",
    directUrl: false
  },
  {
    id: "custom",
    name: "Custom Platform",
    icon: MessageSquare,
    color: "messaging-yellow",
    description: "Add any other messaging platform",
    type: "mixed",
    directUrl: false
  },
];

const platformUrls: Record<string, string> = {
  "whatsapp": "https://web.whatsapp.com/",
  "telegram": "https://web.telegram.org/",
  "discord": "https://discord.com/app",
};

const PlatformCards: React.FC<PlatformCardsProps> = ({ 
  open, 
  onOpenChange,
  onAddPlatform
}) => {
  const [selectedPlatform, setSelectedPlatform] = React.useState<Omit<Platform, "url"> | null>(null);
  const [customUrl, setCustomUrl] = React.useState("");
  const [meetingId, setMeetingId] = React.useState("");
  const { toast } = useToast();

  const handlePlatformSelect = (platform: Omit<Platform, "url">) => {
    setSelectedPlatform(platform);
    // Pre-fill URL for direct platforms
    if (platform.directUrl && platformUrls[platform.id]) {
      setCustomUrl(platformUrls[platform.id]);
    } else {
      setCustomUrl("");
      setMeetingId("");
    }
  };

  const handleAddPlatform = () => {
    if (!selectedPlatform) return;
    
    let finalUrl = customUrl;
    
    // Handle specific platform URL formatting
    if (selectedPlatform.id === "zoom" && meetingId) {
      // This is a simplified example - in production you'd need to handle Zoom URL formatting properly
      finalUrl = `https://zoom.us/j/${meetingId.replace(/\s/g, "")}`;
    }
    
    if (selectedPlatform.id === "google-meet" && meetingId) {
      finalUrl = `https://meet.google.com/${meetingId.replace(/\s/g, "")}`;
    }
    
    if (!finalUrl) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL for this platform",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Basic URL validation
      new URL(finalUrl);
      
      const newPlatform: Platform = {
        ...selectedPlatform,
        url: finalUrl
      };
      
      onAddPlatform(newPlatform);
      toast({
        title: "Platform Added",
        description: `${newPlatform.name} has been added successfully`
      });
      
      // Reset form
      setSelectedPlatform(null);
      setCustomUrl("");
      setMeetingId("");
      onOpenChange(false);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
    }
  };

  const handleBackClick = () => {
    setSelectedPlatform(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {selectedPlatform ? `Configure ${selectedPlatform.name}` : "Add a Platform"}
          </DialogTitle>
          <DialogDescription>
            {selectedPlatform 
              ? `Enter the details to connect to ${selectedPlatform.name}`
              : "Choose a messaging or video conferencing platform to add to your dashboard"}
          </DialogDescription>
        </DialogHeader>
        
        {!selectedPlatform ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {platforms.map((platform) => (
              <div 
                key={platform.id}
                className="platform-card"
                onClick={() => handlePlatformSelect(platform)}
              >
                <div className={`platform-icon text-${platform.color}`}>
                  <platform.icon size={40} />
                </div>
                <h3 className="font-medium text-center">{platform.name}</h3>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <Button 
              variant="outline" 
              onClick={handleBackClick}
              className="mb-4"
            >
              ← Back to platforms
            </Button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className={`text-3xl text-${selectedPlatform.color}`}>
                <selectedPlatform.icon size={48} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{selectedPlatform.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedPlatform.description}</p>
              </div>
            </div>
            
            {(selectedPlatform.id === "zoom" || selectedPlatform.id === "google-meet") && (
              <div className="space-y-2">
                <Label htmlFor="meetingId">Meeting ID or Link</Label>
                <Input
                  id="meetingId"
                  placeholder={selectedPlatform.id === "zoom" ? "Enter Zoom meeting ID" : "Enter Google Meet code"}
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                />
              </div>
            )}
            
            {(!selectedPlatform.directUrl || selectedPlatform.id === "custom") && (
              <div className="space-y-2">
                <Label htmlFor="customUrl">Platform URL</Label>
                <Input
                  id="customUrl"
                  placeholder="https://"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the full URL including https://
                </p>
              </div>
            )}
            
            <Button 
              className="w-full mt-6" 
              onClick={handleAddPlatform}
            >
              Add {selectedPlatform.name}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlatformCards;
