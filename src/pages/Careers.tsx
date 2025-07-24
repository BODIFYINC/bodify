
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / San Francisco, CA",
      type: "Full-time"
    },
    {
      title: "Fitness Content Specialist",
      department: "Content",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time"
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote / Los Angeles, CA",
      type: "Full-time"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Join Our Team</h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-12">
              Help us revolutionize fitness through AI. At Bodify, we're looking for passionate individuals who are excited about making personalized fitness accessible to everyone.
            </p>
            
            <div className="glassmorphism rounded-xl p-8 md:p-12 max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-6 text-bodify-orange">Why Join Bodify?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Benefits</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Competitive salary & equity packages
                    </li>
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Comprehensive health, dental & vision coverage
                    </li>
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Flexible work arrangements
                    </li>
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Unlimited PTO policy
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Culture</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Fast-paced, innovative environment
                    </li>
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Collaborative team of fitness and tech experts
                    </li>
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Regular team wellness activities
                    </li>
                    <li className="flex items-start">
                      <span className="text-bodify-orange mr-2">•</span>
                      Remote-first philosophy
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-center">Open Positions</h2>
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className="glassmorphism rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="flex flex-col md:flex-row md:items-center mt-2 md:space-x-4 space-y-1 md:space-y-0 text-white/70">
                        <p>{job.department}</p>
                        <div className="hidden md:block w-1 h-1 bg-white/30 rounded-full"></div>
                        <p>{job.location}</p>
                        <div className="hidden md:block w-1 h-1 bg-white/30 rounded-full"></div>
                        <p>{job.type}</p>
                      </div>
                    </div>
                    <Button 
                      className="mt-4 md:mt-0 bg-bodify-gradient hover:opacity-90 transition-all"
                      onClick={() => window.open(`mailto:careers@bodify.ai?subject=Application for ${job.title}`, '_blank')}
                    >
                      Apply Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-white/70 mb-6">
                Don't see a position that matches your skills? We're always looking for talented individuals.
              </p>
              <Button
                className="bg-bodify-gradient hover:opacity-90 transition-all"
                onClick={() => window.open('mailto:careers@bodify.ai?subject=General Application', '_blank')}
              >
                Send General Application
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
