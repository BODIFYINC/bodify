
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Target, Users, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Immersive3D from '@/sections/home/Immersive3D';
import VoiceUIDemo from '@/sections/home/VoiceUIDemo';
import TrendsShowcase from '@/sections/home/TrendsShowcase';
import SustainabilitySection from '@/sections/home/SustainabilitySection';
import AccessibilitySection from '@/sections/home/AccessibilitySection';
import ClaymorphismFeatures from '@/sections/home/ClaymorphismFeatures';
import NeobrutalismBand from '@/sections/home/NeobrutalismBand';
import AIPreviewBento from '@/sections/home/AIPreviewBento';
import ParallaxShowcase from '@/sections/home/ParallaxShowcase';
import HowItWorksScroller from '@/sections/home/HowItWorksScroller';
import BiometricsStrip from '@/sections/home/BiometricsStrip';
import BrandPaletteBand from '@/sections/home/BrandPaletteBand';
import FinalCTA from '@/sections/home/FinalCTA';

const Index = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <Navbar />
      
      <style>{`
        .testimonial-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      {/* Hero Section - Improved spacing and layout */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
        {/* Multi-color animated gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-bodify-gradient-animated animate-gradient-x opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90"></div>
        </div>

        <div className="container mx-auto px-6 z-10 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-bodify-gradient text-black/90 font-semibold shadow-lg border border-white/20 text-sm mb-6">
                🚀 AI-Powered Fitness Revolution
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-transparent bg-clip-text bg-bodify-gradient-animated animate-gradient-shift">Bodify</span>
              <br />
              <span className="text-white drop-shadow-lg">your body</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of fitness with <span className="font-bold text-transparent bg-clip-text bg-bodify-gradient-animated">AI-powered personalized coaching</span> tailored to you. Slogan: <strong>Bodify your body</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Button asChild className="btn-primary text-lg px-10 py-6 rounded-xl shadow-2xl">
                <Link to="/get-started">Start Your Journey</Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-10 py-6 rounded-xl">
                <a href="#features">Discover Features</a>
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "10K+", label: "Active Users" },
                { number: "95%", label: "Success Rate" },
                { number: "24/7", label: "AI Support" },
                { number: "50+", label: "Exercise Types" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-bodify-gradient text-transparent bg-clip-text mb-2 drop-shadow-lg">{stat.number}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section - Bento grid, glassmorphism, kinetic typography */}
      <section id="features" className="py-24 bg-gradient-to-b from-bodify-darker via-bodify-dark to-bodify-darker">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-bodify-gradient-animated animate-gradient-shift">
              Why Choose Bodify?
            </h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto kinetic-typography">
              Revolutionary AI technology meets expert fitness knowledge to deliver results that matter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bento-grid">
            {[
              {
                icon: Zap,
                title: "AI Coach",
                description: "24/7 intelligent coaching that learns and adapts to your progress.",
                color: "bg-bodify-gradient"
              },
              {
                icon: Target,
                title: "Smart Training",
                description: "Personalized workouts optimized for your goals and equipment.",
                color: "bg-gradient-to-br from-bodify-purple to-bodify-accent"
              },
              {
                icon: Users,
                title: "Custom Nutrition",
                description: "Meal plans tailored to your dietary preferences and lifestyle.",
                color: "bg-gradient-to-br from-bodify-accent to-bodify-purple"
              },
              {
                icon: Trophy,
                title: "Real Results",
                description: "Track progress with advanced analytics and insights.",
                color: "bg-gradient-to-br from-bodify-purple to-cyan-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="rounded-2xl p-8 h-full border border-border bg-gradient-to-br from-bodify-darker via-bodify-dark to-bodify-darker shadow-xl glassmorphism-bento hover:scale-105 transition-transform duration-300">
                  <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color} shadow-lg animate-icon-pop`}>
                    <feature.icon className={`h-8 w-8 text-white`} />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 text-white kinetic-typography">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed text-lg">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works - Redesigned */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Simple. Smart. Effective.</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Get started in minutes and see results in weeks
            </p>
          </div>
          
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-bodify-purple via-bodify-orange to-bodify-purple opacity-30"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  step: "01",
                  title: "Quick Setup",
                  description: "Create your profile and tell us about your fitness goals in under 2 minutes."
                },
                {
                  step: "02", 
                  title: "AI Analysis",
                  description: "Our AI analyzes your data to create a completely personalized fitness plan."
                },
                {
                  step: "03",
                  title: "Start Training",
                  description: "Begin your transformation with workouts and nutrition designed just for you."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="relative z-10 glassmorphism rounded-3xl p-10 border-0">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-bodify-gradient mb-6">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section - Enhanced */}
      <section id="pricing" className="py-24 bg-bodify-dark/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Start Your Transformation</h2>
            <p className="text-xl text-white/70">
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
            <Card className="glassmorphism overflow-hidden border-0 rounded-3xl">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-2 bg-bodify-gradient"></div>
                <div className="bg-gradient-to-br from-bodify-purple/20 to-bodify-orange/20 p-8 text-center">
                  <div className="inline-block px-4 py-2 rounded-full bg-bodify-gradient text-white text-sm font-bold mb-4">
                    LIMITED TIME OFFER
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Premium Access</h3>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-white/70 text-2xl line-through">$49.99</span>
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">60% OFF</span>
                  </div>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-4xl font-semibold text-white">$</span>
                    <span className="text-7xl font-bold text-white">20</span>
                    <div className="flex flex-col items-start ml-2">
                      <span className="text-white text-2xl">.00</span>
                      <span className="text-white/90 text-lg">per month</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <ul className="space-y-5 mb-10">
                    {[
                      "24/7 AI Fitness Coach",
                      "Unlimited Personalized Workouts", 
                      "Custom Meal Plans & Recipes",
                      "Progress Tracking & Analytics",
                      "Video Exercise Library",
                      "Premium Community Access"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-bodify-gradient flex items-center justify-center mr-4 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white/90 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="btn-primary w-full text-lg py-6 rounded-xl shadow-2xl">
                    <Link to="/get-started">
                      Transform Your Body Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  
                  <p className="text-center text-white/60 text-sm mt-6">
                    No commitment • Cancel anytime • 30-day guarantee
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials - Improved design */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-white/70">
              Real transformations from real people
            </p>
          </div>
          
          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Working Mom",
                rating: 5,
                text: "Lost 25 pounds in 3 months! The AI coach understood my busy schedule and created workouts I could actually stick to.",
                image: "https://picsum.photos/seed/sarah/80",
                result: "25 lbs lost"
              },
              {
                name: "Marcus Lee", 
                role: "Software Developer",
                rating: 5,
                text: "Finally found a program that works with my sedentary lifestyle. The meal plans are game-changers!",
                image: "https://picsum.photos/seed/marcus/80",
                result: "15 lbs gained"
              },
              {
                name: "Tanya Rivera",
                role: "Fitness Enthusiast", 
                rating: 5,
                text: "Even as someone who knew fitness, Bodify's AI taught me so much about optimizing my workouts.",
                image: "https://picsum.photos/seed/tanya/80",
                result: "Body fat -8%"
              }
            ].map((testimonial, i) => (
              <div
                key={i}
                className="testimonial-card glassmorphism rounded-3xl p-8 opacity-0 transition-all duration-700 border-0"
              >
                <div className="flex items-start mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                  <div className="flex-1">
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-bodify-orange text-sm">{testimonial.role}</p>
                    <div className="flex mt-2">
                      {Array(5).fill(0).map((_, index) => (
                        <svg key={index} className={`h-4 w-4 ${index < testimonial.rating ? "text-yellow-400" : "text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-bodify-orange">{testimonial.result}</div>
                  </div>
                </div>
                <p className="text-white/90 italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Coach Preview */}
      <section id="ai-coach" className="py-24 bg-gradient-to-b from-bodify-darker via-bodify-dark to-bodify-darker">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Meet your 24/7 AI Coach</h2>
              <p className="text-white/80 text-lg mb-6">Ask anything about training, nutrition, or recovery. Get concise, science-backed answers tailored to you.</p>
              <ul className="space-y-3">
                {[
                  "Personalized daily tips and adjustments",
                  "Instant form cues and workout swaps",
                  "Nutrition answers based on your dislikes",
                ].map((t, i) => (
                  <li key={i} className="flex items-center">
                    <span className="h-5 w-5 rounded-full bg-bodify-gradient mr-3" />
                    <span className="text-white/90">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild className="btn-primary rounded-xl px-8 py-6">
                  <Link to="/get-started">Try the AI Coach</Link>
                </Button>
              </div>
            </div>
            <div className="glassmorphism rounded-2xl p-6 border-0">
              <div className="space-y-4">
                <div className="bg-background/40 rounded-xl p-4">
                  <p className="text-sm text-white/70">You</p>
                  <p className="text-white">What should I eat post-workout to maximize recovery?</p>
                </div>
                <div className="bg-background/60 rounded-xl p-4 border border-border">
                  <p className="text-sm text-white/70">Bodify Coach</p>
                  <p className="text-white/90">Aim for 0.3–0.5 g/kg protein + fast carbs within 60 min. Example: Greek yogurt bowl with berries and honey. Hydrate and add sodium if you sweat heavily.</p>
                </div>
                <div className="bg-background/40 rounded-xl p-4">
                  <p className="text-sm text-white/70">You</p>
                  <p className="text-white">I hate bananas. Alternatives?</p>
                </div>
                <div className="bg-background/60 rounded-xl p-4 border border-border">
                  <p className="text-sm text-white/70">Bodify Coach</p>
                  <p className="text-white/90">Swap bananas for berries, dates, or mango. Same carbs, better match for your preferences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/70">Everything you need to know before getting started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "Is Bodify really personalized?",
                a: "Yes. Workouts, nutrition, and tips adapt to your gender, age, height, activity, goal, and dislikes."
              },
              {
                q: "How much does it cost?",
                a: "Bodify Premium is $20/month. Cancel anytime."
              },
              {
                q: "Do you support dietary restrictions?",
                a: "Absolutely. We filter meals for allergies and dislikes and offer smart alternatives."
              },
              {
                q: "Will I lose progress if I switch devices?",
                a: "Your data syncs to your account once you sign in on all devices."
              }
            ].map((item, i) => (
              <div key={i} className="glassmorphism rounded-2xl p-6 border-0">
                <h3 className="text-xl font-bold mb-2">{item.q}</h3>
                <p className="text-white/80">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-24 bg-bodify-dark/50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Built by athletes, powered by AI</h2>
          <p className="text-white/80 max-w-3xl mx-auto mb-10">Learn more about our mission, team, and technology shaping the future of fitness coaching.</p>
          <Button asChild variant="outline" className="px-8 py-6 rounded-xl">
            <Link to="/about">Read our story</Link>
          </Button>
        </div>
      </section>

      {/* Social band */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/70 mb-4">Follow our journey</p>
          <div className="flex justify-center gap-6">
            <a className="underline hover:opacity-80" href="https://tiktok.com/@bodify_inc" target="_blank" rel="noreferrer">tiktok.com/@bodify_inc</a>
            <a className="underline hover:opacity-80" href="https://instagram.com/bodify.inc" target="_blank" rel="noreferrer">instagram.com/bodify.inc</a>
          </div>
        </div>
      </section>

      <TrendsShowcase />
      <Immersive3D />
      <ClaymorphismFeatures />
      <NeobrutalismBand />
      <VoiceUIDemo />
      <SustainabilitySection />
      <AccessibilitySection />

      <Footer />
    </div>
  );
};

export default Index;
