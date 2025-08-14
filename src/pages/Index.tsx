import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import MobileDrawer from "@/components/MobileDrawer";
import PlatformView from "@/components/platform/PlatformView";
import EmptyState from "@/components/EmptyState";
import PlatformCards from "@/components/PlatformCards";
import { usePlatforms } from "@/hooks/usePlatforms";
import PrivacyAi from "@/components/PrivacyAi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Index = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPrivacyAi, setShowPrivacyAi] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
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
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sidebar 
          platforms={platforms}
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
          onAddPlatform={handleOpenDialog}
          navigateToHome={navigateToHome}
        />
      )}
      
      <main className="flex-1 h-full flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <header className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-2">
              <MobileDrawer
                platforms={platforms}
                activePlatform={activePlatform}
                setActivePlatform={setActivePlatform}
                onAddPlatform={handleOpenDialog}
                navigateToHome={navigateToHome}
              />
              <h1 className="text-lg font-semibold">
                {activePlatform ? activePlatform.name : "Nexus"}
              </h1>
            </div>
          </header>
        )}
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {showPrivacyAi ? (
            <PrivacyAi />
          ) : showHome || platforms.length === 0 ? (
            <EmptyState onAddPlatform={handleOpenDialog} />
          ) : activePlatform ? (
            <div className="h-full w-full">
              <PlatformView platform={activePlatform} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-4">
              <p className={cn(
                "text-center text-muted-foreground",
                isMobile ? "text-base" : "text-lg"
              )}>
                {isMobile ? "Tap the menu to select a platform" : "Select a platform from the sidebar"}
              </p>
            </div>
          )}
        </div>
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
