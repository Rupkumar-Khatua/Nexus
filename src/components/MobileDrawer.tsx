import React from "react";
import { cn } from "@/lib/utils";
import { 
  MessageCircle, Video, 
  Settings, Plus,
  Users, Shield, Bell,
  Search, Phone,
  ChevronDown, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import NexusLogo from "./NexusLogo";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileDrawerProps {
  platforms: Platform[];
  activePlatform: Platform | null;
  setActivePlatform: (platform: Platform | null) => void;
  onAddPlatform: () => void;
  navigateToHome: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  platforms,
  activePlatform,
  setActivePlatform,
  onAddPlatform,
  navigateToHome
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [platformsExpanded, setPlatformsExpanded] = React.useState(true);
  const { toast } = useToast();

  const togglePlatforms = () => {
    setPlatformsExpanded(!platformsExpanded);
  };

  const handlePlatformClick = (platform: Platform) => {
    setActivePlatform(platform);
    setIsOpen(false); // Close drawer when platform is selected
    if (platform.directUrl && platform.url) {
      toast({
        title: "Opening external platform",
        description: `Opening ${platform.name} in the integrated view`,
      });
    }
  };

  const handlePrivacyAI = () => {
    toast({
      title: "Privacy.ai activated",
      description: "Now monitoring for unknown contacts",
      variant: "default",
    });
    setIsOpen(false);
  };

  const navItems = [
    { icon: Users, label: "Contacts", onClick: () => setIsOpen(false) },
    { icon: Bell, label: "Notifications", onClick: () => setIsOpen(false) },
    { icon: Search, label: "Search", onClick: () => setIsOpen(false) },
    { icon: Shield, label: "Privacy.ai", onClick: handlePrivacyAI, highlight: true },
    { icon: Settings, label: "Settings", onClick: () => setIsOpen(false) },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={24} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
          {/* Header */}
          <div className="flex items-center justify-center p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { navigateToHome(); setIsOpen(false); }}>
              <NexusLogo size={32} />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Nexus</h1>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-2 p-4">
              {/* Platforms Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-purple-300">Platforms</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={togglePlatforms}
                  >
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-200",
                        platformsExpanded ? "" : "-rotate-90"
                      )}
                    />
                  </Button>
                </div>

                <div className={cn(
                  "space-y-2 transition-all duration-200",
                  !platformsExpanded ? "h-0 overflow-hidden" : ""
                )}>
                  {platforms.map((platform) => (
                    <Button
                      key={platform.id}
                      variant={activePlatform?.id === platform.id ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-12 text-left",
                        activePlatform?.id === platform.id ? "bg-sidebar-accent/50" : ""
                      )}
                      onClick={() => handlePlatformClick(platform)}
                    >
                      <platform.icon
                        size={24}
                        className={cn("flex-shrink-0", `text-${platform.color}`)}
                      />
                      <span className="text-base">{platform.name}</span>
                    </Button>
                  ))}
                </div>

                <div className="mt-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12 bg-sidebar-accent hover:bg-sidebar-accent/80"
                    onClick={() => { onAddPlatform(); setIsOpen(false); }}
                  >
                    <Plus size={24} />
                    <span className="text-base">Add Platform</span>
                  </Button>
                </div>
              </div>

              {/* Features Section */}
              <div className="border-t border-sidebar-border pt-4">
                <h2 className="text-sm font-semibold mb-3 text-purple-300">Features</h2>
                
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 h-12 text-left",
                      item.highlight ? "bg-purple-700/20 hover:bg-purple-700/30" : ""
                    )}
                    onClick={item.onClick}
                  >
                    <item.icon size={24} className={item.highlight ? "text-purple-400" : ""} />
                    <span className="text-base">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;