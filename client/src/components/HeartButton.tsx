import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeartButtonProps {
  onClick: () => void;
}

const HeartButton = ({ onClick }: HeartButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    // Create a pulsing glow effect
    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => (prev + 0.1) % 1);
    }, 50);

    return () => clearInterval(glowInterval);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    
    // Create mini floating hearts around the button on click
    createFloatingHearts();
    
    // Reset the clicked state after animation
    setTimeout(() => setIsClicked(false), 300);
  };

  const createFloatingHearts = () => {
    const heartContainer = document.getElementById('heart-button-container');
    if (!heartContainer) return;
    
    const buttonRect = heartContainer.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = ['❤️', '💗', '💕', '💓', '💘', '💖', '💞', '💟'][Math.floor(Math.random() * 8)];
      heart.style.position = 'absolute';
      heart.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
      heart.style.opacity = '0';
      heart.style.zIndex = '50';
      heart.style.pointerEvents = 'none';
      heart.style.filter = 'drop-shadow(0 0 2px rgba(255,255,255,0.7))';
      
      // Random position around the button
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 60;
      const startX = buttonRect.width / 2 + Math.cos(angle) * distance;
      const startY = buttonRect.height / 2 + Math.sin(angle) * distance;
      
      heart.style.left = `${startX}px`;
      heart.style.top = `${startY}px`;
      
      heartContainer.appendChild(heart);
      
      // Animate the hearts
      setTimeout(() => {
        heart.style.transition = 'all 2s cubic-bezier(0.165, 0.84, 0.44, 1)';
        heart.style.transform = `translateY(-${100 + Math.random() * 50}px) translateX(${Math.random() * 60 - 30}px) rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6})`;
        heart.style.opacity = '1';
        
        setTimeout(() => {
          heart.style.opacity = '0';
          setTimeout(() => {
            if (heartContainer.contains(heart)) {
              heartContainer.removeChild(heart);
            }
          }, 500);
        }, 1500);
      }, Math.random() * 300);
    }
  };

  // Calculate a color gradient based on hover state and glow intensity
  const getHeartColor = () => {
    if (isHovered) {
      return `rgba(255, ${70 + Math.floor(glowIntensity * 30)}, ${160 + Math.floor(glowIntensity * 40)}, 1)`;
    }
    return `rgba(255, ${90 + Math.floor(glowIntensity * 20)}, ${180 - Math.floor(glowIntensity * 20)}, 1)`;
  };

  // Calculate glow effect
  const getGlowShadow = () => {
    const intensity = isHovered ? 0.3 + glowIntensity * 0.5 : 0.1 + glowIntensity * 0.2;
    return `0 0 ${7 + glowIntensity * 15}px ${intensity * 10}px rgba(255, 105, 180, ${intensity})`;
  };

  return (
    <div id="heart-button-container" className="relative w-full h-full">
      <motion.button
        className={`heart-btn focus:outline-none transition-all duration-300 ${isClicked ? 'scale-95' : 'scale-100'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          backgroundColor: getHeartColor(),
          display: 'inline-block',
          height: '100px',
          position: 'relative',
          transform: 'rotate(-45deg)',
          width: '100px',
          borderRadius: '0',
          border: 'none',
          cursor: 'pointer',
          boxShadow: getGlowShadow(),
          filter: `brightness(${1 + glowIntensity * 0.15})`,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <span 
          className="heart-btn-text text-white font-bold text-sm select-none font-dancing"
          style={{
            position: 'relative',
            zIndex: 10,
            transform: 'rotate(45deg)',
            top: 32,
            left: -10,
            display: 'block',
            width: '100%',
            textAlign: 'center',
            fontSize: '1.1rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            letterSpacing: '0.5px'
          }}
        >
          Make Me<br/>Blush
        </span>
        
        {/* Pseudo-elements created with additional divs */}
        <div 
          style={{
            content: "",
            backgroundColor: getHeartColor(),
            borderRadius: '50%',
            height: '100px',
            position: 'absolute',
            width: '100px',
            top: '-50px',
            left: 0,
            transition: 'all 0.3s',
            filter: `brightness(${1 + glowIntensity * 0.1})`,
          }}
        />
        <div 
          style={{
            content: "",
            backgroundColor: getHeartColor(),
            borderRadius: '50%',
            height: '100px',
            position: 'absolute',
            width: '100px',
            left: '50px',
            top: 0,
            transition: 'all 0.3s',
            filter: `brightness(${1 + glowIntensity * 0.1})`,
          }}
        />
        
        {/* Inner highlight effect */}
        <div 
          style={{
            content: "",
            position: 'absolute',
            top: '5px',
            left: '5px',
            right: '5px',
            bottom: '5px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            transform: 'rotate(0deg)',
            zIndex: 5,
            opacity: isHovered ? 0.3 : 0.15,
            transition: 'opacity 0.3s'
          }}
        />
      </motion.button>
      
      {/* Particle effects around button when hovered */}
      {isHovered && (
        <div className="absolute inset-0 -z-10">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-pink-200 opacity-40"
              initial={{ scale: 0.2, opacity: 0, x: 50, y: 50 }}
              animate={{ 
                scale: [0.2, 0.8, 0.2],
                opacity: [0, 0.7, 0],
                x: [50, 50 + Math.cos(i * Math.PI * 2/3) * 70],
                y: [50, 50 + Math.sin(i * Math.PI * 2/3) * 70]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeartButton;
