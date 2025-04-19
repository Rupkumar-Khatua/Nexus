
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

  // Handle platforms known to block iframe embedding
  useEffect(() => {
    const knownBlockedPlatforms = [
      "whatsapp", "telegram", "signal", "discord", 
      "facebook", "instagram", "linkedin"
    ];
    
    if (knownBlockedPlatforms.includes(platform.id)) {
      // We'll show error state immediately for known blocked platforms
      setIsLoading(false);
      setHasError(true);
      toast({
        title: "Direct embedding restricted",
        description: `${platform.name} requires opening in a new tab`,
        variant: "default"
      });
    }
  }, [platform.id, platform.name, toast]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    
    // Even if the iframe loads, it might be showing an error page within the iframe
    // We'll check this with a timeout to see if a connection error message appears
    setTimeout(() => {
      const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
      if (iframe) {
        try {
          // This will throw an error if cross-origin access is blocked
          const iframeContent = iframe.contentWindow?.document;
          if (iframeContent) {
            toast({
              title: "Platform Connected",
              description: `${platform.name} loaded successfully`,
            });
          }
        } catch (e) {
          // If we can't access the iframe content, it's likely blocked
          console.log("Cross-origin iframe access blocked");
        }
      }
    }, 1000);
  };
  
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    toast({
      title: "Connection Restricted",
      description: `${platform.name} requires opening in a new tab`,
      variant: "default"
    });
  };
  
  const reloadIframe = () => {
    const knownBlockedPlatforms = [
      "whatsapp", "telegram", "signal", "discord", 
      "facebook", "instagram", "linkedin"
    ];
    
    if (knownBlockedPlatforms.includes(platform.id)) {
      // For known blocked platforms, just open in a new tab
      window.open(platform.url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // For other platforms, try reloading
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
      
      {!hasError && (
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
      )}
    </div>
  );
};

export default PlatformFrame;
