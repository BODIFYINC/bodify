import { motion } from 'framer-motion';
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
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="glassmorphism rounded-2xl p-8 text-center h-full">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Number */}
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                  {stat.number}
                </div>
                
                {/* Label */}
                <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm">{stat.description}</p>

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