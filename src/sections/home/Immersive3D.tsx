import { motion } from 'framer-motion';
import bodifyLogo from '@/assets/bodify-logo-primary.webp';

export default function Immersive3D() {
  return (
    <section aria-label="Bodify Identity" className="relative py-24 bg-gradient-to-b from-bodify-darker via-bodify-dark to-bodify-darker">
      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-10 items-center">
        {/* Copy focused on Bodify, not UI jargon */}
        <div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Bodify. AI fitness that adapts to you.</h2>
          <p className="text-white/80 text-lg mb-6">
            Your personalized workouts, smart nutrition, and real-time coaching—built around your goals, schedule, and preferences.
          </p>
          <ul className="space-y-2 text-white/80">
            <li className="flex items-center"><span className="h-5 w-5 rounded-full bg-bodify-gradient mr-3" />Adaptive training plans that evolve with your progress</li>
            <li className="flex items-center"><span className="h-5 w-5 rounded-full bg-bodify-gradient mr-3" />Meal guidance filtered by your dislikes and targets</li>
            <li className="flex items-center"><span className="h-5 w-5 rounded-full bg-bodify-gradient mr-3" />Clear, actionable insights—no fluff</li>
          </ul>
        </div>

        {/* Animated Bodify logo showcase (replaces random 3D) */}
        <div className="relative rounded-2xl overflow-hidden glassmorphism border-0 p-10 flex items-center justify-center">
          {/* Ambient glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0.2, scale: 0.95 }}
            animate={{ opacity: [0.2, 0.35, 0.2], scale: [0.95, 1.02, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-72 w-72 md:h-96 md:w-96 rounded-full bg-bodify-gradient blur-3xl"
          />

          {/* Rotating gradient ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            className="absolute h-80 w-80 md:h-[28rem] md:w-[28rem] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 30%, hsl(var(--accent)) 60%, transparent 90%, hsl(var(--primary)) 100%)',
              maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 5px))',
              WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 6px), black calc(100% - 5px))',
              opacity: 0.35,
            }}
          />

          {/* Logo image showcase */}
          <motion.figure
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <motion.img
              src={bodifyLogo}
              alt="Bodify AI fitness brand logo"
              className="h-16 md:h-20 w-auto"
              loading="eager"
              decoding="async"
              whileHover={{ scale: 1.03 }}
            />
            <figcaption className="mt-3 text-white/70">Your body, your plan — powered by AI</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
