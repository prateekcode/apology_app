import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface MessageDisplayProps {
  message: string;
  isChanging: boolean;
}

const MessageDisplay = ({ message, isChanging }: MessageDisplayProps) => {
  const [decorationClass, setDecorationClass] = useState("");
  const [sparkleElements, setSparkleElements] = useState<JSX.Element[]>([]);

  // Add random decorative elements when message changes
  useEffect(() => {
    if (!isChanging && message) {
      // Set random message styling
      const decorations = [
        "text-pink-600 font-dancing", 
        "text-purple-600 font-playfair italic",
        "text-rose-500 font-poppins font-medium", 
        "text-fuchsia-600 font-dancing"
      ];
      setDecorationClass(decorations[Math.floor(Math.random() * decorations.length)]);
      
      // Create sparkle elements
      createSparkles();
    }
  }, [message, isChanging]);

  const createSparkles = () => {
    const sparkles: JSX.Element[] = [];
    const count = Math.floor(Math.random() * 4) + 2; // 2-5 sparkles
    
    for (let i = 0; i < count; i++) {
      const delay = Math.random() * 2;
      const size = Math.random() * 8 + 4; // 4-12px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      sparkles.push(
        <motion.div
          key={`sparkle-${i}`}
          className="absolute pointer-events-none"
          style={{ left: `${left}%`, top: `${top}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 2,
            delay: delay,
            repeat: Math.random() > 0.5 ? 1 : 0,
            repeatDelay: Math.random() * 3
          }}
        >
          <div 
            className="text-yellow-400"
            style={{ fontSize: `${size}px` }}
          >
            ✨
          </div>
        </motion.div>
      );
    }
    
    setSparkleElements(sparkles);
  };

  return (
    <div className="message-container relative love-card p-5 mb-8 flex items-center justify-center min-h-[150px]">
      {/* Decorative corner elements */}
      <div className="absolute -top-2 -left-2 w-8 h-8 text-pink-300 rotate-45">❀</div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 text-pink-300 -rotate-45">❀</div>
      
      {/* Sparkle animations */}
      {sparkleElements}
      
      {/* Message content with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isChanging ? "changing" : message}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="z-10 text-center"
        >
          <motion.p
            className={`text-lg md:text-xl ${decorationClass} relative z-10`}
            animate={{ 
              y: [0, -2, 0, 2, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
          >
            {isChanging ? "" : message}
          </motion.p>
        </motion.div>
      </AnimatePresence>
      
      {/* Floating heart background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div 
            key={`floating-heart-${i}`}
            className="absolute text-pink-100 opacity-20 text-4xl"
            style={{ 
              left: `${15 + i * 30}%`, 
              top: `${20 + (i % 2) * 40}%`,
              zIndex: 1
            }}
            animate={{ 
              y: [0, -15, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0]
            }}
            transition={{ 
              duration: 6 + i * 2, 
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          >
            {['❤️', '💗', '💘'][i % 3]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MessageDisplay;
