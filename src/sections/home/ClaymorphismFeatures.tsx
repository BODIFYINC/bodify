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
            <Card key={i.title} className="rounded-3xl p-8 border border-primary/20 bg-gradient-to-br from-background/80 via-card/60 to-background/80 shadow-2xl hover:shadow-primary/20 hover-scale backdrop-blur-sm group cursor-pointer overflow-hidden relative">{/*hover:border-primary/40*/}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-xl font-bold mb-3 text-gradient group-hover:scale-105 transition-transform duration-300">{i.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">{i.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
