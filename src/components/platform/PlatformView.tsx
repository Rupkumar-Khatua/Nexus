
import React, { useState } from "react";
import { Platform } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronUp, X, RotateCcw, Maximize2 } from "lucide-react";
import PlatformHeader from "./PlatformHeader";
import PlatformFrame from "./PlatformFrame";
import QuickAction from "./QuickAction";

interface PlatformViewProps {
  platform: Platform;
}

const PlatformView: React.FC<PlatformViewProps> = ({ platform }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showVideoControls, setShowVideoControls] = useState(platform.type === "video");
  
  // Reset video controls when platform changes
  React.useEffect(() => {
    setShowVideoControls(platform.type === "video");
  }, [platform]);
  
  const toggleFullscreen = () => {
    const container = document.querySelector('.platform-frame-container') as HTMLElement;
    if (container) {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  const reloadPlatform = () => {
    // This will trigger a reload of the platform frame
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = platform.url;
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col h-full w-full transition-all duration-300 ${isCollapsed ? 'h-14' : 'h-full'}`}>
      <div className="flex items-center justify-between p-2 bg-sidebar border-b border-sidebar-border">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleCollapse}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronUp className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={reloadPlatform}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <RotateCcw size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Maximize2 size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}} // Close platform view
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X />
          </Button>
        </div>
      </div>
      
      {!isCollapsed && (
        <>
          <PlatformHeader 
            platform={platform} 
            showVideoControls={showVideoControls}
            toggleFullscreen={toggleFullscreen}
            reloadIframe={reloadPlatform}
          />
          
          <div className="flex-1 relative overflow-hidden platform-frame-container">
            <PlatformFrame platform={platform} />
          </div>
          
          <QuickAction />
        </>
      )}
    </div>
  );
};

export default PlatformView;
