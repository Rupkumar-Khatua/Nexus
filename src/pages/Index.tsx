
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PlatformView from "@/components/PlatformView";
import EmptyState from "@/components/EmptyState";
import PlatformCards from "@/components/PlatformCards";
import { usePlatforms } from "@/hooks/usePlatforms";
import PrivacyAi from "@/components/PrivacyAi";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPrivacyAi, setShowPrivacyAi] = useState(false);
  
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

  // Fix scrolling issue by removing any overflow: hidden when dialog closes
  useEffect(() => {
    if (!dialogOpen) {
      document.body.style.overflow = '';
    }
  }, [dialogOpen]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
      <Sidebar 
        platforms={platforms}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        onAddPlatform={handleOpenDialog}
      />
      
      <main className="flex-1 h-full">
        <ScrollArea className="h-full w-full">
          {showPrivacyAi ? (
            <PrivacyAi />
          ) : platforms.length === 0 ? (
            <EmptyState onAddPlatform={handleOpenDialog} />
          ) : activePlatform ? (
            <div className="h-full w-full">
              <PlatformView platform={activePlatform} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-muted-foreground">
                Select a platform from the sidebar
              </p>
            </div>
          )}
        </ScrollArea>
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
