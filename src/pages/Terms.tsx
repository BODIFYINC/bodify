
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Terms of Service</h1>
            
            <div className="glassmorphism rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg mb-6">
                  Last Updated: May 23, 2025
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">1. Acceptance of Terms</h2>
                <p className="mb-6">
                  By accessing or using Bodify's services, website, or mobile application (collectively, the "Service"), you agree to be bound by these Terms of Service. If you don't agree to these terms, you may not use the Service.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">2. Description of Service</h2>
                <p className="mb-6">
                  Bodify provides an AI-powered fitness coaching platform that offers personalized workout plans, nutrition guidance, and progress tracking. While our AI is designed to provide quality fitness recommendations, it is not a replacement for professional medical advice, diagnosis, or treatment.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">3. Your Account</h2>
                <p className="mb-6">
                  You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">4. Subscription and Billing</h2>
                <p className="mb-6">
                  Bodify offers a subscription-based service at $20 per month. By subscribing, you authorize us to charge your payment method on a recurring basis until you cancel. You may cancel your subscription at any time, and you'll continue to have access to the Service until the end of your current billing period.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">5. User Content</h2>
                <p className="mb-6">
                  You retain all rights to any content you submit, post, or display on or through the Service. By providing content to Bodify, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, and display that content in connection with the services we provide to you.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">6. Limitation of Liability</h2>
                <p className="mb-6">
                  To the maximum extent permitted by law, Bodify shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or use, incurred by you or any third party, whether in an action in contract or tort, arising from your access to or use of the Service.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">7. Changes to Terms</h2>
                <p className="mb-6">
                  We reserve the right to modify these Terms of Service at any time. The updated terms will be indicated by an updated "Last Updated" date and will be effective immediately upon posting. It's your responsibility to review these Terms periodically.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">8. Contact Us</h2>
                <p>
                  If you have questions about these Terms of Service, please contact us at legal@bodify.ai.
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

export default Terms;
