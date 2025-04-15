
import React, { useState } from "react";
import { Platform } from "@/types";
import PlatformHeader from "./PlatformHeader";
import PlatformFrame from "./PlatformFrame";
import QuickAction from "./QuickAction";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlatformViewProps {
  platform: Platform;
}

const PlatformView: React.FC<PlatformViewProps> = ({ platform }) => {
  const [fullscreen, setFullscreen] = useState(false);
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
        setFullscreen(true);
      } else {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  };
  
  const reloadIframe = () => {
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = platform.url;
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <PlatformHeader 
        platform={platform} 
        showVideoControls={showVideoControls}
        toggleFullscreen={toggleFullscreen}
        reloadIframe={reloadIframe}
      />
      
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 h-full overflow-hidden"
      >
        <ResizablePanel defaultSize={75} minSize={30} className="h-full">
          <ScrollArea className="h-full w-full">
            <PlatformFrame platform={platform} />
          </ScrollArea>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={25} minSize={15} className="bg-background p-4 border-l">
          <ScrollArea className="h-full w-full">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Platform Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {platform.name}</p>
                <p><span className="font-medium">Type:</span> {platform.type}</p>
                <p><span className="font-medium">Description:</span> {platform.description}</p>
              </div>
              
              <h3 className="text-lg font-medium mt-6">Connection Status</h3>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <p>Connected with session ID: {generateSessionId()}</p>
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      <QuickAction />
    </div>
  );
};

// Generate a consistent session ID for platforms
function generateSessionId() {
  return `nexus-${Math.random().toString(36).substring(2, 10)}`;
}

export default PlatformView;
