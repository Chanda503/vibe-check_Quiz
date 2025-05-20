
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  vibeValues: {
    chill: number;
    chaotic: number;
    creative: number;
    analytical: number;
  }[];
}

export interface VibeResult {
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "It's Friday night. What are you most likely doing?",
    options: [
      "Netflix and takeout",
      "Spontaneous road trip",
      "Working on a passion project",
      "Planning next week's schedule"
    ],
    vibeValues: [
      { chill: 10, chaotic: 0, creative: 2, analytical: 0 },
      { chill: 0, chaotic: 10, creative: 5, analytical: 0 },
      { chill: 2, chaotic: 2, creative: 10, analytical: 5 },
      { chill: 5, chaotic: 0, creative: 0, analytical: 10 }
    ]
  },
  {
    id: 2,
    question: "Which app do you check first in the morning?",
    options: [
      "Social media for memes",
      "Weather and news",
      "Spotify or music app",
      "Email or calendar"
    ],
    vibeValues: [
      { chill: 5, chaotic: 8, creative: 5, analytical: 0 },
      { chill: 2, chaotic: 0, creative: 0, analytical: 10 },
      { chill: 8, chaotic: 3, creative: 8, analytical: 0 },
      { chill: 0, chaotic: 2, creative: 0, analytical: 10 }
    ]
  },
  {
    id: 3,
    question: "Someone disagrees with you. Your first reaction is to:",
    options: [
      "Let it go, not worth the stress",
      "Debate passionately",
      "Consider their perspective and find middle ground",
      "Research facts to prove your point"
    ],
    vibeValues: [
      { chill: 10, chaotic: 0, creative: 2, analytical: 0 },
      { chill: 0, chaotic: 10, creative: 2, analytical: 5 },
      { chill: 5, chaotic: 0, creative: 8, analytical: 5 },
      { chill: 2, chaotic: 2, creative: 0, analytical: 10 }
    ]
  },
  {
    id: 4,
    question: "Your workspace is typically:",
    options: [
      "Minimal and cozy",
      "Chaotic but I know where everything is",
      "Filled with inspiration and art",
      "Perfectly organized and efficient"
    ],
    vibeValues: [
      { chill: 10, chaotic: 0, creative: 2, analytical: 5 },
      { chill: 0, chaotic: 10, creative: 5, analytical: 0 },
      { chill: 3, chaotic: 5, creative: 10, analytical: 0 },
      { chill: 2, chaotic: 0, creative: 2, analytical: 10 }
    ]
  },
  {
    id: 5,
    question: "When making decisions, you typically:",
    options: [
      "Go with what feels right",
      "Choose the most exciting option",
      "Consider all possibilities, even unusual ones",
      "Analyze pros and cons methodically"
    ],
    vibeValues: [
      { chill: 8, chaotic: 2, creative: 3, analytical: 0 },
      { chill: 0, chaotic: 10, creative: 5, analytical: 0 },
      { chill: 2, chaotic: 5, creative: 10, analytical: 2 },
      { chill: 3, chaotic: 0, creative: 0, analytical: 10 }
    ]
  }
];

export const vibeResults: Record<string, VibeResult> = {
  chill: {
    title: "Chill Vibe",
    description: "You're laid-back and easy-going. Your calm energy helps others relax around you. You take life as it comes and don't sweat the small stuff.",
    emoji: "😌",
    color: "bg-blue-500"
  },
  chaotic: {
    title: "Chaotic Vibe",
    description: "You're spontaneous and full of surprises! You bring excitement and unpredictability wherever you go. Life is never boring with you around.",
    emoji: "🤪",
    color: "bg-purple-500"
  },
  creative: {
    title: "Creative Vibe",
    description: "You see the world through a unique lens. Your imagination and innovative thinking help you find solutions others miss.",
    emoji: "🎨",
    color: "bg-pink-500"
  },
  analytical: {
    title: "Analytical Vibe",
    description: "You approach life with logic and precision. Your thoughtful analysis and attention to detail make you a reliable problem solver.",
    emoji: "🧠",
    color: "bg-green-500"
  }
};

export const calculateVibe = (answers: number[]): string => {
  let totals = { chill: 0, chaotic: 0, creative: 0, analytical: 0 };
  
  quizQuestions.forEach((q, index) => {
    if (answers[index] !== undefined) {
      const selectedOption = answers[index];
      const values = q.vibeValues[selectedOption];
      
      totals.chill += values.chill;
      totals.chaotic += values.chaotic;
      totals.creative += values.creative;
      totals.analytical += values.analytical;
    }
  });
  
  // Find the highest score
  let highestVibe = "chill";
  let highestScore = totals.chill;
  
  if (totals.chaotic > highestScore) {
    highestVibe = "chaotic";
    highestScore = totals.chaotic;
  }
  if (totals.creative > highestScore) {
    highestVibe = "creative";
    highestScore = totals.creative;
  }
  if (totals.analytical > highestScore) {
    highestVibe = "analytical";
    highestScore = totals.analytical;
  }
  
  return highestVibe;
};
