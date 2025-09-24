import React, { useState } from "react";
import { Bot, X, Send, Minimize2 } from "lucide-react";

const ChatBotButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you can add chatbot logic
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-40 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Ansari Tools GPT</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-white/20 p-1 rounded-full transition-colors duration-200 cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {/* Bot Welcome Message */}
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-md shadow-sm max-w-xs">
                  <p className="text-sm text-gray-800">
                    Hello! I'm Ansari Tools GPT. How can I help you today? 
                    Ask me about our premium tools, pricing, or any questions you have!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ChatBot Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group cursor-pointer"
        aria-label="Open Ansari Tools GPT Chatbot"
      >
        {isChatOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <Bot className="w-7 h-7" />
        )}
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          AnsariTools GPT
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </button>
    </>
  );
};

export default ChatBotButton;
