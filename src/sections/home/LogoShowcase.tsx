import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BodifyLogo from '@/components/BodifyLogo';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [0, 10, 0],
            rotate: [0, 360, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/4 w-16 h-16 opacity-10"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            x: [0, -10, 0],
            rotate: [0, -180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 right-1/4 w-12 h-12 opacity-15"
        >
          <div className="w-full h-full bg-gradient-to-r from-secondary to-primary transform rotate-45" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            x: [10, -10, 10],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-20 w-8 h-8 opacity-20"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-secondary" />
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
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto"
          >
            Revolutionary AI-powered fitness coaching that adapts to your unique body, goals, and lifestyle. 
            Experience personalized workouts, nutrition plans, and real-time guidance that evolves with you.
          </motion.p>
          
          {/* Enhanced Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative mb-12"
          >
            <motion.div
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                backgroundPosition: { duration: 4, repeat: Infinity },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] relative"
              style={{
                textShadow: "0 0 30px hsl(var(--primary) / 0.4)"
              }}
            >
              BODIFY YOUR BODY
              
              {/* Floating particles around text */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-4 -right-4 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
              <motion.div
                animate={{ 
                  y: [10, -10, 10],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-secondary to-primary rounded-full"
              />
            </motion.div>
            
            {/* Enhanced glowing underline with pulse */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"
            >
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-full bg-gradient-to-r from-primary to-secondary rounded-full blur-sm"
              />
              
              {/* Additional glow layers */}
              <motion.div
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scaleY: [1, 2, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-md"
              />
            </motion.div>
          </motion.div>

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