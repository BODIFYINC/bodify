import { motion } from 'framer-motion';
import BodifyLogo from '@/components/BodifyLogo';

export default function FeaturesSection() {
  const features = [
    {
      title: "AI Personal Trainer",
      description: "Adaptive workouts that evolve with your progress and preferences.",
      gradient: "from-primary/20 to-secondary/10"
    },
    {
      title: "Smart Nutrition",
      description: "Meal plans tailored to your goals, dietary restrictions, and tastes.",
      gradient: "from-secondary/20 to-primary/10"
    },
    {
      title: "Progress Analytics",
      description: "Real-time insights and data-driven recommendations for optimal results.",
      gradient: "from-primary/15 to-secondary/15"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <BodifyLogo variant="circle" className="h-12 w-12" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Powered by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Advanced AI
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of fitness with our intelligent platform that understands your body, goals, and lifestyle.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="h-full p-8 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                {/* Animated background glow */}
                <motion.div 
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  {/* Modern geometric icon */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="w-16 h-16 mb-6 relative"
                  >
                    <div className="w-full h-full rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-sm border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary" />
                    </div>
                    
                    {/* Animated corner accents */}
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary"
                    />
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 + 1 }}
                      className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary"
                    />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    viewport={{ once: true }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {feature.description}
                  </motion.p>
                </div>

                {/* Enhanced floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    x: [0, 4, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  className="absolute top-6 right-6 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  animate={{ 
                    y: [0, 6, 0],
                    x: [0, -3, 0],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3 + 1
                  }}
                  className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-gradient-to-r from-secondary to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/30 backdrop-blur-sm border border-border/50">
            <BodifyLogo variant="circle" className="h-8 w-8" />
            <span className="text-muted-foreground">Ready to transform? Let's get started.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
