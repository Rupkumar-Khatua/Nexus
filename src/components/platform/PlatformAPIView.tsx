
import React, { useState } from "react";
import { Platform } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface PlatformAPIViewProps {
  platform: Platform;
}

const PlatformAPIView: React.FC<PlatformAPIViewProps> = ({ platform }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [messages, setMessages] = useState<{id: number, sender: string, content: string, timestamp: string}[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleAuthenticate = () => {
    // In a real implementation, this would validate with the platform's API
    if (apiKey.trim() || phone.trim()) {
      setIsAuthenticated(true);
      toast({
        title: "Authentication Successful",
        description: `Connected to ${platform.name} API`
      });
      
      // Simulate loading messages
      setMessages([
        {
          id: 1,
          sender: "Contact 1",
          content: "Hello! How are you?",
          timestamp: new Date().toLocaleTimeString()
        },
        {
          id: 2,
          sender: "Contact 2",
          content: "Did you see the latest update?",
          timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
        },
        {
          id: 3,
          sender: "Contact 3",
          content: "Meeting tomorrow at 10 AM",
          timestamp: new Date(Date.now() - 7200000).toLocaleTimeString()
        }
      ]);
    } else {
      toast({
        title: "Authentication Failed",
        description: "Please provide valid credentials",
        variant: "destructive"
      });
    }
  };

  const handleVerify = () => {
    if (verificationCode.trim()) {
      setIsAuthenticated(true);
      toast({
        title: "Verification Successful",
        description: `Connected to ${platform.name} API`
      });
    } else {
      toast({
        title: "Verification Failed",
        description: "Please provide a valid verification code",
        variant: "destructive"
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
      setMessages([...messages, {
        id: newId,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setNewMessage("");
      toast({
        title: "Message Sent",
        description: `Your message was sent via ${platform.name}`
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">{platform.name} Integration</h2>
          
          <Tabs defaultValue="api" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="api">API Key</TabsTrigger>
              <TabsTrigger value="phone">Phone Number</TabsTrigger>
            </TabsList>
            
            <TabsContent value="api" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">API Key</label>
                <Input 
                  id="apiKey" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key" 
                />
              </div>
              <Button onClick={handleAuthenticate} className="w-full">Connect</Button>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <Input 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number" 
                />
              </div>
              {phone && (
                <div className="space-y-2">
                  <label htmlFor="code" className="text-sm font-medium">Verification Code</label>
                  <Input 
                    id="code" 
                    value={verificationCode} 
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter verification code" 
                  />
                </div>
              )}
              <Button 
                onClick={phone && !verificationCode ? () => {
                  toast({
                    title: "Verification Code Sent",
                    description: `Check your phone for the code`
                  });
                } : handleVerify} 
                className="w-full"
              >
                {phone && !verificationCode ? "Send Verification Code" : "Verify"}
              </Button>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>By connecting, you agree to our Terms of Service and Privacy Policy.</p>
            <p className="mt-2">Your credentials are securely stored and will only be used to connect to {platform.name}.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4 bg-muted/20 rounded-lg p-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-4 p-3 rounded-lg max-w-[80%] ${
              message.sender === "You" 
                ? "ml-auto bg-primary text-primary-foreground" 
                : "bg-muted"
            }`}
          >
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{message.sender}</span>
              <span>{message.timestamp}</span>
            </div>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Type a message for ${platform.name}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default PlatformAPIView;
