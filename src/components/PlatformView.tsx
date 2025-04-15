
import React from "react";
import { Platform } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  Info, ExternalLink, Maximize2, 
  Volume2, MicOff, Video, VideoOff, 
  Phone, PhoneOff, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex flex-col h-full w-full relative">
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-sm border-b">
        <div className="flex items-center space-x-2">
          <div className={`text-${platform.color} p-1 rounded-full bg-sidebar/10`}>
            <platform.icon size={24} />
          </div>
          <h2 className="font-medium text-xl">{platform.name}</h2>
          <Badge variant="outline" className="ml-2 bg-purple-500/10 text-purple-600 border-purple-400">
            {platform.type}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          {showVideoControls && (
            <Card className="flex gap-2 bg-sidebar/10 p-1 px-2 rounded-full mr-2 border-none shadow-none">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-neopop-purple/10 hover:text-neopop-purple"
              >
                <Volume2 size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-neopop-blue/10 hover:text-neopop-blue"
              >
                <MicOff size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-neopop-yellow/10 hover:text-neopop-yellow"
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
            </Card>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleFullscreen}
            className="hover:bg-neopop-blue/10 hover:text-neopop-blue"
          >
            <Maximize2 size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => window.open(platform.url, '_blank')}
            className="hover:bg-neopop-green/10 hover:text-neopop-green"
          >
            <ExternalLink size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-neopop-yellow/10 hover:text-neopop-yellow"
          >
            <Info size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <iframe
          id="platform-frame"
          src={platform.url}
          className="platform-frame"
          title={platform.name}
          allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen"
        />
      </div>
      
      {/* Add floating quick action button */}
      <div className="absolute bottom-8 right-8">
        <Button 
          className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-0"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      </div>
    </div>
  );
};

export default PlatformView;
