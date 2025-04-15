
import React from "react";

interface NexusLogoProps {
  size?: number;
  className?: string;
}

const NexusLogo: React.FC<NexusLogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="22" fill="url(#paint0_linear)" />
        <path 
          d="M15 18C15 16.3431 16.3431 15 18 15H30C31.6569 15 33 16.3431 33 18V30C33 31.6569 31.6569 33 30 33H18C16.3431 33 15 31.6569 15 30V18Z" 
          fill="white" 
          fillOpacity="0.2"
        />
        <path 
          d="M19 23L24 28L29 23" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M24 28V18" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        <circle 
          cx="24" 
          cy="33" 
          r="1.5" 
          fill="white"
        />
        <defs>
          <linearGradient 
            id="paint0_linear" 
            x1="0" 
            y1="0" 
            x2="48" 
            y2="48" 
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default NexusLogo;
