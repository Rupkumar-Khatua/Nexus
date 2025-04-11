
import React, { useState, useEffect } from "react";
import { Platform } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PlatformViewProps {
  platform: Platform;
}

const PlatformView: React.FC<PlatformViewProps> = ({ platform }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when platform changes
    setLoading(true);
    setError(null);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      if (platform.url) {
        setLoading(false);
      } else {
        setError("Platform URL not configured");
        setLoading(false);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [platform]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setError("Failed to load platform");
    setLoading(false);
  };

  return (
    <Card className="flex-1 min-h-0 overflow-hidden border-0">
      <CardContent className="p-0 h-full flex flex-col">
        {loading && (
          <div className="flex items-center justify-center h-full w-full animate-pulse">
            <Skeleton className="h-[80%] w-[95%] rounded-md" />
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        {!loading && !error && (
          <iframe 
            src={platform.url}
            title={`${platform.name} Integration`}
            className="platform-frame animate-fade-in"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PlatformView;
