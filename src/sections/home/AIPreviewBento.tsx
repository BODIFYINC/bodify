import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Utensils, Dumbbell, LineChart } from 'lucide-react';

export default function AIPreviewBento() {
  const items = [
    {
      Icon: Utensils,
      title: 'Your AI Nutritionist',
      desc: 'Macro-smart meal planning that respects allergies and dislikes.',
    },
    {
      Icon: Dumbbell,
      title: 'Your AI Trainer',
      desc: 'Adaptive workouts that fit your gear, time, and recovery.',
    },
    {
      Icon: LineChart,
      title: 'Your AI Progress Tracker',
      desc: 'Clear daily targets and micro-feedback that compound results.',
    },
  ];

  return (
    <section aria-label="AI Personalization Preview" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-bodify-gradient-animated animate-gradient-shift">AI-Powered Personalization</h2>
          <p className="text-white/80 mt-4 text-lg">Built around your goals, biology, schedule, and preferences.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-3xl p-8 border border-border bg-gradient-to-br from-bodify-darker via-bodify-dark to-bodify-darker shadow-xl glassmorphism-bento hover:scale-105 transition-transform duration-300">
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center mb-6 bg-bodify-gradient shadow-premium animate-icon-pop">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 kinetic-typography">{title}</h3>
                <p className="text-white/80 leading-relaxed">{desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
