import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Types of background elements to add more variety
type BackgroundElement = '❤️' | '💗' | '💕' | '💓' | '💘' | '💖' | '🌸' | '✨' | '🦋' | '💫';

const BackgroundHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<BackgroundElement[]>(['❤️', '💗', '💕', '💓', '💘', '💖']);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Random selection of background elements for this session (sometimes include extras)
    const extraElements: BackgroundElement[] = [];
    if (Math.random() > 0.5) extraElements.push('🌸');
    if (Math.random() > 0.7) extraElements.push('✨');
    if (Math.random() > 0.8) extraElements.push('🦋');
    if (Math.random() > 0.6) extraElements.push('💫');
    
    // Combine with base hearts, keeping at least 4 hearts
    const baseHearts: BackgroundElement[] = ['❤️', '💗', '💕', '💓'];
    const remainingHearts: BackgroundElement[] = ['💘', '💖'];
    
    // Randomly remove some remaining hearts if we have extra elements
    const selectedRemainingHearts = remainingHearts.filter(() => Math.random() > 0.3 || extraElements.length === 0);
    
    // Set the elements for this session
    setElements([...baseHearts, ...selectedRemainingHearts, ...extraElements]);
    
    // Initial creation of background elements
    createBackgroundElements(container, 25);
    
    // Create elements on mouse/touch move with trail effect
    let lastX = 0;
    let lastY = 0;
    let trail: {x: number, y: number}[] = [];
    
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      
      // Add to trail
      trail.push({x: clientX, y: clientY});
      
      // Limit trail length
      if (trail.length > 5) {
        trail.shift();
      }
      
      // Only create elements if moved enough to prevent spam
      const distance = Math.sqrt(Math.pow(clientX - lastX, 2) + Math.pow(clientY - lastY, 2));
      if (distance > 40) {
        createElementAtPosition(container, clientX, clientY);
        lastX = clientX;
        lastY = clientY;
      }
      
      // Create occasional elements along the trail
      if (Math.random() > 0.7 && trail.length > 2) {
        const trailPoint = trail[Math.floor(Math.random() * trail.length)];
        createElementAtPosition(container, trailPoint.x, trailPoint.y);
      }
    };
    
    // Add throttling to prevent too many elements
    let isThrottled = false;
    const throttledHandlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isThrottled) {
        isThrottled = true;
        handlePointerMove(e);
        setTimeout(() => { isThrottled = false; }, 100);
      }
    };
    
    document.addEventListener('mousemove', throttledHandlePointerMove);
    document.addEventListener('touchmove', throttledHandlePointerMove as EventListener);
    
    // Occasional bursts of elements
    const burstInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createElementBurst(container);
      }
    }, 4000);
    
    return () => {
      document.removeEventListener('mousemove', throttledHandlePointerMove);
      document.removeEventListener('touchmove', throttledHandlePointerMove as EventListener);
      clearInterval(burstInterval);
    };
  }, []);
  
  // Create a burst of elements from random position
  const createElementBurst = (container: HTMLDivElement) => {
    const burstX = Math.random() * window.innerWidth;
    const burstY = Math.random() * window.innerHeight;
    const burstCount = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        createElementAtPosition(container, burstX + offsetX, burstY + offsetY, true);
      }, i * 100);
    }
  };
  
  const createBackgroundElements = (container: HTMLDivElement, count: number) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const element = document.createElement('div');
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        element.style.position = 'absolute';
        element.style.fontSize = `${Math.random() * 1.5 + 0.8}rem`;
        element.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        element.style.pointerEvents = 'none';
        element.style.filter = 'blur(0.5px)';
        
        // Add subtle glow to some elements
        if (Math.random() > 0.7) {
          const color = ['255, 182, 193', '255, 105, 180', '147, 112, 219'][Math.floor(Math.random() * 3)];
          element.style.textShadow = `0 0 5px rgba(${color}, 0.7)`;
        }
        
        // Random position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        
        element.style.left = `${startX}px`;
        element.style.top = `${startY}px`;
        element.style.zIndex = '-1';
        
        container.appendChild(element);
        
        // Make it float up with slight horizontal movement
        setTimeout(() => {
          const duration = Math.random() * 15 + 20;
          const horizontalMovement = (Math.random() - 0.5) * 150;
          
          element.style.transition = `all ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
          element.style.transform = `translateY(-${window.innerHeight + 150}px) translateX(${horizontalMovement}px) rotate(${Math.random() * 360}deg)`;
          
          // Remove after animation
          setTimeout(() => {
            if (container.contains(element)) {
              container.removeChild(element);
              // Create a new element to replace it
              createBackgroundElements(container, 1);
            }
          }, duration * 1000);
        }, 100);
      }, i * 300); // Stagger the creation
    }
  };
  
  const createElementAtPosition = (container: HTMLDivElement, x: number, y: number, isBurst = false) => {
    const element = document.createElement('div');
    
    // Choose random element with hearts being most common
    const randomVal = Math.random();
    if (randomVal > 0.7) {
      element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
    } else {
      // Bias toward hearts for cursor trail
      element.innerHTML = ['❤️', '💗', '💕', '💓'][Math.floor(Math.random() * 4)];
    }
    
    element.style.position = 'absolute';
    element.style.fontSize = `${Math.random() * 1 + 1}rem`;
    element.style.opacity = isBurst ? '0.7' : '0.6';
    element.style.pointerEvents = 'none';
    element.style.zIndex = '1';
    
    // Add glow effect
    const colorIntensity = Math.floor(Math.random() * 40) + 60; // 60-100%
    element.style.filter = `drop-shadow(0 0 2px rgba(255, 105, 180, 0.${colorIntensity}))`;
    
    // Position at pointer
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    
    container.appendChild(element);
    
    // Animate
    setTimeout(() => {
      element.style.transition = 'all 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
      
      // Burst animations move outward, click animations move upward
      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(${0.5 + Math.random() * 0.5}) rotate(${Math.random() * 360}deg)`;
      } else {
        element.style.transform = `translateY(-${40 + Math.random() * 60}px) translateX(${(Math.random() - 0.5) * 40}px) scale(${0.5 + Math.random() * 0.3}) rotate(${Math.random() * 30 - 15}deg)`;
      }
      
      element.style.opacity = '0';
      
      setTimeout(() => {
        if (container.contains(element)) {
          container.removeChild(element);
        }
      }, 1500);
    }, 10);
  };
  
  return (
    <div 
      ref={containerRef}
      className="hearts-bg fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* This container will be filled with hearts dynamically */}
      {/* Initial decorative elements with framer-motion */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="text-2xl md:text-3xl fixed"
          style={{ 
            opacity: 0.15,
            filter: 'blur(0.5px)',
            textShadow: '0 0 8px rgba(255, 182, 193, 0.5)'
          }}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
          }}
          animate={{ 
            y: [null, -150, -300],
            opacity: [0.2, 0.15, 0],
            rotate: [0, Math.random() > 0.5 ? 180 : -180]
          }}
          transition={{ 
            duration: 20 + i * 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: i * 2
          }}
        >
          {elements[i % elements.length]}
        </motion.div>
      ))}
      
      {/* Ambient glowing particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="fixed rounded-full"
          style={{
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            background: `radial-gradient(circle, rgba(255,182,193,0.3) 0%, rgba(255,105,180,0) 70%)`,
            zIndex: -2
          }}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
          }}
          animate={{ 
            x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
            y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 30 + i * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 3
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundHearts;
