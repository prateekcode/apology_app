import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import HeartButton from "@/components/HeartButton";
import BackgroundHearts from "@/components/BackgroundHearts";
import MessageDisplay from "@/components/MessageDisplay";
import { getRandomMessage } from "@/data/messages";

const ApologyPage = () => {
  const [message, setMessage] = useState("Click the heart to see how much I adore you... 💕");
  const [usedMessageIndices, setUsedMessageIndices] = useState<number[]>([]);
  const [isMessageChanging, setIsMessageChanging] = useState(false);

  const handleHeartClick = () => {
    setIsMessageChanging(true);
    
    setTimeout(() => {
      const { message: newMessage, usedIndices } = getRandomMessage(usedMessageIndices);
      setMessage(newMessage);
      setUsedMessageIndices(usedIndices);
      setIsMessageChanging(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      <BackgroundHearts />
      
      <main className="max-w-xl mx-auto text-center z-10 bg-white/40 backdrop-blur-sm p-6 md:p-10 rounded-2xl shadow-lg">
        {/* Name display with stylized text */}
        <div className="mb-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-dancing text-pink-600"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            Preetii baby
          </motion.h1>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-purple-200 to-pink-300 rounded-full mx-auto mt-1"></div>
        </div>
        
        {/* Main headline */}
        <motion.h2 
          className="text-2xl md:text-3xl mb-6 text-purple-600 font-dancing"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          I messed up... but I love you more than code!
        </motion.h2>
        
        {/* Message display area */}
        <MessageDisplay message={message} isChanging={isMessageChanging} />
        
        {/* Heart-shaped button */}
        <div className="relative mb-10 mx-auto" style={{ width: "100px", height: "100px" }}>
          <HeartButton onClick={handleHeartClick} />
        </div>
        
        {/* Footer */}
        <footer className="mt-auto text-sm text-gray-600">
          <p>Made with too much love by Your Name</p>
          <p className="text-xs mt-1">💖 Because you deserve all the love in the world 💖</p>
        </footer>
      </main>
    </div>
  );
};

export default ApologyPage;
