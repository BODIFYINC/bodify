export default function TrendsShowcase() {
  const trends = [
    'Sustainable design', 'Claymorphism', 'Micro-interactions', 'AI personalization',
    'AR in apps', 'Bento grids', 'Dark mode', 'Immersive 3D', 'Voice UI',
    'Accessibility', 'Biometric auth', 'Functional minimalism', 'AI presence',
    'Creative colors', 'Custom illustrations', 'Emotional design', 'Experimental type',
    'Gradients', 'Kinetic type', 'Neubrutalism'
  ];
  return (
    <section aria-label="2025 Trends" className="py-16 bg-gradient-to-b from-bodify-dark to-bodify-darker">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center kinetic-typography">UI Trends 2025, Built Into Bodify</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {trends.map((t) => (
            <span key={t} className="px-4 py-2 rounded-full bg-bodify-gradient text-black/90 font-semibold shadow hover-scale">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
