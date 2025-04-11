
import React from "react";
import PlatformCard from "./PlatformCard";
import { platforms } from "@/data/platforms";
import { Platform } from "@/types";

interface PlatformSelectorProps {
  onSelectPlatform: (platform: Omit<Platform, "url">) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  onSelectPlatform 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {platforms.map((platform) => (
        <PlatformCard 
          key={platform.id}
          platform={platform}
          onSelect={onSelectPlatform}
        />
      ))}
    </div>
  );
};

export default PlatformSelector;
