import { GradeLevel, MathOperator, MathProblem } from '../types/game';

const UNDERWATER_STORIES: Record<string, string[]> = {
  '+': [
    'A curious clownfish gathered {n1} shiny pearls and found {n2} more in a sea shell!',
    'A green sea turtle swims with {n1} jellyfish, then {n2} more glide over.',
    'The submarine radar spotted {n1} yellow corals and {n2} pink sea fans.',
    '{n1} starfish are resting on the reef. {n2} more starfish float down!',
  ],
  '-': [
    'There were {n1} shiny pearls inside the clam. A hermit crab borrowed {n2}. How many remain?',
    '{n1} baby octopuses were playing tag. {n2} hid behind the coral rock. How many are still out?',
    'A school of {n1} lanternfish was glowing. {n2} swam deeper into the abyss. How many stayed?',
    '{n1} sea urchins were clinging to the wall. {n2} rolled into the soft sand.',
  ],
  '×': [
    'There are {n1} coral clusters, and each cluster has {n2} glowing polyps!',
    'A pod of {n1} dolphins each performs {n2} joyful spins above the reef crest.',
    'A squid has {n1} treasure pouches, each carrying {n2} golden doubloons.',
    '{n1} sea anemones each hold {n2} clownfish eggs safely inside.',
  ],
  '÷': [
    '{n1} shiny sea crystals are shared equally among {n2} friendly seahorses. How many does each get?',
    'A school of {n1} shrimp forms {n2} equal protective rings. How many shrimp in each ring?',
    '{n1} bioluminescent sparkles are split between {n2} anglerfish lures.',
    '{n1} pearls were discovered and divided equally into {n2} treasure bags.',
  ],
};

const VISUAL_TYPES: Array<'pearl' | 'starfish' | 'shell' | 'jelly'> = ['pearl', 'starfish', 'shell', 'jelly'];

export function generateMathProblem(
  level: GradeLevel = 'early_elementary',
  customOperators: MathOperator[] = ['+', '-'],
  customMax: number = 20
): MathProblem {
  let operator: MathOperator = '+';
  let num1 = 1;
  let num2 = 1;
  let answer = 2;

  if (level === 'kindergarten') {
    // Basic counting and operations 1 - 10
    operator = Math.random() > 0.6 ? '-' : '+';
    if (operator === '+') {
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 6) + 3; // 3 to 8
      num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1
      answer = num1 - num2;
    }
  } else if (level === 'early_elementary') {
    // Numbers 1 - 20 (or up to 30)
    const ops: MathOperator[] = ['+', '-', '+'];
    operator = ops[Math.floor(Math.random() * ops.length)];
    if (operator === '+') {
      num1 = Math.floor(Math.random() * 12) + 2;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 15) + 5;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;
    }
  } else if (level === 'advanced_math') {
    // Multiplication & Division & Two-digit addition/subtraction
    const ops: MathOperator[] = ['×', '÷', '+', '×'];
    operator = ops[Math.floor(Math.random() * ops.length)];

    if (operator === '×') {
      num1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
      num2 = Math.floor(Math.random() * 9) + 2; // 2 to 10
      answer = num1 * num2;
    } else if (operator === '÷') {
      num2 = Math.floor(Math.random() * 7) + 2; // divisor 2 to 8
      answer = Math.floor(Math.random() * 8) + 2; // quotient 2 to 9
      num1 = num2 * answer; // dividend
    } else {
      num1 = Math.floor(Math.random() * 25) + 10;
      num2 = Math.floor(Math.random() * 20) + 5;
      answer = num1 + num2;
    }
  } else {
    // Custom
    operator = customOperators[Math.floor(Math.random() * customOperators.length)] || '+';
    if (operator === '+') {
      num1 = Math.floor(Math.random() * (customMax / 2)) + 1;
      num2 = Math.floor(Math.random() * (customMax / 2)) + 1;
      answer = num1 + num2;
    } else if (operator === '-') {
      num1 = Math.floor(Math.random() * customMax) + 2;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    } else if (operator === '×') {
      num1 = Math.floor(Math.random() * 9) + 2;
      num2 = Math.floor(Math.random() * 8) + 2;
      answer = num1 * num2;
    } else {
      num2 = Math.floor(Math.random() * 6) + 2;
      answer = Math.floor(Math.random() * 6) + 2;
      num1 = num2 * answer;
    }
  }

  // Generate 4 distinct options including the correct answer
  const optionsSet = new Set<number>([answer]);
  const offsets = [-2, -1, 1, 2, 3, -3, 4, -4, 5, 10];
  let tries = 0;

  while (optionsSet.size < 4 && tries < 30) {
    tries++;
    const offset = offsets[Math.floor(Math.random() * offsets.length)];
    const candidate = answer + offset;
    if (candidate >= 0 && candidate !== answer) {
      optionsSet.add(candidate);
    }
  }

  // If still less than 4, fill randomly
  while (optionsSet.size < 4) {
    optionsSet.add(Math.max(0, answer + optionsSet.size + 1));
  }

  // Shuffle options
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  // Story template
  const storyList = UNDERWATER_STORIES[operator] || UNDERWATER_STORIES['+'];
  const rawStory = storyList[Math.floor(Math.random() * storyList.length)];
  const storyContext = rawStory.replace('{n1}', num1.toString()).replace('{n2}', num2.toString());

  // Visual type
  const visualType = VISUAL_TYPES[Math.floor(Math.random() * VISUAL_TYPES.length)];

  // Hint
  let hint = '';
  if (operator === '+') {
    hint = `Start with ${num1} and count forward ${num2} steps.`;
  } else if (operator === '-') {
    hint = `Take away ${num2} from ${num1}. How many remain?`;
  } else if (operator === '×') {
    hint = `Think of ${num1} equal groups, with ${num2} in each group.`;
  } else {
    hint = `How many times can you fit ${num2} into ${num1}?`;
  }

  return {
    id: `prob_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    num1,
    num2,
    operator,
    answer,
    options,
    hint,
    storyContext,
    visualCount1: Math.min(num1, 20),
    visualCount2: Math.min(num2, 20),
    visualType,
  };
}
