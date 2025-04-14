// Message categories
const categories = {
  romantic: [
    "Every line of code I write, every function I debug, every project I complete - none of it compares to the joy of loving you, Preetii. I'm sorry. 💓",
    "My love for you has no bugs or syntax errors - it runs perfectly in an infinite loop. I'm truly sorry for messing up. 💝",
    "In the endless source code of life, your love is the most beautiful function. I'll always debug my mistakes for you. 💘",
    "Your eyes are like stars guiding me home in the darkness. I'm sorry I lost my way temporarily. 💫",
    "If love were a garden, I'd plant a forever-blooming rose for each day I want to spend with you - that's infinity. Please forgive me. 🌹",
    "Even with dark mode, my world is brightest when you're in it. I'm sorry for dimming our light. 💓",
    "If kisses were stars, I'd give you the entire galaxy. I'm truly sorry, my angel. ✨"
  ],
  sweet: [
    "If our love were a program, you'd be the main function - everything important happens because of you. Please forgive me. 💖",
    "You've stolen the admin access to my heart, Preetii baby. No security patch can ever keep you out. I'm so sorry. ❤️",
    "In the database of my heart, you're the only record that matters. I was wrong and I'm sorry. 💕",
    "My heart has a dedicated API just for you, with unlimited requests. I'm so sorry, Preetii baby. 💓",
    "You're like a song that gets sweeter with every listen. I'm sorry I missed a beat. 🎵",
    "If I had a flower for every time I thought of you, I'd have a garden blooming forever. Please forgive me. 🌷",
    "Your smile is the sunshine that makes my heart bloom. I'm sorry for causing clouds. 🌞"
  ],
  poetic: [
    "You're the algorithm that makes my world make sense. Without you, I'm just a bunch of confused loops. Please forgive me. 🌹",
    "If I had to choose between fixing all the bugs in my code instantly or spending one moment with you, I'd choose you every time. I'm sorry. 💘",
    "You're the most elegant solution to the complex equation of my life. I'm sorry I complicated things. 💞",
    "I'd debug a thousand error messages just to see your smile. Please forgive me. 💗",
    "Like a gentle wave caressing the shore, your love touches every part of my soul. I'm truly sorry for hurting you. 🌊",
    "In the symphony of my life, your laughter is the most beautiful melody. I'm sorry for bringing discord. 🎶",
    "The stars may guide ships at sea, but your love guides my heart home. Please forgive my detour. ⭐"
  ],
  playful: [
    "In the GitHub of love, I want to commit to you forever. I'm sorry for the merge conflict I caused. 💖",
    "Your love compiles perfectly in the IDE of my heart. I'm truly sorry. 💝",
    "You're not a regular expression in my life - you're the entire code that makes everything work. Please forgive me. 💕",
    "If our love were a website, you'd be both the beautiful frontend and the powerful backend. I'm sorry for the downtime. ❤️",
    "You're the chocolate to my cookie, the sprinkles to my donut, the love to my life. Sorry for being half-baked! 🍪",
    "If being cute was a crime, you'd be serving a life sentence. I'm the one who should be punished though! 😊",
    "You must be a magician because whenever I look at you, everyone else disappears. Sorry for my disappearing act. ✨"
  ],
  deep: [
    "When I'm with you, time stops and my heart races simultaneously. How is that possible? I'm truly sorry. 💗",
    "To love you is to know what the universe feels like when compressed into a single heartbeat. Please forgive me. 💫",
    "In the tapestry of my existence, your love is the golden thread that holds everything together. I'm sorry for loosening our bond. 🧵",
    "The depth of my love for you is like the ocean - vast, mysterious, and endless. I'm deeply sorry. 🌊",
    "If my heart could speak, it would recite endless poems about how much you mean to me. I'm truly sorry. 📝",
    "In the quiet moments between heartbeats, I find myself falling in love with you again and again. Please forgive me. 💖",
    "The universe conspired for millennia to bring us together. I'm sorry for taking that miracle for granted. ✨"
  ]
};

// Flatten all messages into a single array
const allMessages = Object.values(categories).flat();

// Function to get a random message that hasn't been used recently
export const getRandomMessage = (usedIndices: number[]) => {
  // Reset used indices if almost all messages have been used
  if (usedIndices.length >= allMessages.length - 5) {
    usedIndices = [];
  }
  
  // Find a random message that hasn't been used recently
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * allMessages.length);
  } while (usedIndices.includes(randomIndex));
  
  // Add to used indices
  const newUsedIndices = [...usedIndices, randomIndex];
  
  return {
    message: allMessages[randomIndex],
    usedIndices: newUsedIndices
  };
};
