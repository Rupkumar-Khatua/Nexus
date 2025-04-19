
import React, { useState } from "react";
import { Platform } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronUp, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  const reloadIframe = () => {
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
            onClick={reloadIframe}
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
            reloadIframe={reloadIframe}
          />
          
          <div className="flex-1 relative overflow-hidden">
            <PlatformFrame platform={platform} />
          </div>
          
          <QuickAction />
        </>
      )}
    </div>
  );
};

export default PlatformView;
