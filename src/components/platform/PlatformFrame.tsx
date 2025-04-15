
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
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const { toast } = useToast();

  // Generate a unique session ID for this platform connection
  const [sessionId] = useState(() => `nexus-${Math.random().toString(36).substring(2, 10)}`);

  // Reset state when platform changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setConnectionAttempts(0);
  }, [platform]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
    toast({
      title: "Platform Connected",
      description: `${platform.name} loaded successfully with session ID: ${sessionId}`,
    });
  };
  
  const handleIframeError = () => {
    // Try different connection methods based on attempt number
    if (connectionAttempts < 3) {
      setConnectionAttempts(prev => prev + 1);
      setIsLoading(true);
      
      // Wait a moment before trying a different connection method
      setTimeout(() => {
        setIsLoading(false);
        const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
        if (iframe) {
          // Add session ID and different parameters to help with connection
          const url = new URL(platform.url);
          url.searchParams.set('nexus_session', sessionId);
          url.searchParams.set('embed', '1');
          url.searchParams.set('attempt', connectionAttempts.toString());
          iframe.src = url.toString();
        }
      }, 1500);
      
      toast({
        title: "Retrying Connection",
        description: `Attempting alternative connection method for ${platform.name}`,
      });
    } else {
      setIsLoading(false);
      setHasError(true);
      toast({
        title: "Connection Error",
        description: `Unable to connect to ${platform.name}`,
        variant: "destructive"
      });
    }
  };
  
  const reloadIframe = () => {
    setIsLoading(true);
    setHasError(false);
    setConnectionAttempts(0);
    const iframe = document.getElementById('platform-frame') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = platform.url;
    }
  };

  // Generate modified URL with session parameters
  const getEnhancedUrl = () => {
    try {
      const url = new URL(platform.url);
      url.searchParams.set('nexus_session', sessionId);
      url.searchParams.set('embed', '1');
      return url.toString();
    } catch (e) {
      return platform.url;
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
        src={getEnhancedUrl()}
        className="w-full h-full border-0"
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
