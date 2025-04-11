
import React from "react";
import { Platform } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  Info, ExternalLink, Maximize2, 
  Volume2, MicOff, Video, VideoOff, 
  Phone, PhoneOff
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlatformViewProps {
  platform: Platform;
}

const PlatformView: React.FC<PlatformViewProps> = ({ platform }) => {
  const [fullscreen, setFullscreen] = React.useState(false);
  const [showVideoControls, setShowVideoControls] = React.useState(platform.type === "video");
  
  const toggleFullscreen = () => {
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };
  
  React.useEffect(() => {
    setShowVideoControls(platform.type === "video");
  }, [platform]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between p-3 border-b bg-white/60 backdrop-blur-sm dark:bg-gray-900/60">
        <div className="flex items-center space-x-2">
          <div className={`text-${platform.color}`}>
            <platform.icon size={24} />
          </div>
          <h2 className="font-medium text-xl">{platform.name}</h2>
          <Badge variant="outline" className="ml-2">
            {platform.type}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          {showVideoControls && (
            <div className="flex gap-2 bg-sidebar/10 p-1 px-2 rounded-full mr-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Volume2 size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <MicOff size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <VideoOff size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"
              >
                <PhoneOff size={16} />
              </Button>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleFullscreen}
          >
            <Maximize2 size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => window.open(platform.url, '_blank')}
          >
            <ExternalLink size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
          >
            <Info size={18} />
          </Button>
        </div>
      </div>
      <div className="flex-1 relative">
        <iframe
          id="platform-frame"
          src={platform.url}
          className="platform-frame"
          title={platform.name}
          allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen"
        />
      </div>
    </div>
  );
};

export default PlatformView;
