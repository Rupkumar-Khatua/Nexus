
import React from "react";
import { cn } from "@/lib/utils";
import { 
  MessageCircle, Video, 
  Settings, ChevronLeft, 
  ChevronRight, Plus,
  Users, Shield, Bell,
  FileText, Search, Phone,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import NexusLogo from "./NexusLogo";
import { Link } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SidebarProps {
  platforms: Platform[];
  activePlatform: Platform | null;
  setActivePlatform: (platform: Platform | null) => void;
  onAddPlatform: () => void;
  navigateToHome: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  platforms,
  activePlatform,
  setActivePlatform,
  onAddPlatform,
  navigateToHome
}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsedPlatforms, setCollapsedPlatforms] = React.useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const togglePlatform = (platformId: string) => {
    setCollapsedPlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const handlePlatformClick = (platform: Platform) => {
    setActivePlatform(platform);
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
  };

  const navItems = [
    { icon: Users, label: "Contacts", onClick: () => {} },
    { icon: Bell, label: "Notifications", onClick: () => {} },
    { icon: Search, label: "Search", onClick: () => {} },
    { icon: Shield, label: "Privacy.ai", onClick: handlePrivacyAI, highlight: true },
    { icon: Settings, label: "Settings", onClick: () => {} },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2 cursor-pointer" onClick={navigateToHome}>
            <NexusLogo size={32} />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Nexus</h1>
          </div>
        )}
        {collapsed && <NexusLogo size={24} className="mx-auto cursor-pointer" onClick={navigateToHome} />}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <TooltipProvider>
          <div className={cn("mb-2", collapsed ? "px-2" : "px-4")}>
            {!collapsed && <h2 className="text-sm font-semibold mb-2 text-purple-300">Platforms</h2>}
          </div>

          <div className="space-y-1">
            {platforms.map((platform) => (
              <Collapsible key={platform.id}>
                <div className="flex items-center justify-between gap-1">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activePlatform?.id === platform.id ? "secondary" : "ghost"}
                        className={cn(
                          "flex-1 justify-start gap-2 hover:bg-sidebar-accent",
                          activePlatform?.id === platform.id ? "bg-sidebar-accent/50" : "",
                          collapsed ? "justify-center px-2" : ""
                        )}
                        onClick={() => handlePlatformClick(platform)}
                      >
                        <platform.icon
                          size={collapsed ? 24 : 20}
                          className={cn("flex-shrink-0", `text-${platform.color}`)}
                        />
                        {!collapsed && <span>{platform.name}</span>}
                      </Button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        <p>{platform.name}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                  
                  {!collapsed && (
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => togglePlatform(platform.id)}
                      >
                        <ChevronUp 
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            collapsedPlatforms[platform.id] ? "rotate-180" : ""
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                  )}
                </div>
                
                {!collapsed && (
                  <CollapsibleContent className="pl-10 py-2">
                    <div className="space-y-1 text-sm text-sidebar-foreground/70">
                      <div>Status: Active</div>
                      <div>Type: {platform.type}</div>
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ))}
          </div>

          <div className="mt-2">
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start gap-2 bg-sidebar-accent hover:bg-sidebar-accent/80",
                    collapsed ? "justify-center px-2" : ""
                  )}
                  onClick={onAddPlatform}
                >
                  <Plus size={collapsed ? 24 : 20} />
                  {!collapsed && <span>Add Platform</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>Add Platform</p>
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      <div className="mt-4 border-t border-sidebar-border pt-4 p-2">
        <TooltipProvider>
          {!collapsed && <h2 className="text-sm font-semibold px-4 mb-2 text-purple-300">Features</h2>}
          
          {navItems.map((item, index) => (
            <Tooltip key={index} delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 hover:bg-sidebar-accent my-1",
                    item.highlight ? "bg-purple-700/20 hover:bg-purple-700/30" : "",
                    collapsed ? "justify-center px-2" : ""
                  )}
                  onClick={item.onClick}
                >
                  <item.icon size={collapsed ? 24 : 20} className={item.highlight ? "text-purple-400" : ""} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
