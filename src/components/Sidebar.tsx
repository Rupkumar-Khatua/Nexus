
import React from "react";
import { cn } from "@/lib/utils";
import { 
  MessageCircle, Video, 
  Settings, ChevronLeft, 
  ChevronRight, Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Platform } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface SidebarProps {
  platforms: Platform[];
  activePlatform: Platform | null;
  setActivePlatform: (platform: Platform | null) => void;
  onAddPlatform: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  platforms,
  activePlatform,
  setActivePlatform,
  onAddPlatform
}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { toast } = useToast();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
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

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold">CrossMessage</h1>
        )}
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
            {!collapsed && <h2 className="text-sm font-semibold mb-2">Platforms</h2>}
          </div>

          <div className="space-y-1">
            {platforms.map((platform) => (
              <Tooltip key={platform.id} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePlatform?.id === platform.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2 hover:bg-sidebar-accent",
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

      <div className="mt-auto border-t border-sidebar-border p-2">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 hover:bg-sidebar-accent",
                  collapsed ? "justify-center px-2" : ""
                )}
              >
                <Settings size={collapsed ? 24 : 20} />
                {!collapsed && <span>Settings</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
