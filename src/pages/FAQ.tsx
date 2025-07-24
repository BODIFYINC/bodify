
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What is Bodify?",
      answer: "Bodify is an AI-powered fitness coach that provides personalized workout plans, nutrition guidance, and real-time feedback based on your unique goals, preferences, and progress."
    },
    {
      question: "How does the AI coaching work?",
      answer: "Our AI analyzes your fitness goals, current fitness level, preferences, and constraints to create personalized workout and nutrition plans. As you progress and provide feedback, the AI adapts and refines your plans for maximum effectiveness."
    },
    {
      question: "Is Bodify suitable for beginners?",
      answer: "Absolutely! Bodify is designed for everyone, from complete beginners to advanced fitness enthusiasts. The AI adapts to your experience level and progresses at a pace that's appropriate for you."
    },
    {
      question: "How much does Bodify cost?",
      answer: "Bodify costs $20 per month for unlimited access to all features including AI coaching, personalized meal plans, workout routines, progress tracking, and more."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to Bodify until the end of your current billing period."
    },
    {
      question: "Do I need any special equipment?",
      answer: "Not necessarily. Bodify can create workout plans based on the equipment you have available, whether that's a fully equipped gym, basic home equipment, or no equipment at all."
    },
    {
      question: "How are my meal plans created?",
      answer: "Your meal plans are generated based on your nutritional goals, dietary preferences, allergies, and restrictions. The AI considers factors like calorie targets, macronutrient distribution, and food preferences to create plans that are both effective and enjoyable."
    },
    {
      question: "Can I use Bodify on multiple devices?",
      answer: "Yes, Bodify is accessible on any device with a web browser, including desktops, laptops, tablets, and smartphones."
    }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-12">
              Find answers to common questions about Bodify and our AI fitness coaching.
            </p>
            
            <div className="max-w-3xl mx-auto glassmorphism rounded-xl p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                    <AccordionTrigger className="text-lg font-medium text-white hover:text-bodify-orange">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-white/70 mb-4">
                Still have questions? We're here to help.
              </p>
              <p className="text-bodify-orange">
                Contact us at support@bodify.ai
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
