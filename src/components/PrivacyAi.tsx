
import React, { useState } from "react";
import { Shield, AlertTriangle, MapPin, User, Image, FileText, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface UnknownContact {
  id: string;
  phoneNumber: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  hasImage: boolean;
}

const PrivacyAi: React.FC = () => {
  const [unknownContacts, setUnknownContacts] = useState<UnknownContact[]>([
    {
      id: "1",
      phoneNumber: "+1 (555) 123-4567",
      ipAddress: "192.168.1.105",
      location: "New York, United States",
      timestamp: new Date().toLocaleString(),
      hasImage: true
    }
  ]);
  const { toast } = useToast();

  const handleDownloadInfo = (contact: UnknownContact) => {
    // In a real app, this would generate and download the file
    toast({
      title: "Information Downloaded",
      description: `Data for ${contact.phoneNumber} has been saved to your device.`,
    });
  };

  const handleBlockContact = (contact: UnknownContact) => {
    setUnknownContacts(unknownContacts.filter(c => c.id !== contact.id));
    toast({
      title: "Contact Blocked",
      description: `${contact.phoneNumber} has been blocked.`,
      variant: "destructive",
    });
  };

  const handleAllowContact = (contact: UnknownContact) => {
    setUnknownContacts(unknownContacts.filter(c => c.id !== contact.id));
    toast({
      title: "Contact Allowed",
      description: `${contact.phoneNumber} has been added to your contacts.`,
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-purple-500" />
        <h1 className="text-2xl font-bold">Privacy.ai Protection</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="vibrant-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Protection Status
            </CardTitle>
            <CardDescription>Your privacy protection is active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Unknown Contact Detection</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>IP Tracking Prevention</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Location Masking</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Configure Settings</Button>
          </CardFooter>
        </Card>
        
        {unknownContacts.map(contact => (
          <Card key={contact.id} className="glass-morphism border-red-400/20">
            <CardHeader className="bg-red-500/10 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Unknown Contact Detected
              </CardTitle>
              <CardDescription className="text-red-300">
                {contact.timestamp}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.hasImage ? "Profile image detected" : "No profile image"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Button variant="link" className="p-0 h-auto" onClick={() => handleDownloadInfo(contact)}>
                    Download detailed info
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 bg-red-500/10 hover:bg-red-500/20 border-red-500/20"
                onClick={() => handleBlockContact(contact)}
              >
                Block
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-green-500/10 hover:bg-green-500/20 border-green-500/20"
                onClick={() => handleAllowContact(contact)}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Allow
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrivacyAi;
