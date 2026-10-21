import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Loader2, Bot, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Hello! I am the assistant for TRIPPLE AI SYSTEMS. How can we help automate your business workflows or routine tasks today?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      
      if (!apiKey) {
        // High quality intelligent mock response for agency when key is not configured
        setTimeout(() => {
          let responseText = "TRIPPLE AI SYSTEMS builds custom AI digital assistants, hands-free business workflows, and live dashboards that take repetitive work off your plate. Founded by Given Arori, we help businesses save time and reduce errors. Would you like to chat with Given directly on WhatsApp at 0792767922?";
          const lower = userMessage.toLowerCase();
          if (lower.includes('service') || lower.includes('what do you do') || lower.includes('offer')) {
            responseText = "Our core services include: 1) Smart AI Digital Assistants (24/7 customer replies and task handling), 2) Hands-Free Business Workflows (connecting WhatsApp, email, and spreadsheets), 3) Live Business Dashboards (see hours saved and revenue), and 4) Document & Invoice Readers (reading receipts and PDFs in seconds).";
          } else if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
            responseText = "We offer simple, transparent pricing with clear milestones. No surprise hourly fees or hidden costs. Inquire directly on WhatsApp at 0792767922 to get a fast quote!";
          } else if (lower.includes('contact') || lower.includes('email') || lower.includes('call') || lower.includes('phone') || lower.includes('whatsapp')) {
            responseText = "You can reach Given Arori directly on WhatsApp at 0792767922 (+254 792 767 922) or via email at givenarori77@gmail.com.";
          }
          setMessages(prev => [...prev, { role: 'model', text: responseText }]);
          setIsLoading(false);
        }, 500);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the friendly, helpful AI concierge for TRIPPLE AI SYSTEMS, founded by Given Arori.
      
      Core Mission: Make AI simple, practical, and profitable for business owners by eliminating repetitive computer work.
      Key Services:
      1. Smart AI Digital Assistants (24/7 client response, handling bookings and FAQs on WhatsApp/web).
      2. Hands-Free Business Workflows (connecting WhatsApp, email, spreadsheets, and accounting without copy-pasting).
      3. Live Business Dashboards (simple visual trackers showing saved hours and key numbers).
      4. Document & Invoice Readers (reading PDFs, receipts, and order forms in seconds).
      
      Founder: Given Arori.
      Contact: givenarori77@gmail.com | WhatsApp / Phone: 0792767922 (+254 792 767 922) | Nairobi, Kenya (Global Delivery).
      
      Tone: Friendly, clear, down-to-earth, helpful, and concise. Never use overly technical jargon. Always explain concepts in simple everyday language that any business owner can understand. Encourage reaching out via WhatsApp at 0792767922 for a friendly chat or quick quote.`;

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
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
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          text: "Our chat is temporarily unavailable. You can reach Given Arori directly on WhatsApp at 0792767922 or email givenarori77@gmail.com." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button with Glassmorphism */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[oklch(0.88_0.12_85)] via-[oklch(0.8_0.14_82)] to-[oklch(0.72_0.16_80)] text-black shadow-xl shadow-[oklch(0.8_0.14_82/30%)] hover:shadow-[oklch(0.8_0.14_82/50%)] transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'flex'
        } items-center justify-center border border-[oklch(0.95_0.02_85/40%)]`}
        aria-label="Open TRIPPLE AI Agent Concierge"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Floating Chat Window with Golden Glassmorphism */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[360px] max-w-[calc(100vw-36px)] h-[520px] max-h-[calc(100vh-100px)] glass-panel-elevated rounded-3xl border border-[oklch(0.8_0.12_82/35%)] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-4 bg-[oklch(0.14_0.015_70/90%)] border-b border-[oklch(0.8_0.12_82/20%)] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="glass-icon w-9 h-9 rounded-xl flex items-center justify-center text-gold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-champagne text-xs sm:text-sm">TRIPPLE AI Agent</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-gold font-mono uppercase tracking-wider">Online • Sovereign</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-warm-gray hover:text-champagne transition-colors p-1"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 font-body">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[oklch(0.8_0.14_82/18%)] text-champagne border border-[oklch(0.8_0.12_82/30%)] rounded-tr-none' 
                      : 'bg-[oklch(0.14_0.015_70/90%)] text-warm-gray border border-[oklch(0.8_0.12_82/15%)] rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[oklch(0.14_0.015_70/90%)] p-3 rounded-2xl rounded-tl-none border border-[oklch(0.8_0.12_82/15%)] flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-gold animate-spin" />
                  <span className="text-xs text-warm-gray">Synthesizing response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[oklch(0.14_0.015_70/90%)] border-t border-[oklch(0.8_0.12_82/20%)]">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about our AI agent architectures..."
                className="w-full bg-[oklch(0.12_0.012_70)] border border-[oklch(0.8_0.12_82/25%)] rounded-xl py-2.5 pl-3.5 pr-11 text-xs sm:text-sm text-champagne focus:outline-none focus:border-gold placeholder-[oklch(0.55_0.02_75)]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-gold text-black rounded-lg hover:bg-[oklch(0.86_0.16_84)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-center mt-2">
               <span className="text-[10px] text-[oklch(0.6_0.02_80)] flex items-center justify-center gap-1 font-mono">
                 Engineered by TRIPPLE AI <Sparkles className="w-2.5 h-2.5 text-gold" />
               </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;