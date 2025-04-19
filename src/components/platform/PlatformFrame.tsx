
import React, { useState, useEffect } from "react";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import PlatformLoading from "./PlatformLoading";
import PlatformError from "./PlatformError";
import PlatformAPIView from "./PlatformAPIView";

interface PlatformFrameProps {
  platform: Platform;
}

const PlatformFrame: React.FC<PlatformFrameProps> = ({ platform }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useAPIIntegration, setUseAPIIntegration] = useState(false);
  const { toast } = useToast();

  // Reset state when platform changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setUseAPIIntegration(false);
  }, [platform]);

  // Check if platform is supported with API integration
  useEffect(() => {
    const apiSupportedPlatforms = [
      "whatsapp", "telegram", "signal", "discord", 
      "facebook", "instagram", "linkedin"
    ];
    
    if (apiSupportedPlatforms.includes(platform.id)) {
      // For API supported platforms, show loading state briefly then try API integration
      const timer = setTimeout(() => {
        setIsLoading(false);
        // We'll show error state until the user chooses to continue with API integration
        setHasError(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [platform.id, platform.name, toast]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    
    // Check if iframe loaded successfully
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
          setHasError(true);
        }
      }
    }, 1000);
  };
  
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  
  const reloadIframe = () => {
    setIsLoading(true);
    setHasError(false);
    setUseAPIIntegration(false);
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = platform.url;
    }
  };

  const continueWithAPIIntegration = () => {
    setUseAPIIntegration(true);
    setHasError(false);
    toast({
      title: "API Integration Activated",
      description: `${platform.name} integration initialized`,
      variant: "default"
    });
  };

  return (
    <div className="flex-1 relative overflow-hidden">
      {isLoading && <PlatformLoading platformName={platform.name} />}
      
      {hasError && (
        <PlatformError 
          platformName={platform.name} 
          platformUrl={platform.url} 
          onRetry={reloadIframe} 
          onContinueAnyway={continueWithAPIIntegration}
        />
      )}
      
      {useAPIIntegration && (
        <PlatformAPIView platform={platform} />
      )}
      
      {!hasError && !useAPIIntegration && (
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
