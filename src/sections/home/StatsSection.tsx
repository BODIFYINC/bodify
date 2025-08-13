import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TrendingUp, Users, Trophy, Zap } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Active Users",
      description: "Transforming their lives daily"
    },
    {
      icon: Trophy,
      number: "95%",
      label: "Success Rate",
      description: "Achieve their fitness goals"
    },
    {
      icon: TrendingUp,
      number: "89%",
      label: "Retention Rate",
      description: "Stay committed long-term"
    },
    {
      icon: Zap,
      number: "24/7",
      label: "AI Coach",
      description: "Always available guidance"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands who have already transformed their bodies and lives with our AI-powered fitness platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative group"
            >
              <div className="glassmorphism rounded-2xl p-8 text-center h-full relative overflow-hidden">
                {/* Animated background gradient */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                />
                
                {/* Icon with enhanced animation */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2, type: "spring", bounce: 0.4 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10"
                >
                  <stat.icon className="w-8 h-8 text-primary" />
                  
                  {/* Animated ring around icon */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
                
                {/* Number with enhanced animation */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2, type: "spring", bounce: 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 relative z-10"
                >
                  <span className="relative z-10">
                    <CountUp 
                      end={parseInt(stat.number.replace(/[^\d]/g, ''))} 
                      duration={2.5}
                      delay={index * 0.3}
                    />
                    {stat.number.replace(/[\d]/g, '')}
                  </span>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-lg -z-10"
                  />
                  
                  {/* Counter animation effect */}
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur-md opacity-0"
                  />
                </motion.div>
                
                {/* Label */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                  className="text-xl font-semibold mb-2 relative z-10"
                >
                  {stat.label}
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                  className="text-muted-foreground text-sm relative z-10"
                >
                  {stat.description}
                </motion.p>

                {/* Floating particles */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.8
                  }}
                  className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.6 + 1
                  }}
                  className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-r from-secondary to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}