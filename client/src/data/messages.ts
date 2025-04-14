// Collection of romantic apology messages
const messages = [
  "Every line of code I write, every function I debug, every project I complete - none of it compares to the joy of loving you, Preetii. I'm sorry. 💓",
  "My love for you has no bugs or syntax errors - it runs perfectly in an infinite loop. I'm truly sorry for messing up. 💝",
  "If our love were a program, you'd be the main function - everything important happens because of you. Please forgive me. 💖",
  "You've stolen the admin access to my heart, Preetii baby. No security patch can ever keep you out. I'm so sorry. ❤️",
  "In the database of my heart, you're the only record that matters. I was wrong and I'm sorry. 💕",
  "You're the algorithm that makes my world make sense. Without you, I'm just a bunch of confused loops. Please forgive me. 🌹",
  "If I had to choose between fixing all the bugs in my code instantly or spending one moment with you, I'd choose you every time. I'm sorry. 💘",
  "You're the most elegant solution to the complex equation of my life. I'm sorry I complicated things. 💞",
  "My heart has a dedicated API just for you, with unlimited requests. I'm so sorry, Preetii baby. 💓",
  "I'd debug a thousand error messages just to see your smile. Please forgive me. 💗",
  "In the GitHub of love, I want to commit to you forever. I'm sorry for the merge conflict I caused. 💖",
  "Your love compiles perfectly in the IDE of my heart. I'm truly sorry. 💝",
  "Even with dark mode, my world is brightest when you're in it. I'm sorry for dimming our light. 💓",
  "You're not a regular expression in my life - you're the entire code that makes everything work. Please forgive me. 💕",
  "If our love were a website, you'd be both the beautiful frontend and the powerful backend. I'm sorry for the downtime. ❤️"
];

export const getRandomMessage = (usedIndices: number[]) => {
  // Reset used indices if almost all messages have been used
  if (usedIndices.length >= messages.length - 1) {
    usedIndices = [];
  }
  
  // Find a random message that hasn't been used recently
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * messages.length);
  } while (usedIndices.includes(randomIndex));
  
  // Add to used indices
  const newUsedIndices = [...usedIndices, randomIndex];
  
  return {
    message: messages[randomIndex],
    usedIndices: newUsedIndices
  };
};
