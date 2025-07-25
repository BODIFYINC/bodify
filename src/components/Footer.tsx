import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import BodifyLogo from './BodifyLogo';

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.17-1.94-1.17-3.338h-3.097v13.317c0 2.345-1.902 4.25-4.25 4.25s-4.25-1.905-4.25-4.25 1.902-4.25 4.25-4.25c.468 0 .92.077 1.34.218V7.242a7.336 7.336 0 0 0-1.34-.126c-4.041 0-7.317 3.276-7.317 7.317s3.276 7.317 7.317 7.317 7.317-3.276 7.317-7.317V9.321a9.23 9.23 0 0 0 5.532 1.852V8.106a6.135 6.135 0 0 1-2.752-1.454c-.446-.37-.849-.79-1.17-1.242-.321-.451-.564-.949-.681-1.848z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="glassmorphism-dark py-20 mt-24 border-t-4 border-gradient-to-r from-[#ff8800] via-[#ffe066] via-30% via-[#4f8cff] via-60% via-[#ff5ecf] to-[#a259ff]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6 md:col-span-2">
            <BodifyLogo className="h-12 w-auto" />
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Transform your fitness journey with AI-powered personalized coaching that delivers real results.
            </p>
            <p className="text-white/80 text-lg leading-relaxed max-w-md">
              Bodify has been accepted into the Acceleration Program by <a href="https://www.fastercapital.com" target="_blank" rel="noreferrer" className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8800] via-[#ffe066] via-30% via-[#4f8cff] via-60% via-[#ff5ecf] to-[#a259ff] font-bold underline hover:opacity-80 transition-all">FasterCapital</a> and is currently raising $50,000.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/bodify.inc" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-[#232946] text-white hover:text-[#ff5ecf] hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:bg-clip-text hover:font-bold transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://tiktok.com/@bodify_inc" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-[#232946] text-white hover:text-[#ff5ecf] hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:bg-clip-text hover:font-bold transition-all">
                <TikTokIcon />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-xl mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:font-bold transition-all text-lg">About</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:font-bold transition-all text-lg">Careers</Link></li>
              <li><Link to="/team" className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:font-bold transition-all text-lg">Team</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-xl mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:font-bold transition-all text-lg">Contact Us</Link></li>
              <li><Link to="/faq" className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:font-bold transition-all text-lg">FAQ</Link></li>
              <li><Link to="/privacy" className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:font-bold transition-all text-lg">Privacy</Link></li>
              <li><Link to="/terms" className="text-white/80 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#ff8800] hover:via-[#ffe066] hover:via-30% hover:via-[#4f8cff] hover:via-60% hover:to-[#ff5ecf] hover:to-[#a259ff] hover:font-bold transition-all text-lg">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#232946] mt-16 pt-8 text-center text-white/60 text-lg">
          <p>&copy; {new Date().getFullYear()} Bodify Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
