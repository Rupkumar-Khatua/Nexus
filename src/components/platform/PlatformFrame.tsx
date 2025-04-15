
import React, { useState, useEffect } from "react";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import PlatformLoading from "./PlatformLoading";
import PlatformError from "./PlatformError";

interface PlatformFrameProps {
  platform: Platform;
}

const PlatformFrame: React.FC<PlatformFrameProps> = ({ platform }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  // Reset state when platform changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [platform]);

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
    <div className="flex-1 relative overflow-hidden">
      {isLoading && <PlatformLoading platformName={platform.name} />}
      
      {hasError && (
        <PlatformError 
          platformName={platform.name} 
          platformUrl={platform.url} 
          onRetry={reloadIframe} 
        />
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
  );
};

export default PlatformFrame;
