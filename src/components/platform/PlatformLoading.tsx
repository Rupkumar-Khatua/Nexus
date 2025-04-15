
import React from "react";

interface PlatformLoadingProps {
  platformName: string;
}

const PlatformLoading: React.FC<PlatformLoadingProps> = ({ platformName }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-lg">Connecting to {platformName}...</p>
      </div>
    </div>
  );
};

export default PlatformLoading;
