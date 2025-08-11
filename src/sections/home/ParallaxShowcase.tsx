import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-50, 50], [-8, 8]);
  const ry = useTransform(mx, [-50, 50], [8, -8]);

  const handleMove = (e: React.MouseEvent) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = e.clientX - (bounds.left + bounds.width / 2);
    const y = e.clientY - (bounds.top + bounds.height / 2);
    mx.set(Math.max(-50, Math.min(50, x / 10)));
    my.set(Math.max(-50, Math.min(50, y / 10)));
  };

  return (
    <section aria-label="Parallax Product Showcase" className="py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Immersive 2.5D Preview</h2>
          <p className="text-white/70">Layers shift subtly with your cursor to create depth — smooth and energy-efficient.</p>
        </div>
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          className="relative h-[380px] rounded-3xl overflow-hidden glassmorphism border-0"
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="absolute inset-0 pointer-events-none">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-bodify-gradient-animated animate-gradient-x opacity-40" />
          </motion.div>
          {/* Depth layers */}
          <motion.div style={{ x: useTransform(mx, v => v * 0.6), y: useTransform(my, v => v * 0.6) }} className="absolute top-10 left-8 right-24 h-40 rounded-2xl bg-black/40 border border-white/10 p-4">
            <div className="h-full w-full rounded-xl bg-gradient-to-br from-bodify-darker via-bodify-dark to-bodify-darker"></div>
            <p className="absolute bottom-3 left-4 text-white/80 text-sm">Dashboard Layer</p>
          </motion.div>
          <motion.div style={{ x: useTransform(mx, v => v * 0.9), y: useTransform(my, v => v * 0.9) }} className="absolute top-32 left-20 w-64 h-40 rounded-2xl bg-bodify-gradient shadow-glow" />
          <motion.div style={{ x: useTransform(mx, v => v * 1.2), y: useTransform(my, v => v * 1.2) }} className="absolute bottom-10 right-10 w-80 h-48 rounded-3xl bg-black/40 border border-white/10" />
        </div>
      </div>
    </section>
  );
}
