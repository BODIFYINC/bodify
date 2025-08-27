
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Play, ArrowRight, Zap, Target, Users, Trophy, 
  Sparkles, Star, ChevronDown, Globe, Shield, 
  Smartphone, Monitor, Heart, Activity
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  
  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "AI Personal Trainer",
      description: "Get personalized workouts powered by advanced AI that adapts to your fitness level and goals.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Nutrition Intelligence",
      description: "Smart meal planning with nutritional insights tailored to your body's needs and preferences.",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Progress Analytics",
      description: "Track your transformation with detailed analytics and real-time progress monitoring.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Health Monitoring",
      description: "Comprehensive health tracking with wearable integration and vital sign monitoring.",
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const HeroCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="card-premium p-8 text-center backdrop-blur-xl"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* SEO Optimization */}
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
            className="w-full h-full object-cover opacity-30"
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="https://cdn.pixabay.com/video/2022/12/06/142041-779048616_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        </div>

        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-1"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              className={`absolute w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm`}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`
              }}
            />
          ))}
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="mb-8 px-6 py-2 text-sm font-medium bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border-primary/30">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Fitness Revolution
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight"
          >
            Transform Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-shift">
              Body & Mind
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of fitness with AI-powered personal training, 
            intelligent nutrition planning, and comprehensive health monitoring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              asChild
              size="lg"
              className="btn-primary px-12 py-6 text-lg font-semibold group relative overflow-hidden"
            >
              <Link to="/get-started">
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              className="px-12 py-6 text-lg font-semibold border border-primary/30 hover:bg-primary/10 group"
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { number: "50K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
              { number: "98%", label: "Success Rate", icon: <Trophy className="w-6 h-6" /> },
              { number: "24/7", label: "AI Support", icon: <Zap className="w-6 h-6" /> }
            ].map((stat, i) => (
              <HeroCard key={i} delay={1.2 + i * 0.2}>
                <div className="flex items-center justify-center mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 text-gradient">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </HeroCard>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-muted-foreground"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section ref={featuresRef} className="py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Bodify?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology meets personalized fitness to deliver unprecedented results.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Interactive Feature Cards */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveFeature(index)}
                  className={`card-premium p-8 cursor-pointer transition-all duration-500 ${
                    activeFeature === index 
                      ? 'border-primary/50 bg-gradient-to-r ' + feature.gradient 
                      : 'hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-primary transition-all duration-500 ${
                      activeFeature === index ? 'scale-110' : ''
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 3D Visual Display */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] glassmorphism rounded-3xl p-8 flex items-center justify-center"
            >
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-48 h-48 mx-auto mb-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-6xl text-white shadow-glow"
                >
                  {features[activeFeature].icon}
                </motion.div>
                <h3 className="text-3xl font-bold mb-4">{features[activeFeature].title}</h3>
                <p className="text-muted-foreground text-lg">{features[activeFeature].description}</p>
              </motion.div>

              {/* Floating particles around 3D element */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.cos(i * Math.PI / 4) * 50, 0],
                    y: [0, Math.sin(i * Math.PI / 4) * 50, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.5,
                    repeat: Infinity
                  }}
                  className="absolute w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full blur-sm"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section with Full-width Layout */}
      <section className="py-32 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-conic from-primary/20 via-transparent to-secondary/20 rounded-full"
          />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8">
              Ready to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Transform?
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join thousands who have already achieved their fitness goals with our AI-powered platform.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                className="btn-primary px-16 py-8 text-2xl font-bold group relative overflow-hidden"
              >
                <Link to="/get-started">
                  Start Free Trial
                  <motion.div
                    className="ml-4"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-8 w-8" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>

            <div className="flex justify-center items-center gap-8 mt-12 text-sm text-muted-foreground">
              {[
                "No credit card required",
                "Cancel anytime",
                "30-day guarantee"
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <Star className="w-4 h-4 text-primary" />
                  {text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
