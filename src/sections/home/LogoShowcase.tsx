import { motion } from 'framer-motion';
import BodifyLogo from '@/components/BodifyLogo';

export default function LogoShowcase() {
  return (
    <section aria-label="Bodify Brand Showcase" className="relative py-24 bg-gradient-to-br from-background via-background/95 to-background overflow-hidden">
      {/* Neural network background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600">
          {/* Animated neural network connections */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={i}
              cx={100 + (i % 4) * 200}
              cy={100 + Math.floor(i / 4) * 150}
              r="2"
              fill="hsl(var(--primary))"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
          {/* Connection lines */}
          <motion.path
            d="M100,100 L300,100 L500,250 L700,100"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
            animate={{
              pathLength: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          {/* Icon showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-block p-8 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/30 shadow-xl"
            >
              <BodifyLogo variant="icon" className="h-16 w-auto" />
            </motion.div>
            <p className="mt-4 text-sm text-muted-foreground">Neural Network Icon</p>
          </motion.div>

          {/* Main logo with creative effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Rotating energy ring */}
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, hsl(var(--primary)) 0%, transparent 30%, hsl(var(--accent)) 60%, transparent 90%, hsl(var(--primary)) 100%)',
                  filter: 'blur(8px)',
                  opacity: 0.6
                }}
              />
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative bg-background/60 backdrop-blur-xl rounded-2xl p-8 border border-border/50 shadow-2xl"
              >
                <BodifyLogo className="h-20 w-auto" />
              </motion.div>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
            >
              AI-Powered Fitness Evolution
            </motion.p>
          </motion.div>

          {/* Wordmark showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="inline-block p-8 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/30 shadow-xl"
            >
              <BodifyLogo variant="wordmark" className="h-12 w-auto" />
            </motion.div>
            <p className="mt-4 text-sm text-muted-foreground">Wordmark Typography</p>
          </motion.div>
        </div>

        {/* Interactive feature demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 p-6 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <BodifyLogo variant="icon" className="h-8 w-auto" />
            </motion.div>
            <div className="text-left">
              <p className="font-semibold">Neural Fitness Processing</p>
              <p className="text-sm text-muted-foreground">Your data → AI analysis → Optimized results</p>
            </div>
          </div>
        </motion.div>

        {/* Logo variations grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { bg: 'bg-background', label: 'Light' },
            { bg: 'bg-foreground', label: 'Dark' },
            { bg: 'bg-primary/20', label: 'Tinted' },
            { bg: 'bg-gradient-to-br from-primary/30 to-accent/30', label: 'Gradient' }
          ].map((variant, i) => (
            <motion.div
              key={variant.label}
              whileHover={{ y: -4 }}
              className={`${variant.bg} p-4 rounded-xl border border-border/30 text-center`}
            >
              <BodifyLogo className="h-8 w-auto mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">{variant.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}