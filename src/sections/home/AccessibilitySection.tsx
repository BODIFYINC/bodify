export default function AccessibilitySection() {
  return (
    <section aria-label="Accessibility" className="py-24 bg-bodify-dark/50">
      <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Accessible & Inclusive</h2>
          <p className="text-white/70">Contrast-checked, keyboard navigable, screen reader-friendly.</p>
        </div>
        <ul className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          {["Keyboard navigation","ARIA labels","Reduced motion support","Semantic HTML"].map((i) => (
            <li key={i} className="glassmorphism rounded-2xl p-5 border-0 text-left">
              <span className="font-semibold">{i}</span>
              <p className="text-white/70 text-sm mt-1">Built into our components and design system.</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
