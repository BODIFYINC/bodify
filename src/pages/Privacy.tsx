
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
            
            <div className="glassmorphism rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg mb-6">
                  Last Updated: May 23, 2025
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">1. Introduction</h2>
                <p className="mb-6">
                  At Bodify ("we," "us," or "our"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI fitness coaching service, website, and mobile application (collectively, the "Service").
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">2. Information We Collect</h2>
                <p className="mb-4">We may collect information about you in a variety of ways including:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Personal Data:</strong> Name, email address, and payment information</li>
                  <li><strong>Profile Information:</strong> Age, weight, height, fitness goals, and preferences</li>
                  <li><strong>Usage Data:</strong> How you interact with our Service</li>
                  <li><strong>Device Information:</strong> IP address, browser type, device type</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">3. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Provide, maintain, and improve our Service</li>
                  <li>Process your payments and subscription</li>
                  <li>Generate personalized fitness and nutrition recommendations</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Send you updates, marketing communications, and promotional offers</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">4. Data Security</h2>
                <p className="mb-6">
                  We use administrative, technical, and physical security measures to protect your personal information. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">5. Your Rights</h2>
                <p className="mb-6">
                  Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or export your data. To exercise these rights, please contact us at privacy@bodify.ai.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">6. Changes to This Privacy Policy</h2>
                <p className="mb-6">
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">7. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at privacy@bodify.ai.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
