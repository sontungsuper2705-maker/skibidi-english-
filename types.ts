
export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  DICTIONARY = 'DICTIONARY',
  FLASHCARDS = 'FLASHCARDS',
  SPEAKING = 'SPEAKING',
  BATTLE = 'BATTLE',
  PET = 'PET'
}

export interface UserStats {
  coins: number;
  streak: number;
  level: 'Gà Mờ' | 'Dân Chơi' | 'Trùm Cuối';
  xp: number;
}

export interface WordDefinition {
  word: string;
  phonetic: string;
  definition: string;
  slangMeaning: string;
  example: string;
  vietnameseMeaning: string;
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  imageUrl: string;
}
