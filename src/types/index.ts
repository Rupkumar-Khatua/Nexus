
import { LucideIcon } from "lucide-react";

export interface Platform {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  url: string;
  description: string;
  type: "chat" | "video" | "mixed";
  directUrl?: boolean;
}
