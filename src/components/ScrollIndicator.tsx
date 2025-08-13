import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / totalHeight) * 100, 100);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPosition = (percentage: number) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = (percentage / 100) * totalHeight;
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  };

  const scrollToTop = () => scrollToPosition(0);
  const scrollToBottom = () => scrollToPosition(100);

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (1 - clickY / rect.height) * 100));
    scrollToPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleProgressClick(e);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !progressRef.current) return;
      const rect = progressRef.current.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const percentage = Math.max(0, Math.min(100, (1 - clickY / rect.height) * 100));
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: (percentage / 100) * totalHeight });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-3"
    >
      <Button
        onClick={scrollToTop}
        size="sm"
        variant="outline"
        className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-md border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110"
      >
        <ChevronUp className="h-4 w-4 text-primary" />
      </Button>

      <div 
        ref={progressRef}
        className="relative w-3 h-48 bg-background/20 backdrop-blur-md border border-primary/30 rounded-full overflow-hidden cursor-pointer hover:w-4 hover:border-primary/50 transition-all duration-300 shadow-lg shadow-primary/20"
        onMouseDown={handleMouseDown}
        onClick={handleProgressClick}
      >
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-secondary to-accent rounded-full shadow-inner"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: isDragging ? 0 : 0.2, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary/40 via-secondary/40 to-accent/40 rounded-full blur-sm"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: isDragging ? 0 : 0.2, ease: "easeOut" }}
        />
        
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background/50 shadow-xl cursor-grab active:cursor-grabbing"
          style={{ 
            bottom: `calc(${scrollProgress}% - 12px)`,
            boxShadow: `0 0 20px rgba(52, 152, 219, ${isDragging ? 0.8 : 0.4})`
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            scale: isDragging ? 1.1 : 1,
            boxShadow: isDragging ? "0 0 30px rgba(52, 152, 219, 0.8)" : "0 0 15px rgba(52, 152, 219, 0.4)"
          }}
        />
      </div>

      <motion.div
        className="text-xs font-bold text-primary bg-background/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30 shadow-lg shadow-primary/10"
        animate={{ scale: scrollProgress > 0 ? 1 : 0.9 }}
      >
        {Math.round(scrollProgress)}%
      </motion.div>

      <Button
        onClick={scrollToBottom}
        size="sm"
        variant="outline"
        className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-md border-primary/30 hover:bg-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-110"
      >
        <ChevronDown className="h-4 w-4 text-primary" />
      </Button>
    </motion.div>
  );
};

export default ScrollIndicator;