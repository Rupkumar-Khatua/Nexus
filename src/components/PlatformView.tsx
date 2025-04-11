
import React, { useState } from "react";
import { Platform } from "@/types";
import { 
  Mic, MicOff, Video, VideoOff, 
  Phone, Share2, Users, MessageSquare,
  Settings, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PrivacyAi from "./PrivacyAi";

interface PlatformViewProps {
  platform: Platform;
}

const PlatformView: React.FC<PlatformViewProps> = ({ platform }) => {
  const [showPrivacyAi, setShowPrivacyAi] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const { toast } = useToast();

  const isVideoCall = platform.type === "video";

  const toggleMic = () => {
    setMicEnabled(!micEnabled);
    toast({
      title: micEnabled ? "Microphone Off" : "Microphone On",
      description: micEnabled ? "Your microphone has been muted" : "Your microphone has been unmuted",
    });
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toast({
      title: videoEnabled ? "Camera Off" : "Camera On",
      description: videoEnabled ? "Your camera has been turned off" : "Your camera has been turned on",
    });
  };

  const handleEndCall = () => {
    toast({
      title: "Call Ended",
      description: "The call has been terminated",
      variant: "destructive",
    });
  };

  const handleShareScreen = () => {
    toast({
      title: "Screen Sharing",
      description: "Your screen is now being shared",
    });
  };

  const handleShowParticipants = () => {
    toast({
      title: "Participants",
      description: "Opening participants panel",
    });
  };

  const togglePrivacyAi = () => {
    setShowPrivacyAi(!showPrivacyAi);
  };

  if (showPrivacyAi) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-2">
          <Button 
            variant="outline" 
            onClick={togglePrivacyAi}
            className="mb-2"
          >
            Back to {platform.name}
          </Button>
        </div>
        <PrivacyAi />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full bg-${platform.color}/20`}>
            <platform.icon className={`h-5 w-5 text-${platform.color}`} />
          </div>
          <h2 className="font-semibold">{platform.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={togglePrivacyAi}
            className="relative"
          >
            <Shield className="h-5 w-5 text-purple-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-grow relative">
        {platform.url ? (
          <iframe 
            src={platform.url} 
            title={platform.name}
            className="platform-frame"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            allow="camera; microphone; clipboard-read; clipboard-write; display-capture"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No URL configured for this platform</p>
          </div>
        )}
      </div>
      
      {isVideoCall && (
        <div className="p-4 bg-background/80 backdrop-blur border-t flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${micEnabled ? 'bg-accent/20' : 'bg-destructive/20'}`}
            onClick={toggleMic}
          >
            {micEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-destructive" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${videoEnabled ? 'bg-accent/20' : 'bg-destructive/20'}`}
            onClick={toggleVideo}
          >
            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-destructive" />}
          </Button>
          
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full"
            onClick={handleEndCall}
          >
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-accent/20"
            onClick={handleShareScreen}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-accent/20"
            onClick={handleShowParticipants}
          >
            <Users className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-accent/20"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlatformView;
