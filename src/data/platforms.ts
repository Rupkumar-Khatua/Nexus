
import { 
  MessageCircle, MessageSquare, Phone,
  Mail, MessageSquareDashed, 
  Video, Video as VideoIcon
} from "lucide-react";
import { Platform } from "@/types";

export const platforms: Omit<Platform, "url">[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: Phone,
    color: "messaging-green",
    description: "Connect to WhatsApp Web",
    type: "chat",
    directUrl: true
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Mail,
    color: "messaging-blue",
    description: "Access Telegram Web",
    type: "chat",
    directUrl: true
  },
  {
    id: "discord",
    name: "Discord",
    icon: MessageSquareDashed,
    color: "messaging-purple",
    description: "Connect to Discord Web",
    type: "chat",
    directUrl: true
  },
  {
    id: "zoom",
    name: "Zoom",
    icon: VideoIcon,
    color: "messaging-blue",
    description: "Join or host Zoom meetings",
    type: "video",
    directUrl: false
  },
  {
    id: "google-meet",
    name: "Google Meet",
    icon: Video,
    color: "messaging-red",
    description: "Join Google Meet calls",
    type: "video",
    directUrl: false
  },
  {
    id: "custom",
    name: "Custom Platform",
    icon: MessageSquare,
    color: "messaging-yellow",
    description: "Add any other messaging platform",
    type: "mixed",
    directUrl: false
  },
];

export const platformUrls: Record<string, string> = {
  "whatsapp": "https://web.whatsapp.com/",
  "telegram": "https://web.telegram.org/",
  "discord": "https://discord.com/app",
};
