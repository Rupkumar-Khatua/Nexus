
import React, { useEffect, useState } from "react";
import { Platform } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  Info, ExternalLink, Maximize2, 
  Volume2, MicOff, Video, VideoOff, 
  Phone, PhoneOff, MessageCircle,
  RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface PlatformViewProps {
  platform: Platform;
}

const PlatformView: React.FC<PlatformViewProps> = ({ platform }) => {
  const [fullscreen, setFullscreen] = React.useState(false);
  const [showVideoControls, setShowVideoControls] = React.useState(platform.type === "video");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  
  // Reset state when platform changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setShowVideoControls(platform.type === "video");
  }, [platform]);
  
  const toggleFullscreen = () => {
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
          toast({
            title: "Fullscreen Error",
            description: "Unable to enter fullscreen mode",
            variant: "destructive"
          });
        });
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };
  
  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    toast({
      title: "Platform Connected",
      description: `${platform.name} loaded successfully`,
    });
  };
  
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    toast({
      title: "Connection Error",
      description: `Unable to connect to ${platform.name}`,
      variant: "destructive"
    });
  };
  
  const reloadIframe = () => {
    setIsLoading(true);
    setHasError(false);
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = platform.url;
    }
  };

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
            onClick={reloadIframe}
            className="hover:bg-neopop-purple/10 hover:text-neopop-purple"
          >
            <RefreshCcw size={18} />
          </Button>
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
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-lg">Connecting to {platform.name}...</p>
            </div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
            <div className="flex flex-col items-center text-center max-w-md p-6">
              <div className="text-red-500 mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Connection Error</h3>
              <p className="mb-4">Unable to connect to {platform.name}. This may be due to:</p>
              <ul className="text-left text-sm mb-6">
                <li>• Website blocking iframe embedding</li>
                <li>• Invalid URL or service is down</li>
                <li>• Browser security restrictions</li>
                <li>• Network connectivity issues</li>
              </ul>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={reloadIframe}>Try Again</Button>
                <Button onClick={() => window.open(platform.url, '_blank')}>Open in New Tab</Button>
              </div>
            </div>
          </div>
        )}
        
        <iframe
          id="platform-frame"
          src={platform.url}
          className="platform-frame"
          title={platform.name}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
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
