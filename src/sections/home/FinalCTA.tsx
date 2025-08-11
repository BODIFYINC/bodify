import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function FinalCTA() {
  return (
    <section aria-label="Final Call to Action" className="py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="rounded-3xl p-10 text-center bg-gradient-to-br from-bodify-darker via-bodify-dark to-bodify-darker border border-border shadow-glow">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-bodify-gradient-animated animate-gradient-shift">Your body, your plan, your future — powered by AI.</h2>
          <p className="text-white/80 mb-8">No fluff. Just elite UI + science-backed results.</p>
          <Button asChild className="btn-primary rounded-xl px-10 py-6">
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
