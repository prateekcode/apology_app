import { motion } from "framer-motion";
import { useState } from "react";

interface HeartButtonProps {
  onClick: () => void;
}

const HeartButton = ({ onClick }: HeartButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
    
    for (let i = 0; i < 6; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = ['❤️', '💗', '💕', '💓', '💘', '💖'][Math.floor(Math.random() * 6)];
      heart.style.position = 'absolute';
      heart.style.fontSize = `${Math.random() * 1 + 1}rem`;
      heart.style.opacity = '0';
      heart.style.zIndex = '50';
      heart.style.pointerEvents = 'none';
      
      // Random position around the button
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 50;
      const startX = buttonRect.width / 2 + Math.cos(angle) * distance;
      const startY = buttonRect.height / 2 + Math.sin(angle) * distance;
      
      heart.style.left = `${startX}px`;
      heart.style.top = `${startY}px`;
      
      heartContainer.appendChild(heart);
      
      // Animate the hearts
      setTimeout(() => {
        heart.style.transition = 'all 1.5s ease-out';
        heart.style.transform = `translateY(-100px) translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '1';
        
        setTimeout(() => {
          heart.style.opacity = '0';
          setTimeout(() => {
            if (heartContainer.contains(heart)) {
              heartContainer.removeChild(heart);
            }
          }, 500);
        }, 1000);
      }, Math.random() * 200);
    }
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
          backgroundColor: isHovered ? '#ff5aa7' : '#ff69b4',
          display: 'inline-block',
          height: '80px',
          position: 'relative',
          transform: 'rotate(-45deg)',
          width: '80px',
          borderRadius: '0',
          border: 'none',
          cursor: 'pointer',
          boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
      >
        <span 
          className="heart-btn-text text-white font-bold text-sm select-none"
          style={{
            position: 'relative',
            zIndex: 10,
            transform: 'rotate(45deg)',
            top: 22,
            left: -5,
            display: 'block',
            width: '100%',
            textAlign: 'center'
          }}
        >
          Make Me<br/>Blush
        </span>
        
        {/* Pseudo-elements created with additional divs */}
        <div 
          style={{
            content: "",
            backgroundColor: isHovered ? '#ff5aa7' : '#ff69b4',
            borderRadius: '50%',
            height: '80px',
            position: 'absolute',
            width: '80px',
            top: '-40px',
            left: 0,
            transition: 'background-color 0.3s'
          }}
        />
        <div 
          style={{
            content: "",
            backgroundColor: isHovered ? '#ff5aa7' : '#ff69b4',
            borderRadius: '50%',
            height: '80px',
            position: 'absolute',
            width: '80px',
            left: '40px',
            top: 0,
            transition: 'background-color 0.3s'
          }}
        />
      </motion.button>
    </div>
  );
};

export default HeartButton;
