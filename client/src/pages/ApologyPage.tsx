import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from 'react-confetti';
import HeartButton from "@/components/HeartButton";
import BackgroundHearts from "@/components/BackgroundHearts";
import MessageDisplay from "@/components/MessageDisplay";
import { getRandomMessage } from "@/data/messages";

const ApologyPage = () => {
  const [message, setMessage] = useState("Click the heart to start our romantic journey... 💕");
  const [usedMessageIndices, setUsedMessageIndices] = useState<number[]>([]);
  const [isMessageChanging, setIsMessageChanging] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameStage, setGameStage] = useState(0);
  const [isShimmer, setIsShimmer] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Create audio element for sound effects
    audioRef.current = new Audio();
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playSound = (type: 'click' | 'levelUp') => {
    if (!audioRef.current) return;
    
    // Different sound effects based on action
    if (type === 'click') {
      audioRef.current.src = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRAAAAAAAAAAAAAAAAAAAAA=";
    } else {
      audioRef.current.src = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRAAAAAAAAAAAAAAAAAAAAA=";
    }
    
    audioRef.current.play().catch(() => {
      // Handle browser autoplay restrictions
      console.log("Audio play failed, likely due to browser autoplay restrictions");
    });
  };

  const handleHeartClick = () => {
    playSound('click');
    setIsMessageChanging(true);
    setIsShimmer(true);
    setHeartClicks(prev => prev + 1);
    
    // Show confetti every 5 clicks
    if ((heartClicks + 1) % 5 === 0) {
      setShowConfetti(true);
      playSound('levelUp');
      
      // Level up the game stage
      if (gameStage < 3) {
        setGameStage(prev => prev + 1);
      }
      
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    setTimeout(() => {
      const { message: newMessage, usedIndices } = getRandomMessage(usedMessageIndices);
      setMessage(newMessage);
      setUsedMessageIndices(usedIndices);
      setIsMessageChanging(false);
      
      setTimeout(() => setIsShimmer(false), 1000);
    }, 300);
  };

  // Game levels with increasing visual effects
  const getGameStageBg = () => {
    switch(gameStage) {
      case 0:
        return "bg-gradient-to-b from-purple-50 to-pink-50";
      case 1:
        return "bg-gradient-to-tr from-purple-100 via-pink-100 to-rose-50";
      case 2:
        return "bg-gradient-to-br from-purple-200 via-pink-100 to-rose-100";
      case 3:
        return "bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200";
      default:
        return "bg-gradient-to-b from-purple-50 to-pink-50";
    }
  };

  const getTitleByStage = () => {
    const titles = [
      "I messed up... but I love you more than code!",
      "Your love makes my heart overflow... I'm truly sorry!",
      "Every click sends my love to you... Please forgive me!",
      "You're the queen of my heart, forever and always..."
    ];
    return titles[gameStage];
  };

  // Progress bar to show game advancement
  const progressPercent = Math.min(100, (heartClicks / 20) * 100);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden ${getGameStageBg()}`}>
      {/* Confetti effect on milestone clicks */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
      
      <BackgroundHearts />
      
      {/* Love progress meter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-64 md:w-80">
        <div className="text-center mb-1 text-xs font-medium text-pink-700">Love-o-meter</div>
        <div className="w-full h-3 bg-white/40 rounded-full overflow-hidden shadow-inner fancy-border">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 shimmer"
            style={{ width: `${progressPercent}%`, transition: 'width 0.5s ease' }}
          ></div>
        </div>
      </div>
      
      {/* Game level indicator */}
      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((level) => (
            <div 
              key={level} 
              className={`w-3 h-3 rounded-full ${level <= gameStage ? 'bg-pink-500' : 'bg-pink-200'} 
                ${level === gameStage ? 'animate-pulse' : ''}`}
            />
          ))}
        </div>
      </div>
      
      {/* Main content card with glass effect */}
      <motion.main 
        className={`relative max-w-xl mx-auto text-center z-10 love-card ${isShimmer ? 'shimmer' : ''}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 text-pink-400 opacity-70 rotate-12 float-animation">❤️</div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 text-pink-400 opacity-70 -rotate-12 float-animation" style={{ animationDelay: '2s' }}>💝</div>
        
        {/* Name display with stylized text */}
        <div className="mb-6 mt-2">
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-dancing glow-text text-pink-600"
              animate={{ 
                y: [0, -10, 0],
                rotateZ: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Preetii baby
            </motion.h1>
            <div className="h-1 w-32 md:w-40 bg-gradient-to-r from-purple-300 to-pink-400 rounded-full mx-auto mt-1 opacity-80"></div>
          </motion.div>
        </div>
        
        {/* Main headline that changes with game stage */}
        <AnimatePresence mode="wait">
          <motion.h2 
            key={gameStage}
            className="text-2xl md:text-3xl mb-6 text-purple-700 font-dancing glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {getTitleByStage()}
          </motion.h2>
        </AnimatePresence>
        
        {/* Game instruction */}
        <div className="text-xs text-pink-700 mb-4 italic">
          Keep clicking to reveal all my feelings for you ❤️
        </div>
        
        {/* Message display area */}
        <MessageDisplay message={message} isChanging={isMessageChanging} />
        
        {/* Heart-shaped button */}
        <div className="relative mb-8 mx-auto" style={{ width: "120px", height: "120px" }}>
          <div className="heart-pulse">
            <HeartButton onClick={handleHeartClick} />
          </div>
          
          {/* Click counter */}
          <div className="absolute -right-2 -top-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-md">
            {heartClicks}
          </div>
        </div>
        
        {/* Milestone achievements */}
        {heartClicks >= 5 && (
          <div className="mb-4 text-sm text-pink-700">
            <div className="flex items-center justify-center gap-1">
              <span className="text-yellow-500">🏆</span> 
              First milestone unlocked: "Love at First Click"
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="mt-4 text-sm text-gray-600">
          <p className="font-dancing text-base">Made with too much love by Your Name</p>
          <p className="text-xs mt-1 italic">💖 Because you deserve all the love in the world 💖</p>
        </footer>
      </motion.main>
    </div>
  );
};

export default ApologyPage;
