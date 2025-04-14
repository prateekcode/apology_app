import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BackgroundHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Initial creation of background hearts
    createBackgroundHearts(container, 20);
    
    // Create hearts on mouse/touch move
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      
      createHeartAtPosition(container, clientX, clientY);
    };
    
    // Add throttling to prevent too many hearts
    let isThrottled = false;
    const throttledHandlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isThrottled) {
        isThrottled = true;
        handlePointerMove(e);
        setTimeout(() => { isThrottled = false; }, 150);
      }
    };
    
    document.addEventListener('mousemove', throttledHandlePointerMove);
    document.addEventListener('touchmove', throttledHandlePointerMove as EventListener);
    
    return () => {
      document.removeEventListener('mousemove', throttledHandlePointerMove);
      document.removeEventListener('touchmove', throttledHandlePointerMove as EventListener);
    };
  }, []);
  
  const createBackgroundHearts = (container: HTMLDivElement, count: number) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        const heartEmojis = ['❤️', '💗', '💕', '💓', '💘', '💖'];
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
        heart.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        heart.style.pointerEvents = 'none';
        
        // Random position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
        heart.style.zIndex = '-1';
        
        container.appendChild(heart);
        
        // Make it float up
        setTimeout(() => {
          heart.style.transition = `all ${Math.random() * 10 + 20}s linear`;
          heart.style.transform = `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
          
          // Remove after animation
          setTimeout(() => {
            if (container.contains(heart)) {
              container.removeChild(heart);
              // Create a new heart to replace it
              createBackgroundHearts(container, 1);
            }
          }, (Math.random() * 10 + 20) * 1000);
        }, 100);
      }, i * 500); // Stagger the creation
    }
  };
  
  const createHeartAtPosition = (container: HTMLDivElement, x: number, y: number) => {
    const heart = document.createElement('div');
    heart.innerHTML = ['❤️', '💗', '💕'][Math.floor(Math.random() * 3)];
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.25rem';
    heart.style.opacity = '0.6';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1';
    
    // Position at pointer
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    container.appendChild(heart);
    
    // Animate
    setTimeout(() => {
      heart.style.transition = 'all 1s ease-out';
      heart.style.transform = 'translateY(-40px) scale(0.5)';
      heart.style.opacity = '0';
      
      setTimeout(() => {
        if (container.contains(heart)) {
          container.removeChild(heart);
        }
      }, 1000);
    }, 10);
  };
  
  return (
    <div 
      ref={containerRef}
      className="hearts-bg fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* This container will be filled with hearts dynamically */}
      {/* Initial decorative hearts with framer-motion */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="text-2xl md:text-3xl text-pink-300 opacity-20 fixed"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{ 
            y: [null, -100, -200],
            opacity: [0.2, 0.1, 0]
          }}
          transition={{ 
            duration: 15 + i * 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: i * 2
          }}
        >
          {['❤️', '💗', '💕', '💓', '💘', '💖'][i % 6]}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundHearts;
