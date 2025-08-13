import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
      setIsVisible(true);
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

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (1 - clickY / rect.height) * 100));
    
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (percentage / 100) * totalHeight;
    
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (1 - clickY / rect.height) * 100));
    
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (percentage / 100) * totalHeight;
    
    window.scrollTo({ top: scrollTo });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

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
        className="w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
      >
        <ChevronUp className="h-5 w-5 text-primary" />
      </Button>

      {/* Progress Bar - Draggable */}
      <div 
        ref={progressRef}
        className="relative w-3 h-40 bg-muted/40 border border-primary/20 rounded-full overflow-hidden backdrop-blur-sm cursor-pointer hover:w-4 transition-all duration-300 shadow-lg shadow-primary/10"
        onMouseDown={handleMouseDown}
        onClick={handleProgressClick}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-secondary rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: isDragging ? 0 : 0.2, ease: "easeOut" }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/60 to-secondary/60 rounded-full blur-sm"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: isDragging ? 0 : 0.2, ease: "easeOut" }}
        />
        {/* Draggable thumb */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-white/20 shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform duration-200"
          style={{ 
            bottom: `calc(${scrollProgress}% - 10px)`,
            opacity: isDragging ? 1 : 0.8
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>

      {/* Progress Percentage */}
      <motion.div
        className="text-xs font-bold text-primary bg-background/90 backdrop-blur-sm px-3 py-2 rounded-full border border-primary/30 shadow-lg shadow-primary/10"
        animate={{ scale: scrollProgress > 0 ? 1 : 0.9 }}
      >
        {Math.round(scrollProgress)}%
      </motion.div>

      {/* Scroll Down Button */}
      <Button
        onClick={scrollToBottom}
        size="sm"
        variant="outline"
        className="w-12 h-12 rounded-full bg-primary/10 backdrop-blur-sm border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
      >
        <ChevronDown className="h-5 w-5 text-primary" />
      </Button>
    </motion.div>
  );
};

export default ScrollIndicator;