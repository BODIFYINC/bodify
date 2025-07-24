import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BodifyLogo from '@/components/BodifyLogo';
import { sendVerificationEmail, generateVerificationCode } from '@/services/emailJSService';

const GetStarted = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userVerificationCode, setUserVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const handleNext = async () => {
  if (step === 1) {
    // Email validation
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Generate and send verification code
    const code = generateVerificationCode();
    setVerificationCode(code);
    
    console.log("Attempting to send verification email...");
    const emailSent = await sendVerificationEmail(email, code);
    
    if (emailSent) {
      setStep(2);
      toast({
        title: "Verification Code Sent!",
        description: "Please check your email for the 6-digit verification code."
      });
    } else {
      toast({
        title: "Email Sending Failed",
        description: "We couldn't send the verification email. Please try again or contact support.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  } else if (step === 2) {
    // Verify code
    if (userVerificationCode !== verificationCode) {
      toast({
        title: "Invalid Code",
        description: "The verification code you entered is incorrect. Please try again.",
        variant: "destructive"
      });
      return;
    }
    setStep(3);
  } else if (step === 3) {
    // Password validation
    if (!password || password.length < 8) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }
    setStep(4);
  } else if (step === 4) {
    // Profile completion
    if (!name || !age || !height || !weight || !goal) {
      toast({
        title: "Incomplete Profile",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Save user data
    const userData = {
      email,
      name,
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      goal,
      isAdmin: email === 'bodify.inc@gmail.com'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('userSettings', JSON.stringify({
      ...userData,
      daysPerWeek: 3,
      fitnessLevel: 'beginner',
      dietaryRestrictions: '',
      dislikedFoods: '',
      allergies: ''
    }));
    
    toast({
      title: "Account Created Successfully!",
      description: "Welcome to Bodify! Let's start your fitness journey."
    });
    
    navigate('/dashboard');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12 max-w-lg"
      >
        <Card className="glassmorphism border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <BodifyLogo className="h-12 mx-auto mb-4" />
              <h1 className="text-3xl font-bold">Get Started</h1>
              <p className="text-white/70">Join our fitness community</p>
            </div>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Label htmlFor="email" className="block text-white mb-2">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/30 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Label htmlFor="verificationCode" className="block text-white mb-2">Verification Code</Label>
                <Input
                  type="text"
                  id="verificationCode"
                  placeholder="Enter verification code"
                  className="bg-white/10 border-white/30 text-white"
                  value={userVerificationCode}
                  onChange={(e) => setUserVerificationCode(e.target.value)}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Label htmlFor="password" className="block text-white mb-2">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="bg-white/10 border-white/30 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Label htmlFor="name" className="block text-white mb-2">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="bg-white/10 border-white/30 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="age" className="block text-white mb-2">Age</Label>
                    <Input
                      type="number"
                      id="age"
                      placeholder="Enter your age"
                      className="bg-white/10 border-white/30 text-white"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="block text-white mb-2">Height (cm)</Label>
                    <Input
                      type="number"
                      id="height"
                      placeholder="Enter your height"
                      className="bg-white/10 border-white/30 text-white"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>

                <Label htmlFor="weight" className="block text-white mb-2 mt-4">Weight (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  placeholder="Enter your weight"
                  className="bg-white/10 border-white/30 text-white"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />

                <Label className="block text-white mb-2 mt-4">Fitness Goal</Label>
                <Select onValueChange={setGoal}>
                  <SelectTrigger className="bg-white/10 border-white/30 text-white w-full">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-bodify-darker text-white">
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="general_fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            <Button
              className="w-full mt-8 bg-bodify-gradient hover:opacity-90 transition-all"
              onClick={handleNext}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : step === 4 ? 'Create Account' : 'Next'}
            </Button>

            <div className="text-center mt-6">
              <button onClick={() => navigate('/login')} className="text-white/70 hover:text-white transition-colors">
                Already have an account? Login
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GetStarted;
