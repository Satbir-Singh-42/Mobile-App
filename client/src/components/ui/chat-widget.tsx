import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircleIcon, 
  SendIcon, 
  XIcon, 
  BotIcon,
  UserIcon,
  MinimizeIcon
} from "lucide-react";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  userContext?: any;
}

export const ChatWidget = ({ userContext }: ChatWidgetProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      message: "Hi! I'm your Face2Finance AI assistant. I can help you with budgeting, saving, investing, and financial security questions. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWidgetRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle outside click to close widget
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && chatWidgetRef.current && !chatWidgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: inputMessage,
          userContext
        }),
      });

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: data.response || "I apologize, but I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: "I'm experiencing technical difficulties. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#4157ff] to-[#6366f1] text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center"
        >
          <MessageCircleIcon className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      
      {/* Chat Widget */}
      <div ref={chatWidgetRef} className="fixed bottom-24 right-4 z-50">
        <Card className={`w-80 shadow-2xl border-0 transition-all duration-200 rounded-2xl overflow-hidden ${
          isMinimized ? 'h-14' : 'h-96'
        }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4157ff] to-[#6366f1] text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BotIcon className="h-5 w-5" />
            <span className="font-semibold text-sm">Face2Finance AI</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 h-6 w-6 text-white hover:bg-white/20"
            >
              <MinimizeIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-1 h-6 w-6 text-white hover:bg-white/20"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!msg.isUser && (
                    <div className="w-6 h-6 bg-[#4157ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <BotIcon className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-2 rounded-lg text-sm ${
                      msg.isUser
                        ? 'bg-[#4157ff] text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.message}
                  </div>
                  {msg.isUser && (
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <UserIcon className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 bg-[#4157ff] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BotIcon className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-gray-100 p-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about finances..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4157ff] text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-[#4157ff] text-white px-3 py-2 rounded-lg hover:bg-[#3346cc] disabled:opacity-50"
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      </div>
    </>
  );
};