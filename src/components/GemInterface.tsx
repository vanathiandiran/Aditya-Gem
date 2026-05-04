import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, RefreshCcw, ArrowLeft, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gem } from "@/src/types";
import { generateStreamingGemResponse } from "@/src/lib/gemini";
import Markdown from "react-markdown";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GemInterfaceProps {
  gem: Gem;
  onBack: () => void;
}

export function GemInterface({ gem, onBack }: GemInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const assistantMessage: Message = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMessage]);

    try {
      await generateStreamingGemResponse(
        input,
        gem.prompt,
        (chunk) => {
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last.role === 'assistant') {
              return [...prev.slice(0, -1), { ...last, content: last.content + chunk }];
            }
            return prev;
          });
        }
      );
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please check your API key.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex flex-col h-full bg-[#F8FAFC]"
    >
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-20">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400">
               <Bot className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Active: {gem.title}</h3>
              <p className="text-slate-500 text-sm max-w-sm font-medium">
                Ask anything about university standards or administrative tasks.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center border shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 border-blue-700 text-white' 
                    : 'bg-white border-slate-200 text-blue-600'
                }`}>
                  {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`flex-1 min-w-0 space-y-2`}>
                   <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {m.role === 'user' ? 'You' : 'Gemini Assistant'}
                   </p>
                   <div className={`px-5 py-4 rounded-xl text-sm leading-relaxed shadow-sm border ${
                     m.role === 'user' 
                       ? 'bg-blue-50 border-blue-100 text-slate-800' 
                       : 'bg-white border-slate-200 text-slate-800 markdown-body'
                   }`}>
                     {m.role === 'assistant' ? (
                        <Markdown>{m.content}</Markdown>
                     ) : (
                       m.content
                     )}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="max-w-4xl mx-auto flex gap-4">
            <div className="w-9 shrink-0" />
            <div className="flex gap-3 items-center text-slate-400 text-xs font-semibold italic">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              Gemini is researching...
            </div>
          </div>
        )}
      </div>

      <footer className="px-8 py-6 bg-white border-t border-slate-200 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-4">
          <div className="flex-1 relative flex items-center">
             <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`How can I help with ${gem.title.toLowerCase()}?`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all placeholder:text-slate-400"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-4 text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            )}
          </div>
          <Button 
            disabled={!input.trim() || isLoading}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-[50px] rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 font-bold shadow-md shadow-blue-200"
          >
            <Send className="w-4 h-4" />
            Send
          </Button>
        </form>
        <div className="max-w-4xl mx-auto flex items-center justify-between mt-4">
           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            Enterprise AI Architecture
          </p>
           <button onClick={() => setMessages([])} className="text-[10px] text-slate-400 hover:text-rose-500 font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5">
            <Trash2 className="w-3 h-3" />
            Reset Thread
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
