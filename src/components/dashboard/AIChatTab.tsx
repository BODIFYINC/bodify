import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, MessageCircle, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const AIChatTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI fitness coach. I'm here to help you with workout routines, nutrition advice, and motivation. What would you like to know?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response - in production, this would integrate with Gemini API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const responses = [
        "Great question! For muscle building, aim for 0.8-1g of protein per pound of body weight. Focus on compound exercises like squats, deadlifts, and bench press.",
        "For weight loss, create a moderate calorie deficit of 300-500 calories. Combine cardio with strength training for best results.",
        "Recovery is crucial! Aim for 7-9 hours of sleep and take rest days between intense workouts. Stay hydrated and eat enough protein.",
        "Progressive overload is key - gradually increase weight, reps, or sets over time. Track your workouts to ensure consistent progress.",
        "For nutrition timing, eat protein within 2 hours post-workout. Pre-workout, have some carbs for energy 30-60 minutes before training."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      toast({
        title: "AI Coach responded! 🤖",
        description: "Got your personalized fitness advice."
      });

    } catch (error) {
      toast({
        title: "Connection error",
        description: "Please try again in a moment."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's the best workout routine for beginners?",
    "How much protein should I eat daily?",
    "Best exercises for weight loss?",
    "How to build muscle effectively?",
    "Recovery tips for better results?"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center animate-pulse-glow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              AI Fitness Coach
            </h2>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by AI
            </Badge>
          </div>
        </div>
        <p className="text-white/70">Get personalized fitness and nutrition advice</p>
      </motion.div>

      {/* Chat Container */}
      <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
        {/* Messages Area */}
        <Card className="glassmorphism-card flex-1 flex flex-col border border-white/10">
          <CardContent className="flex-1 flex flex-col p-6">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className={`flex items-start space-x-3 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-emerald-500 to-green-500'
                      }>
                        {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-auto'
                          : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                      } animate-fade-in`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-white/50 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-green-500">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                      <span className="text-sm text-white/70">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about workouts, nutrition, or motivation..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald-500 rounded-xl"
                disabled={isLoading}
              />
              <AnimatedButton
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-6 rounded-xl"
                glowEffect={true}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </AnimatedButton>
            </div>
          </CardContent>
        </Card>

        {/* Quick Questions Sidebar */}
        <div className="lg:w-80 space-y-4">
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-white">Quick Questions</h3>
              </div>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setInputMessage(question)}
                    className="w-full text-left p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 text-sm text-white/80 hover:text-white hover-scale"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4">AI Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Personalized Advice</p>
                    <p className="text-xs text-white/70">Tailored to your goals</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <Bot className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-white">24/7 Available</p>
                    <p className="text-xs text-white/70">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
                  <MessageCircle className="w-5 h-5 text-teal-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Expert Knowledge</p>
                    <p className="text-xs text-white/70">Science-backed advice</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};