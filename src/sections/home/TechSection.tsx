import { motion } from 'framer-motion';
import { Brain, Activity, Database, Shield, Smartphone, Cloud } from 'lucide-react';

export default function TechSection() {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI",
      description: "Machine learning algorithms that adapt to your unique fitness journey and preferences"
    },
    {
      icon: Activity,
      title: "Real-time Tracking",
      description: "Monitor your progress with precision using advanced biometric sensors and data analysis"
    },
    {
      icon: Database,
      title: "Smart Analytics",
      description: "Comprehensive data insights that help optimize your workouts and nutrition plans"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your health data is encrypted and secure, following industry best practices"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Seamless experience across all devices with offline capabilities"
    },
    {
      icon: Cloud,
      title: "Cloud Sync", 
      description: "Access your data anywhere, anytime with automatic cloud synchronization"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Cutting-Edge Tech
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of fitness with our advanced AI technology and smart features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="glassmorphism rounded-2xl p-8 h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border border-primary/10 hover:border-primary/30">{/*remove any white/light backgrounds*/}
                {/* Icon with enhanced animated background */}
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 relative overflow-hidden"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(52, 152, 219, 0.2)",
                        "0 0 30px rgba(52, 152, 219, 0.4)",
                        "0 0 20px rgba(52, 152, 219, 0.2)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <feature.icon className="w-8 h-8 text-primary relative z-10" />
                    
                    {/* Rotating background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                  
                  {/* Enhanced animated dots around icon */}
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-secondary" 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div 
                    className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary" 
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-2 left-2 w-1 h-1 rounded-full bg-accent"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated border on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { label: "AI Accuracy", value: "99.2%" },
            { label: "Response Time", value: "<100ms" },
            { label: "Uptime", value: "99.9%" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}