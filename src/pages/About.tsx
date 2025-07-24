
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <Navbar />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">About Bodify</h1>
            
            <div className="glassmorphism rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-bodify-orange">Our Mission</h2>
              <p className="text-lg mb-8 text-white/80">
                At Bodify, we're revolutionizing fitness coaching through the power of artificial intelligence. 
                Our mission is to make personalized, expert-level fitness guidance accessible to everyone, 
                regardless of their location or schedule. We believe that everyone deserves a fitness 
                experience tailored to their unique needs and goals.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-bodify-orange">Our Approach</h2>
              <p className="text-lg mb-8 text-white/80">
                Unlike generic workout plans or one-size-fits-all approaches, Bodify uses advanced AI 
                to understand your body, preferences, and goals. Our technology adapts to your progress, 
                providing real-time adjustments to your training and nutrition plans. Think of Bodify as 
                having a world-class personal trainer and nutritionist in your pocket, available 24/7.
              </p>
              
              <h2 className="text-2xl font-bold mb-6 text-bodify-orange">Our Team</h2>
              <p className="text-lg text-white/80">
                Bodify was founded by a team of fitness professionals and AI specialists who saw the potential 
                for technology to transform personal fitness. Our diverse team includes certified personal trainers, 
                nutritionists, software engineers, and data scientists who work together to create an 
                unparalleled fitness coaching experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
