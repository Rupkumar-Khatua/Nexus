
import React from "react";
import { Platform } from "@/types";
import { Badge } from "@/components/ui/badge";
import { 
  Info, ExternalLink, Maximize2, 
  RefreshCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VideoControls from "./VideoControls";

interface PlatformHeaderProps {
  platform: Platform;
  showVideoControls: boolean;
  toggleFullscreen: () => void;
  reloadIframe: () => void;
}

const PlatformHeader: React.FC<PlatformHeaderProps> = ({ 
  platform, 
  showVideoControls, 
  toggleFullscreen, 
  reloadIframe 
}) => {
  return (
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
        {showVideoControls && <VideoControls />}
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
  );
};

export default PlatformHeader;
