
import React from 'react';

interface LogoProps {
  className?: string;
}

const BodifyLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="font-bold text-transparent bg-clip-text bg-bodify-gradient text-2xl">BODIFY</div>
    </div>
  );
};

export default BodifyLogo;
