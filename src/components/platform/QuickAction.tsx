
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const QuickAction: React.FC = () => {
  return (
    <div className="absolute bottom-8 right-8">
      <Button 
        className="rounded-full h-14 w-14 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-0"
        size="icon"
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  );
};

export default QuickAction;
