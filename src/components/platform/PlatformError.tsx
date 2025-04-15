
import React from "react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
      <div className="flex flex-col items-center text-center max-w-md p-6">
        <div className="text-red-500 mb-4">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1" fill="currentColor"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Connection Error</h3>
        <p className="mb-4">Unable to connect to {platformName}. This may be due to:</p>
        <ul className="text-left text-sm mb-6">
          <li>• Website blocking iframe embedding</li>
          <li>• Invalid URL or service is down</li>
          <li>• Browser security restrictions</li>
          <li>• Network connectivity issues</li>
        </ul>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onRetry}>Try Again</Button>
          <Button onClick={() => window.open(platformUrl, '_blank')}>Open in New Tab</Button>
        </div>
      </div>
    </div>
  );
};

export default PlatformError;
