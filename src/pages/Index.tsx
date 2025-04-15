
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PlatformView from "@/components/platform/PlatformView";
import EmptyState from "@/components/EmptyState";
import PlatformCards from "@/components/PlatformCards";
import { usePlatforms } from "@/hooks/usePlatforms";
import PrivacyAi from "@/components/PrivacyAi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPrivacyAi, setShowPrivacyAi] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const { toast } = useToast();
  
  const { 
    platforms, 
    activePlatform, 
    setActivePlatform, 
    handleAddPlatform 
  } = usePlatforms();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const togglePrivacyAi = () => {
    setShowPrivacyAi(!showPrivacyAi);
  };

  const navigateToHome = () => {
    setActivePlatform(null);
    setShowHome(true);
    toast({
      title: "Welcome to Nexus",
      description: "Your unified platform hub",
    });
  };

  useEffect(() => {
    if (!dialogOpen) {
      document.body.style.overflow = '';
    }
  }, [dialogOpen]);

  useEffect(() => {
    if (activePlatform) {
      setShowHome(false);
    }
  }, [activePlatform]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
      <Sidebar 
        platforms={platforms}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        onAddPlatform={handleOpenDialog}
        navigateToHome={navigateToHome}
      />
      
      <main className="flex-1 h-full overflow-hidden">
        {showPrivacyAi ? (
          <div className="h-full overflow-hidden">
            <PrivacyAi />
          </div>
        ) : showHome || platforms.length === 0 ? (
          <ScrollArea className="h-full w-full">
            <EmptyState onAddPlatform={handleOpenDialog} />
          </ScrollArea>
        ) : activePlatform ? (
          <div className="h-full w-full overflow-hidden">
            <PlatformView platform={activePlatform} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-muted-foreground">
              Select a platform from the sidebar
            </p>
          </div>
        )}
      </main>
      
      <PlatformCards 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddPlatform={handleAddPlatform}
      />
    </div>
  );
};

export default Index;
