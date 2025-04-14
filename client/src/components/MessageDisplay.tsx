import { motion, AnimatePresence } from "framer-motion";

interface MessageDisplayProps {
  message: string;
  isChanging: boolean;
}

const MessageDisplay = ({ message, isChanging }: MessageDisplayProps) => {
  return (
    <div className="message-container bg-white/70 rounded-lg p-4 mb-8 flex items-center justify-center min-h-[120px]">
      <AnimatePresence mode="wait">
        <motion.p
          key={isChanging ? "changing" : message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-gray-700 italic"
        >
          {isChanging ? "" : message}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default MessageDisplay;
