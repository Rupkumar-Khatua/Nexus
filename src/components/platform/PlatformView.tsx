
import React, { useState } from "react";
import { Platform } from "@/types";
import PlatformHeader from "./PlatformHeader";
import PlatformFrame from "./PlatformFrame";
import QuickAction from "./QuickAction";

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
      
      <PlatformFrame platform={platform} />
      
      <QuickAction />
    </div>
  );
};

export default PlatformView;
