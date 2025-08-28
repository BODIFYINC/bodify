import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Brain, Sparkles, Star, Dumbbell, Heart, Trophy, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/3 to-accent/5" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-black mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '300% 300%' }}
            >
              BODIFY
            </motion.h1>
            <motion.div 
              className="text-3xl md:text-4xl font-medium mb-6 text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Transform Your Body with 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold"> AI Precision</span>
            </motion.div>
            <motion.p 
              className="text-xl md:text-2xl font-light mb-16 text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Join thousands who've revolutionized their fitness journey with personalized AI coaching, smart nutrition tracking, and breakthrough workout optimization
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button 
                size="lg" 
                className="text-xl px-16 py-8 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-primary/30 text-white font-semibold"
              >
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-12 py-8 rounded-full border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-12 mt-20 pt-16 border-t border-border/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { number: '50K+', label: 'Active Users' },
                { number: '2M+', label: 'Workouts Completed' },
                { number: '95%', label: 'Success Rate' },
                { number: '4.9★', label: 'User Rating' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated Background Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full opacity-30"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Revolutionary Features
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of fitness technology designed to maximize your potential
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Brain, title: 'AI Coach', desc: 'Personal AI trainer that adapts to your progress and goals', color: 'from-blue-500 to-cyan-500' },
              { icon: Target, title: 'Smart Goals', desc: 'Precision targeting with data-driven goal setting', color: 'from-green-500 to-emerald-500' },
              { icon: Zap, title: 'Real-time', desc: 'Instant feedback and live performance optimization', color: 'from-yellow-500 to-orange-500' },
              { icon: Trophy, title: 'Results', desc: 'Proven track record of transformational outcomes', color: 'from-purple-500 to-pink-500' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-10 text-center bg-gradient-to-br from-card/90 via-card/80 to-muted/30 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group backdrop-blur-sm">
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-xl`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-6 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Bodify Section */}
      <section className="py-32 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Choose Bodify?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced technology meets personalized fitness for unprecedented results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Dumbbell, 
                title: 'Smart Workouts', 
                desc: 'AI-generated workout plans that adapt to your fitness level, schedule, and goals. Never get stuck in a routine again.',
                stat: '10M+ workouts created'
              },
              { 
                icon: Heart, 
                title: 'Health Integration', 
                desc: 'Seamlessly sync with your favorite fitness trackers and health apps for comprehensive monitoring.',
                stat: '95% user satisfaction'
              },
              { 
                icon: TrendingUp, 
                title: 'Progress Tracking', 
                desc: 'Advanced analytics show your improvement over time with detailed insights and milestone celebrations.',
                stat: '3x faster results'
              },
              { 
                icon: Users, 
                title: 'Community Support', 
                desc: 'Connect with like-minded individuals, share achievements, and get motivated by success stories.',
                stat: '50K+ active members'
              },
              { 
                icon: Brain, 
                title: 'Adaptive AI', 
                desc: 'Machine learning algorithms that understand your preferences and continuously optimize your experience.',
                stat: '99.7% accuracy rate'
              },
              { 
                icon: Sparkles, 
                title: 'Premium Experience', 
                desc: 'Beautiful interface design with smooth animations and intuitive navigation for effortless fitness tracking.',
                stat: 'Award-winning design'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 h-full group">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{feature.desc}</p>
                  <div className="text-sm font-semibold text-primary">{feature.stat}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real transformations from real people who chose Bodify
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', result: 'Lost 30lbs in 3 months', quote: 'Bodify completely changed my relationship with fitness. The AI coach knows exactly what I need!', rating: 5, avatar: '👩‍💼' },
              { name: 'Mike R.', result: 'Gained 15lbs muscle', quote: 'The precision of the workouts is incredible. I\'ve never seen results this fast before.', rating: 5, avatar: '👨‍💻' },
              { name: 'Emma L.', result: 'Marathon ready in 6 months', quote: 'From couch to marathon runner. Bodify made the impossible possible for me.', rating: 5, avatar: '👩‍🎨' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 bg-card/90 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-primary font-semibold text-sm">{testimonial.result}</div>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed italic">"{testimonial.quote}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start your transformation journey with flexible pricing options
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Basic',
                price: '$9.99',
                period: '/month',
                features: ['AI Workout Plans', 'Basic Nutrition Tracking', 'Progress Analytics', 'Community Access'],
                popular: false
              },
              {
                name: 'Pro',
                price: '$19.99',
                period: '/month',
                features: ['Everything in Basic', 'Advanced AI Coach', 'Custom Meal Plans', 'Wearable Integration', 'Priority Support'],
                popular: true
              },
              {
                name: 'Elite',
                price: '$39.99',
                period: '/month',
                features: ['Everything in Pro', '1-on-1 Coaching', 'Advanced Analytics', 'Supplement Recommendations', 'VIP Community'],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className={`p-8 text-center h-full relative ${plan.popular ? 'border-primary border-2 bg-gradient-to-br from-primary/5 to-secondary/5' : 'border-primary/20'} transition-all duration-300 hover:border-primary/40`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-muted-foreground">
                        <div className="w-5 h-5 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white' : 'variant-outline'}`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Ready to Transform?
            </h2>
            <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the fitness revolution. Your perfect body is just one click away.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="text-2xl px-20 py-10 rounded-full bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-primary hover:to-secondary transition-all duration-700 transform shadow-2xl hover:shadow-primary/40 text-white font-bold"
              >
                Start Your Transformation
                <ArrowRight className="ml-4 h-8 w-8" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}