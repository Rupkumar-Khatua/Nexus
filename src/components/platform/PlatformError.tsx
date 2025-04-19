
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PlatformErrorProps {
  platformName: string;
  platformUrl: string;
  onRetry: () => void;
}

const PlatformError: React.FC<PlatformErrorProps> = ({ 
  platformName, 
  platformUrl, 
  onRetry 
}) => {
  const handleOpenExternal = () => {
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
      <Card className="max-w-md p-6 shadow-lg border-red-200">
        <div className="flex flex-col items-center text-center">
          <div className="text-red-500 mb-4">
            <AlertCircle size={64} />
          </div>
          <h3 className="text-xl font-bold mb-2">Connection Restricted</h3>
          <p className="mb-4">
            {platformName} doesn't allow direct embedding due to security restrictions. This is a limitation imposed by the platform itself, not by Nexus.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg mb-6 text-left">
            <h4 className="font-medium mb-2">Why this happens:</h4>
            <ul className="text-sm space-y-1">
              <li>• Many platforms block iframe embedding (X-Frame-Options)</li>
              <li>• This is a security measure to prevent clickjacking</li>
              <li>• Some platforms require authentication via their own domains</li>
              <li>• API access typically requires developer registration</li>
            </ul>
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Button 
              onClick={handleOpenExternal}
              className="w-full flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              Open {platformName} in New Tab
            </Button>
            <div className="text-xs text-muted-foreground">
              For the best experience, please use the external link above to access {platformName}.
              You can still use Nexus to manage all your platform connections in one place.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformError;
