
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

// Mock user database with admin account
const mockUserDatabase = [
  { email: "test@example.com", password: "password123", isAdmin: false },
  { email: "user@bodify.com", password: "fitness2025", isAdmin: false },
  { email: "Abdullah", password: "Abdullah2008$hackerAA07whosalsaid", isAdmin: true },
];

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Check local users then mock database
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = [...storedUsers, ...mockUserDatabase].find(
      (u: any) => u.email === formData.email && u.password === formData.password
    );
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (user) {
        // Store user info in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          email: user.email,
          isAdmin: user.isAdmin,
          hasUnlimitedUsage: user.isAdmin
        }));

        if (user.isAdmin) {
          toast({
            title: "Admin login successful",
            description: "Welcome back, Administrator! You have unlimited usage."
          });
        } else {
          toast({
            title: "Login successful",
            description: "Welcome back to Bodify!"
          });
        }
        navigate('/dashboard');
      } else {
        // Failed authentication
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glassmorphism rounded-2xl p-8 border-0"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-white/70">Sign in to continue your fitness journey</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 h-12 rounded-xl focus:border-bodify-orange" 
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Link to="/forgot-password" className="text-bodify-orange text-sm hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50 h-12 rounded-xl focus:border-bodify-orange" 
                  />
                </div>
                
                <Button type="submit" className="btn-primary w-full h-12 text-lg rounded-xl" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-white/70">
                  Don't have an account? <Link to="/get-started" className="text-bodify-orange hover:underline font-medium">Get Started</Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
