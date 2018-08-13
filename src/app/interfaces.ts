
export interface Session {
  title: string;
  sessionIndicator: string;
  allSteps: string;
  description: string[];
  steps: Step[];
}

export interface Step {
  title: string;
  stepIndicator: string;
  pages: Page[];
  status?: string;
}

export interface Page {
  elements: Element[];
}

export interface Element {
  type: string;
  content?: string;
}

export interface Scenario extends Element {
  type: 'Scenario';
  title: String;
  image: string;
  statement: string;
  missingLetter?: MissingLetter;
  question?: Question;
  status?: string; // So it can be used in progress component as a progress item.
}
export interface MissingLetter {
  word: string;
}


export interface Question extends Element {
  type: 'Question';
  question: string;
  options: string[];
  answer?: string;
  explanation?: string;
}

export interface ThoughtBubble extends Element {
  type: 'ThoughtBubble';
  color: string;
  header: string;
  thought: string;
  followup: string;
}

export interface Highlight extends Element {
  type: 'Highlight';
  color: string;
  header: string;
  highlight: string;
  icon: string;
}

export interface BulletList extends Element {
  type: 'BulletList';
  title: string;
  bullets: string[];
}




