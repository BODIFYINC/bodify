import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BodifyLogo from '@/components/BodifyLogo';
import CountUp from 'react-countup';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Crazy animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Multiple animated gradient layers */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, hsl(var(--secondary) / 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, hsl(var(--accent) / 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        
        {/* Floating geometric madness */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 360, 0],
              scale: [1, Math.random() * 0.5 + 0.5, 1],
              opacity: [0.1, 0.8, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            className="absolute w-4 h-4 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0%'
            }}
          />
        ))}
        
        {/* Pulsing grid lines */}
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.02, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center">
          {/* Static Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0
            }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut"
            }}
            className="mb-8 cursor-pointer"
          >
            <BodifyLogo 
              className="h-24 w-auto mx-auto"
              alt="Bodify Logo"
            />
          </motion.div>

          {/* INSANE Hero headline with glitch effects */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 relative"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))",
                  "0 0 15px hsl(var(--secondary)), 0 0 25px hsl(var(--secondary)), 0 0 35px hsl(var(--secondary))",
                  "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary))"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white"
            >
              Transform Your Body with{' '}
            </motion.span>
            <motion.span 
              animate={{
                background: [
                  "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  "linear-gradient(45deg, hsl(var(--secondary)), hsl(var(--accent)))",
                  "linear-gradient(45deg, hsl(var(--accent)), hsl(var(--primary)))",
                  "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--secondary)))"
                ],
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                backgroundPosition: { duration: 2, repeat: Infinity }
              }}
              className="text-transparent bg-clip-text bg-[length:200%_100%] font-extrabold tracking-tight"
              style={{
                filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.8))"
              }}
            >
              AI PRECISION
            </motion.span>
            
            {/* Glitch overlay effect */}
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                x: [0, 2, -2, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 2
              }}
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 pointer-events-none"
            >
              Transform Your Body with AI PRECISION
            </motion.div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto"
          >
            Revolutionary AI-powered fitness coaching that adapts to your unique body, goals, and lifestyle. 
            Experience personalized workouts, nutrition plans, and real-time guidance that evolves with you.
          </motion.p>
          
          {/* Subtitle with typewriter effect */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto relative"
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Revolutionary AI-powered fitness coaching that adapts to your unique body, goals, and lifestyle. 
              Experience personalized workouts, nutrition plans, and real-time guidance that evolves with you.
            </motion.span>
          </motion.p>
          
          {/* EXPLOSIVE Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring", stiffness: 200 }}
            className="relative mb-12"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 20px hsl(var(--primary) / 0.6)) brightness(1)",
                  "drop-shadow(0 0 40px hsl(var(--secondary) / 0.8)) brightness(1.2)",
                  "drop-shadow(0 0 20px hsl(var(--primary) / 0.6)) brightness(1)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:300%_100%] relative"
            >
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-primary via-secondary via-accent to-primary bg-clip-text text-transparent bg-[length:300%_100%]"
              >
                BODIFY YOUR BODY
              </motion.span>
              
              {/* Explosion particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 50, 0],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 50, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link to="/get-started">Start Your Journey</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>

          {/* Key stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: 10000, suffix: "K+", label: "Users Transformed" },
              { number: 95, suffix: "%", label: "Goal Achievement Rate" },
              { number: 24, suffix: "/7", label: "AI Coach Available" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ 
                  scale: 1.08,
                  y: -5,
                  filter: "drop-shadow(0 10px 30px hsl(var(--primary) / 0.4))"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-card/40 via-card/30 to-transparent backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden"
              >
                {/* Animated background glow */}
                <motion.div
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.5
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl"
                />
                
                {/* Floating particles */}
                <motion.div
                  animate={{ 
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    delay: i * 0.3
                  }}
                  className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="text-4xl md:text-5xl font-black mb-3"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.2, duration: 0.6 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_100%] animate-[gradient_3s_ease-in-out_infinite]">
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={1.5}
                        delay={1 + i * 0.2}
                        separator=","
                        useEasing={true}
                        preserveValue={false}
                      />
                      {stat.suffix}
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    className="text-muted-foreground font-medium tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.2, duration: 0.5 }}
                  >
                    {stat.label}
                  </motion.div>
                </div>
                
                {/* Gradient border animation */}
                <motion.div
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}