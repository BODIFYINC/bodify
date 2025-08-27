import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Zap, Target, Users, Trophy, Sparkles, Star, ChevronDown, Shield, Heart, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FinalCTA from '@/sections/home/FinalCTA';

const Index = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'AI Personal Trainer',
      description: 'Get personalized workouts powered by advanced AI that adapts to your fitness level and goals.',
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Nutrition Intelligence',
      description: "Smart meal planning with nutritional insights tailored to your body's needs and preferences.",
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Progress Analytics',
      description: 'Track your transformation with detailed analytics and real-time progress monitoring.',
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Health Monitoring',
      description: 'Comprehensive health tracking with wearable integration and vital sign monitoring.',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const HeroCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="card-premium p-6 text-center backdrop-blur-xl"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* SEO */}
      <div className="sr-only">
        <h1>Bodify - AI-Powered Fitness & Nutrition Platform</h1>
        <p>Transform your body with personalized AI fitness coaching, smart nutrition plans, and comprehensive health tracking.</p>
      </div>

      <Navbar />

      {/* Hero Section with Background Video */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-30"
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="https://cdn.pixabay.com/video/2022/12/06/142041-779048616_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/90" />
        </div>

        {/* Light floating accents (performance friendly) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm"
              style={{ left: `${15 + i * 25}%`, top: `${30 + i * 15}%` }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-8 px-6 py-2 text-sm font-medium bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border-primary/30">
              <Sparkles className="w-4 h-4 mr-2" /> AI-Powered Fitness Revolution
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Transform Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift">
              Body & Mind
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of fitness with AI-powered personal training, intelligent nutrition planning, and comprehensive health monitoring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
          >
            <Button asChild size="lg" className="btn-primary px-10 py-6 text-lg font-semibold group">
              <Link to="/get-started">
                Get Premium
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="px-10 py-6 text-lg font-semibold border border-primary/30 hover:bg-primary/10 group"
              onClick={() => setIsDemoOpen(true)}
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: '50K+', label: 'Active Users', icon: <Users className="w-6 h-6" /> },
              { number: '98%', label: 'Success Rate', icon: <Trophy className="w-6 h-6" /> },
              { number: '24/7', label: 'AI Support', icon: <Zap className="w-6 h-6" /> },
            ].map((stat, i) => (
              <HeroCard key={i} delay={0.2 + i * 0.1}>
                <div className="flex items-center justify-center mb-3 text-primary">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1 text-gradient">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </HeroCard>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="text-muted-foreground">
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section ref={featuresRef} className="py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Bodify?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology meets personalized fitness to deliver unprecedented results.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Feature Cards */}
            <div className="space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveFeature(index)}
                  className={`card-premium p-6 cursor-pointer transition-all duration-500 ${
                    activeFeature === index ? 'border-primary/50 bg-gradient-to-r ' + feature.gradient : 'hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-primary transition-all duration-500 ${
                        activeFeature === index ? 'scale-110' : ''
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Visual Display */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[520px] glassmorphism rounded-3xl p-8 flex items-center justify-center"
            >
              <motion.div key={activeFeature} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="w-40 h-40 mx-auto mb-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-5xl text-white shadow-glow"
                >
                  {features[activeFeature].icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{features[activeFeature].title}</h3>
                <p className="text-muted-foreground">{features[activeFeature].description}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Transform?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Join thousands who have already achieved their fitness goals with our AI-powered platform.
            </p>
            <Button asChild size="lg" className="btn-primary px-14 py-7 text-xl font-bold group">
              <Link to="/get-started">
                Get Premium
                <motion.div className="ml-3" animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-7 w-7" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-muted/20" id="pricing">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground">No free trial • Cancel anytime • 30-day guarantee</p>
          </div>

          <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="p-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold mb-4">
                BODIFY PREMIUM <span className="opacity-90">•</span> 50% OFF
              </div>

              <h3 className="text-3xl font-bold mb-4">Premium Access</h3>

              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-muted-foreground text-2xl line-through">$40.00</span>
                <span className="bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1 rounded-full">50% OFF</span>
              </div>

              <div className="flex items-center justify-center gap-3 mb-6">
                <span className={billingCycle === 'monthly' ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>Monthly</span>
                <Switch checked={billingCycle === 'yearly'} onCheckedChange={(v) => setBillingCycle(v ? 'yearly' : 'monthly')} aria-label="Toggle yearly billing" />
                <span className={billingCycle === 'yearly' ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>
                  Yearly <span className="ml-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-[10px] font-bold">2 months free</span>
                </span>
              </div>

              <motion.div key={billingCycle} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }} className="flex items-center justify-center mb-6">
                <span className="text-4xl font-semibold">$</span>
                <span className="text-7xl font-bold">{billingCycle === 'yearly' ? '200' : '20'}</span>
                <div className="flex flex-col items-start ml-2">
                  <span className="text-2xl">.00</span>
                  <span className="text-muted-foreground text-lg">{billingCycle === 'yearly' ? 'per year' : 'per month'}</span>
                </div>
              </motion.div>

              <ul className="space-y-3 mb-8 text-left max-w-md mx-auto">
                {[
                  '24/7 AI Fitness Coach',
                  'Unlimited Personalized Workouts',
                  'Custom Meal Plans & Recipes',
                  'Progress Tracking & Analytics',
                  'Video Exercise Library',
                  'Premium Community Access',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="sr-only">check</span>
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full text-lg py-6" size="lg">
                <Link to="/get-started">
                  Get Premium
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />

      <Footer />

      {/* Demo Dialog */}
      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Product Demo</DialogTitle>
          </DialogHeader>
          <div className="rounded-xl overflow-hidden">
            <video controls playsInline preload="metadata" className="w-full h-auto">
              <source src="https://cdn.pixabay.com/video/2017/09/06/12766-232470626_large.mp4" type="video/mp4" />
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
