import { motion } from 'framer-motion';

const steps = [
  { n: '01', t: 'Input your goals', d: 'Set targets, preferences, allergies, and schedule.' },
  { n: '02', t: 'AI generates your plan', d: 'Nutrition + training that adapt in real time.' },
  { n: '03', t: 'Track & refine', d: 'Micro-feedback improves your results daily.' },
];

export default function HowItWorksScroller() {
  return (
    <section aria-label="How Bodify Works" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">How Bodify Works</h2>
          <p className="text-white/70">An interactive walkthrough with kinetic type and scroll-snap.</p>
        </div>
        <div className="overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-6 min-w-max px-1 pb-2">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="snap-center shrink-0 w-[85vw] sm:w-[480px] md:w-[560px] lg:w-[640px]"
              >
                <div className="glassmorphism rounded-3xl p-8 border border-primary/10 h-full hover:border-primary/30 transition-all duration-500 group relative overflow-hidden">{/*hover:shadow-2xl hover:shadow-primary/10*/}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="text-6xl font-extrabold text-gradient mb-6 group-hover:scale-110 transition-transform duration-500">{s.n}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-gradient transition-all duration-500">{s.t}</h3>
                  <p className="text-white/80 text-lg leading-relaxed group-hover:text-white/90 transition-colors duration-300">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
