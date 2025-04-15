
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import NexusLogo from "./NexusLogo";

interface EmptyStateProps {
  onAddPlatform: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddPlatform }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center">
      <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-8 rounded-xl mb-6 animate-float">
        <NexusLogo size={96} className="mx-auto mb-6" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
          Welcome to Nexus
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mb-8">
          Connect all your messaging platforms in one unified experience
        </p>
        <Button
          onClick={onAddPlatform}
          size="lg"
          className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <PlusCircle className="mr-2" />
          Add Your First Platform
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mt-8">
        <div className="feature-card p-6">
          <h3 className="text-lg font-semibold mb-2">All Your Messages</h3>
          <p className="text-muted-foreground">
            Connect WhatsApp, Telegram, Discord, and more in a single dashboard
          </p>
        </div>
        <div className="feature-card p-6">
          <h3 className="text-lg font-semibold mb-2">Video Calls</h3>
          <p className="text-muted-foreground">
            Join Zoom and Google Meet calls without switching apps
          </p>
        </div>
        <div className="feature-card p-6">
          <h3 className="text-lg font-semibold mb-2">Privacy Protection</h3>
          <p className="text-muted-foreground">
            Get alerts for messages from unknown contacts with Privacy.ai
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
