
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Team = () => {
  const teamMembers = [
    {
      name: "Olivia Chen",
      role: "CEO & Co-Founder",
      bio: "Former Olympic athlete with a passion for making fitness accessible to everyone.",
      image: "https://picsum.photos/seed/olivia/200"
    },
    {
      name: "Marcus Johnson",
      role: "CTO & Co-Founder",
      bio: "AI specialist with 15+ years experience in machine learning and health tech.",
      image: "https://picsum.photos/seed/marcus/200"
    },
    {
      name: "Sarah Wilson",
      role: "Head of Fitness Science",
      bio: "PhD in Exercise Physiology and certified strength and conditioning specialist.",
      image: "https://picsum.photos/seed/sarah/200"
    },
    {
      name: "David Park",
      role: "Lead Nutrition Expert",
      bio: "Registered Dietitian with expertise in sports nutrition and metabolism.",
      image: "https://picsum.photos/seed/david/200"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Team</h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto mb-12">
              Meet the experts behind Bodify's revolutionary AI fitness platform. Our team combines expertise in fitness, nutrition, and cutting-edge technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className="glassmorphism rounded-xl p-6 text-center"
                >
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-bodify-orange mb-3">{member.role}</p>
                  <p className="text-white/70">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Team;
