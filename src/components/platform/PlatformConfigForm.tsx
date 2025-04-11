
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Platform } from "@/types";
import { platformUrls } from "@/data/platforms";

interface PlatformConfigFormProps {
  selectedPlatform: Omit<Platform, "url"> | null;
  onBackClick: () => void;
  onAddPlatform: () => void;
  customUrl: string;
  setCustomUrl: (url: string) => void;
  meetingId: string;
  setMeetingId: (id: string) => void;
}

const PlatformConfigForm: React.FC<PlatformConfigFormProps> = ({
  selectedPlatform,
  onBackClick,
  onAddPlatform,
  customUrl,
  setCustomUrl,
  meetingId,
  setMeetingId,
}) => {
  if (!selectedPlatform) return null;

  return (
    <div className="space-y-4 py-2">
      <Button 
        variant="outline" 
        onClick={onBackClick}
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
        onClick={onAddPlatform}
      >
        Add {selectedPlatform.name}
      </Button>
    </div>
  );
};

export default PlatformConfigForm;
