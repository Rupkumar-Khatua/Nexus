
import React from "react";
import { 
  Volume2, MicOff, VideoOff, PhoneOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const VideoControls: React.FC = () => {
  return (
    <Card className="flex gap-2 bg-sidebar/10 p-1 px-2 rounded-full mr-2 border-none shadow-none">
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-neopop-purple/10 hover:text-neopop-purple"
      >
        <Volume2 size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-neopop-blue/10 hover:text-neopop-blue"
      >
        <MicOff size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-neopop-yellow/10 hover:text-neopop-yellow"
      >
        <VideoOff size={16} />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        className="h-8 w-8 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"
      >
        <PhoneOff size={16} />
      </Button>
    </Card>
  );
};

export default VideoControls;
