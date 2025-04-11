
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import PlatformSelector from "./platform/PlatformSelector";
import PlatformConfigForm from "./platform/PlatformConfigForm";
import { platformUrls } from "@/data/platforms";

interface PlatformCardsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPlatform: (platform: Platform) => void;
}

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
          <PlatformSelector onSelectPlatform={handlePlatformSelect} />
        ) : (
          <PlatformConfigForm
            selectedPlatform={selectedPlatform}
            onBackClick={handleBackClick}
            onAddPlatform={handleAddPlatform}
            customUrl={customUrl}
            setCustomUrl={setCustomUrl}
            meetingId={meetingId}
            setMeetingId={setMeetingId}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PlatformCards;
