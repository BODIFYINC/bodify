export default function BrandPaletteBand() {
  const colors = [
    { name: 'Electric Blue', var: 'var(--bodify-primary)', usage: 'Buttons, CTAs, highlights' },
    { name: 'Neon Green', var: 'var(--bodify-secondary)', usage: 'Success, active states' },
    { name: 'Soft Purple', var: 'var(--bodify-accent)', usage: 'Accents, gradients' },
    { name: 'Deep Navy', var: 'var(--bodify-darker)', usage: 'Backgrounds' },
  ];

  return (
    <section aria-label="Brand Palette" className="py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="rounded-3xl p-6 glassmorphism border-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Creative Color Branding</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {colors.map((c) => (
              <div key={c.name} className="rounded-2xl p-4 bg-black/30 border border-white/10">
                <div className="h-20 rounded-xl shadow-premium" style={{ background: c.var }} />
                <div className="mt-3">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-white/70 text-sm">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
