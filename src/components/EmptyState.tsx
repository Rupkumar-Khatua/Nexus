
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, Video, 
  MessagesSquare, Share2 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  onAddPlatform: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddPlatform }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8 flex space-x-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center animate-ping opacity-20">
            <MessagesSquare size={64} className="text-messaging-blue" />
          </div>
          <MessageCircle size={64} className="text-messaging-blue relative" />
        </div>
        <Video size={64} className="text-messaging-purple" />
        <Share2 size={64} className="text-messaging-green" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Welcome to CrossMessage</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Connect all your messaging platforms in one place, without creating new accounts or downloading apps.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full">
        {[
          {
            title: "Chat Integration",
            description: "Access WhatsApp, Telegram, Discord and more from one interface",
            icon: MessageCircle,
            color: "text-messaging-blue"
          },
          {
            title: "Video Calls",
            description: "Join Zoom, Google Meet and other video calls directly",
            icon: Video,
            color: "text-messaging-purple"
          },
          {
            title: "No Downloads",
            description: "Everything works in your browser - no installs needed",
            icon: Share2,
            color: "text-messaging-green"
          }
        ].map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm"
          >
            <feature.icon size={40} className={cn("mb-4", feature.color)} />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <Button size="lg" onClick={onAddPlatform}>
        Add Your First Platform
      </Button>
    </div>
  );
};

export default EmptyState;
