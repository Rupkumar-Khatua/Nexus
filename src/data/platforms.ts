
import { 
  MessageCircle, MessageSquare, Phone,
  Mail, MessageSquareDashed, 
  Video, Video as VideoIcon,
  Instagram, Facebook, Linkedin,
  Github, Twitter, Slack
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
    id: "slack",
    name: "Slack",
    icon: Slack,
    color: "messaging-purple",
    description: "Connect to Slack Web",
    type: "chat",
    directUrl: true
  },
  {
    id: "facebook",
    name: "Facebook Messenger",
    icon: Facebook,
    color: "messaging-blue",
    description: "Connect to Facebook Messenger",
    type: "chat",
    directUrl: true
  },
  {
    id: "instagram",
    name: "Instagram DM",
    icon: Instagram,
    color: "messaging-purple",
    description: "Access Instagram Direct Messages",
    type: "chat",
    directUrl: true
  },
  {
    id: "twitter",
    name: "Twitter DM",
    icon: Twitter,
    color: "messaging-blue",
    description: "Access Twitter Direct Messages",
    type: "chat",
    directUrl: true
  },
  {
    id: "linkedin",
    name: "LinkedIn Messages",
    icon: Linkedin,
    color: "messaging-blue",
    description: "Access LinkedIn Messages",
    type: "chat",
    directUrl: true
  },
  {
    id: "github",
    name: "GitHub Discussions",
    icon: Github,
    color: "messaging-purple",
    description: "Access GitHub Discussions",
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
  "slack": "https://slack.com/signin",
  "facebook": "https://www.messenger.com/",
  "instagram": "https://www.instagram.com/direct/inbox/",
  "twitter": "https://twitter.com/messages",
  "linkedin": "https://www.linkedin.com/messaging/",
  "github": "https://github.com/notifications",
};
