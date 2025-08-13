import { motion } from 'framer-motion';
import BodifyLogo from '@/components/BodifyLogo';

export default function LogoShowcase() {
  return (
    <section aria-label="Bodify Brand Showcase" className="relative py-32 bg-gradient-to-br from-background via-background/95 to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, hsl(var(--accent) / 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 60%, hsl(var(--primary) / 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-1/4 w-32 h-32 rounded-full border border-primary/20 backdrop-blur-sm"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-1/4 w-24 h-24 rounded-lg border border-accent/30 backdrop-blur-sm"
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center">
          {/* Logo presentation with creative effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block"
          >
            {/* Glow effect behind logo */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-accent/40 to-primary/30 blur-2xl rounded-3xl"
            />
            
            {/* Main logo with hover effects */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                filter: "brightness(1.1) saturate(1.2)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl"
            >
              <BodifyLogo className="h-20 md:h-28 w-auto" />
              
              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${10 + (i % 2) * 70}%`
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Animated tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-shift">
              AI-Powered Fitness Revolution
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Your personal trainer, nutritionist, and progress tracker — all powered by cutting-edge artificial intelligence.
            </p>
          </motion.div>

          {/* Interactive feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: '🧠', text: 'AI Coach' },
              { icon: '🍎', text: 'Smart Nutrition' },
              { icon: '📊', text: 'Progress Tracking' },
              { icon: '⚡', text: 'Real-time Insights' }
            ].map((feature, i) => (
              <motion.div
                key={feature.text}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full hover:bg-card/80 transition-colors cursor-pointer"
              >
                <span className="text-lg">{feature.icon}</span>
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}