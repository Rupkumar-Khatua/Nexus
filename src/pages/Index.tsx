
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PlatformView from "@/components/PlatformView";
import EmptyState from "@/components/EmptyState";
import PlatformCards from "@/components/PlatformCards";
import { usePlatforms } from "@/hooks/usePlatforms";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { 
    platforms, 
    activePlatform, 
    setActivePlatform, 
    handleAddPlatform 
  } = usePlatforms();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        platforms={platforms}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        onAddPlatform={handleOpenDialog}
      />
      
      <main className="flex-1 overflow-hidden">
        {platforms.length === 0 ? (
          <EmptyState onAddPlatform={handleOpenDialog} />
        ) : activePlatform ? (
          <PlatformView platform={activePlatform} />
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
