import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Loader2, Bot, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am the Arori.AI assistant. How can I help you automate your business today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `You are the AI assistant for Arori.AI, a futuristic AI automation agency founded by Given Arori Arori on Dec 1, 2025.
      
      Mission: Bridge the gap between AI capability and business utility.
      Goal: 10,000 enterprise partners by 2030.
      
      Services:
      1. Custom AI Agent Engineering (bespoke infrastructure, autonomous workforces).
      2. Managed Automation Pipelines (end-to-end systems, lead gen).
      3. Performance Analytics (real-time dashboards).
      
      Process: Discovery -> Development -> Deployment.
      
      Contact: arori.ai@gmail.com, +254 792 767 922.
      
      Answer questions about Arori.AI clearly, professionally, and with a slight futuristic tone. Keep answers concise. If you don't know something, ask them to contact the team.`;

      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: { systemInstruction },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      if (responseText) {
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      }
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the network. Please try again or email us directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 ${isOpen ? 'hidden' : 'flex'} items-center justify-center`}
        aria-label="Open AI Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[350px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-slate-900/95 border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
          <div className="p-4 bg-slate-800/80 border-b border-cyan-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Arori AI Agent</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-cyan-600/20 text-white border border-cyan-500/20 rounded-tr-none' 
                      : 'bg-slate-800 text-gray-200 border border-gray-700/50 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-gray-700/50 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span className="text-xs text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-slate-800/50 border-t border-cyan-500/20">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-gray-600"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2">
               <span className="text-[10px] text-gray-600 flex items-center justify-center gap-1">
                 Powered by Gemini 3.0 Pro <Sparkles className="w-3 h-3" />
               </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;