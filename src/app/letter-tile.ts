
export interface LetterTile {
  letter: string;
  letterDisplayed: string;
  state: string;
}

export enum LetterTileState {
  Blank = 'blank',
  Provided = 'provided',
  MissingActive = 'missingActive',
  MissingInactive = 'missingInactive',
  Correct = 'correct',
  Incorrect = 'incorrect',
}

