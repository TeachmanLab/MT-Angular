
export interface Intro {
  title: string;
  page: Page;
}

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
}

export interface Page {
  divs: Div[];
}

export interface Div {
  header?: string;
  text?: string[];
  image?: string[];
  footer?: string[];
  references?: string[];
  highlights: Highlight[];
  thoughtBubbles?: ThoughtBubble[];
  questions?: Question[];
  scenarios?: Scenario[];
}

export interface Training {
  scenarios: Scenario[];
}

export interface Scenario {
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

export interface Question {
  question: string;
  type: string;
  options: string[];
  answer?: string;
  explanation?: string;
}

export interface ThoughtBubble {
  color: string;
  header: string;
  thought: string;
  followup: string;
}

export interface Highlight {
  color: string;
  header: string;
  highlight: string;
  icon: string;
}






