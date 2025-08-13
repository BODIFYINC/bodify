import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
      setIsVisible(window.scrollY > 50);
    };

    // Initial call
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4"
    >
      {/* Scroll Up Button */}
      <Button
        onClick={scrollToTop}
        size="sm"
        variant="outline"
        className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
      >
        <ChevronUp className="h-5 w-5 text-primary" />
      </Button>

      {/* Progress Bar */}
      <div className="relative w-1 h-32 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-secondary rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/60 to-secondary/60 rounded-full blur-sm"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>

      {/* Progress Percentage */}
      <motion.div
        className="text-xs font-medium text-primary/80 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-primary/20"
        animate={{ scale: scrollProgress > 0 ? 1 : 0.8 }}
      >
        {Math.round(scrollProgress)}%
      </motion.div>

      {/* Scroll Down Button */}
      <Button
        onClick={scrollToBottom}
        size="sm"
        variant="outline"
        className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
      >
        <ChevronDown className="h-5 w-5 text-primary" />
      </Button>
    </motion.div>
  );
};

export default ScrollIndicator;