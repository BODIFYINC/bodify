
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Target, Users, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import HeroSection from '@/sections/home/LogoShowcase';
import FeaturesSection from '@/sections/home/Immersive3D';
import StatsSection from '@/sections/home/StatsSection';
import TestimonialsSection from '@/sections/home/TestimonialsSection';
import TechSection from '@/sections/home/TechSection';
import CTASection from '@/sections/home/CTASection';
import FinalCTA from '@/sections/home/FinalCTA';

const Index = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  useEffect(() => {
    if (testimonialsRef.current) {
      const cards = testimonialsRef.current.querySelectorAll('.testimonial-card');
      let delay = 0;
      cards.forEach((card) => {
        setTimeout(() => {
          card.classList.add('testimonial-visible');
        }, delay);
        delay += 150;
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Technology Section */}
      <TechSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Pricing Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Transformation
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to achieve your fitness goals
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent"></div>
                <div className="p-8 text-center">
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold mb-4">
                    BODIFY PREMIUM
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Premium Access</h3>

                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-muted-foreground text-2xl line-through">$49.99</span>
                    <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded-full">60% OFF</span>
                  </div>

                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className={billingCycle === 'monthly' ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>Monthly</span>
                    <Switch
                      checked={billingCycle === 'yearly'}
                      onCheckedChange={(v) => setBillingCycle(v ? 'yearly' : 'monthly')}
                      aria-label="Toggle yearly billing"
                    />
                    <span className={billingCycle === 'yearly' ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>
                      Yearly <span className="ml-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] font-bold">2 months free</span>
                    </span>
                  </div>

                  <motion.div
                    key={billingCycle}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-center mb-6"
                  >
                    <span className="text-4xl font-semibold">$</span>
                    <span className="text-7xl font-bold">{billingCycle === 'yearly' ? '200' : '20'}</span>
                    <div className="flex flex-col items-start ml-2">
                      <span className="text-2xl">.00</span>
                      <span className="text-muted-foreground text-lg">{billingCycle === 'yearly' ? 'per year' : 'per month'}</span>
                    </div>
                  </motion.div>
                  
                  <ul className="space-y-4 mb-8 text-left">
                    {[
                      "24/7 AI Fitness Coach",
                      "Unlimited Personalized Workouts", 
                      "Custom Meal Plans & Recipes",
                      "Progress Tracking & Analytics",
                      "Video Exercise Library",
                      "Premium Community Access"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3 flex-shrink-0">
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="w-full text-lg py-6" size="lg">
                    <Link to="/get-started">
                      Transform Your Body Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  
                  <p className="text-center text-muted-foreground text-sm mt-6">
                    No commitment • Cancel anytime • 30-day guarantee
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />

      <Footer />
    </div>
  );
};

export default Index;
