import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BodifyLogo from '@/components/BodifyLogo';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating fitness icons */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [0, 10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/4 text-4xl opacity-20"
        >
          💪
        </motion.div>
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            x: [0, -10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-1/4 text-4xl opacity-20"
        >
          🏃‍♂️
        </motion.div>
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            x: [10, -10, 10]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-20 text-4xl opacity-20"
        >
          🎯
        </motion.div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center">
          {/* Logo with subtle animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <BodifyLogo className="h-16 w-auto mx-auto" />
          </motion.div>

          {/* Hero headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Transform Your Body with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              AI Precision
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Your personal AI fitness coach that adapts to your goals, tracks your progress, and provides personalized nutrition guidance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to="/get-started">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: "10K+", label: "Users Transformed" },
              { number: "95%", label: "Goal Achievement Rate" },
              { number: "24/7", label: "AI Coach Available" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50"
              >
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}