import { Card } from '@/components/ui/card';

const items = [
  { title: 'AI Coach', desc: '24/7 adaptive guidance with short, focused tips.' },
  { title: 'Smart Training', desc: 'Plans optimized to your gear and schedule.' },
  { title: 'Custom Nutrition', desc: 'Meal plans that match goals and dislikes.' },
  { title: 'Progress Analytics', desc: 'Track calories, macros, and milestones.' }
];

export default function ClaymorphismFeatures() {
  return (
    <section aria-label="Clay Features" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">Claymorphic Feature Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((i) => (
            <Card key={i.title} className="rounded-3xl p-6 border border-border bg-gradient-to-br from-bodify-darker via-bodify-dark to-bodify-darker shadow-xl hover-scale">
              <h3 className="text-xl font-bold mb-2">{i.title}</h3>
              <p className="text-white/80 text-sm">{i.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
