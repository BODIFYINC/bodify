
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cookies = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Cookie Policy</h1>
            
            <div className="glassmorphism rounded-xl p-8 md:p-12 max-w-4xl mx-auto">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg mb-6">
                  Last Updated: May 23, 2025
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">1. What Are Cookies</h2>
                <p className="mb-6">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies enhance user experience by allowing websites to remember your preferences and understand how you use their site.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">2. How We Use Cookies</h2>
                <p className="mb-4">At Bodify, we use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be switched off.</li>
                  <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                  <li><strong>Functionality Cookies:</strong> These allow our website to remember choices you make and provide enhanced features.</li>
                  <li><strong>Analytics Cookies:</strong> These cookies collect information about how visitors use our website, helping us to improve it.</li>
                  <li><strong>Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">3. Managing Cookies</h2>
                <p className="mb-6">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, as it will no longer be personalized to you. It may also stop you from saving customized settings.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">4. Third-Party Cookies</h2>
                <p className="mb-6">
                  In some special cases, we also use cookies provided by trusted third parties. Our site uses Google Analytics, one of the most widespread and trusted analytics solutions on the web, to help us understand how you use the site and ways that we can improve your experience.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">5. Changes to This Cookie Policy</h2>
                <p className="mb-6">
                  We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 text-bodify-orange">6. Contact Us</h2>
                <p>
                  If you have questions about this Cookie Policy, please contact us at privacy@bodify.ai.
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

export default Cookies;
