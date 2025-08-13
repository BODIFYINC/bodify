import { motion } from 'framer-motion';
import BodifyLogo from '@/components/BodifyLogo';

export default function FeaturesSection() {
  const features = [
    {
      icon: "🧠",
      title: "AI Personal Trainer",
      description: "Adaptive workouts that evolve with your progress and preferences."
    },
    {
      icon: "🍎",
      title: "Smart Nutrition",
      description: "Meal plans tailored to your goals, dietary restrictions, and tastes."
    },
    {
      icon: "📊",
      title: "Progress Analytics",
      description: "Real-time insights and data-driven recommendations for optimal results."
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
              <div className="h-full p-8 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
                {/* Animated background glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                {/* Floating particles on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
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
