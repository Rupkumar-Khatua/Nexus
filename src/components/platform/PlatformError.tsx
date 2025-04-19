
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PlatformErrorProps {
  platformName: string;
  platformUrl: string;
  onRetry: () => void;
  onContinueAnyway: () => void;
}

const PlatformError: React.FC<PlatformErrorProps> = ({ 
  platformName, 
  platformUrl, 
  onRetry,
  onContinueAnyway
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
      <Card className="max-w-md p-6 shadow-lg border-amber-200">
        <div className="flex flex-col items-center text-center">
          <div className="text-amber-500 mb-4">
            <AlertCircle size={64} />
          </div>
          <h3 className="text-xl font-bold mb-2">Platform Integration</h3>
          <p className="mb-4">
            {platformName} requires authentication through its official API to provide a seamless experience within Nexus.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg mb-6 text-left">
            <h4 className="font-medium mb-2">We're working on it:</h4>
            <ul className="text-sm space-y-1">
              <li>• Full integration with {platformName}'s API</li>
              <li>• Single sign-on across all platforms</li>
              <li>• Secure messaging and data transfer</li>
              <li>• Complete in-app functionality</li>
            </ul>
          </div>
          <div className="flex flex-col w-full space-y-3">
            <Button 
              onClick={onRetry}
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
            >
              Try Again
            </Button>
            <Button 
              onClick={onContinueAnyway}
              className="w-full flex items-center justify-center gap-2"
            >
              <ArrowRight size={18} />
              Continue with Integration
            </Button>
            <div className="text-xs text-muted-foreground">
              We're working to integrate all platforms with a single sign-on experience.
              Stay tuned for updates as we enhance the unified communication experience.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformError;
