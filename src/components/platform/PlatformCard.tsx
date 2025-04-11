
import React from "react";
import { LucideIcon } from "lucide-react";
import { Platform } from "@/types";

interface PlatformCardProps {
  platform: Omit<Platform, "url">;
  onSelect: (platform: Omit<Platform, "url">) => void;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ platform, onSelect }) => {
  return (
    <div 
      key={platform.id}
      className="platform-card"
      onClick={() => onSelect(platform)}
    >
      <div className={`platform-icon text-${platform.color}`}>
        <platform.icon size={40} />
      </div>
      <h3 className="font-medium text-center">{platform.name}</h3>
      <p className="text-xs text-center text-muted-foreground mt-1">
        {platform.description}
      </p>
    </div>
  );
};

export default PlatformCard;
