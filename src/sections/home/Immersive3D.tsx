import { motion } from 'framer-motion';
import LogoShowcase from './LogoShowcase';

export default function Immersive3D() {
  return (
    <>
      <LogoShowcase />
      <section aria-label="Bodify Features" className="relative py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              AI fitness that adapts to you.
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Your personalized workouts, smart nutrition, and real-time coaching—built around your goals, schedule, and preferences.
            </p>
            <ul className="space-y-4">
              {[
                "Adaptive training plans that evolve with your progress",
                "Meal guidance filtered by your dislikes and targets", 
                "Clear, actionable insights—no fluff"
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                  <span className="text-foreground/80">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Interactive tech visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/20 backdrop-blur-xl p-8">
              {/* Animated grid background */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Floating data points */}
              <div className="relative z-10 space-y-6">
                {['Workout Analysis', 'Nutrition Tracking', 'Progress Insights'].map((label, i) => (
                  <motion.div
                    key={label}
                    animate={{ 
                      x: [0, 10, 0],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-border/30"
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <span className="text-sm font-medium">{label}</span>
                    <div className="ml-auto text-xs text-muted-foreground">AI Processing...</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
