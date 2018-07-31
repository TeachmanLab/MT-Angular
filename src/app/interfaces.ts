export interface Intro {
  title: String;
  markdown: string[];
  questions: Question[];
}

export interface Session {
  title: string;
  sessionIndicator: string;
  description: string[];
  steps: Step[];
}

export interface Step {
  title: string;
  stepIndicator: string;
  stepBody: Div[]
}

export interface Div {
  text?: string[];
  question?: Question[];
  scenarios?: Scenario[];
}

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Scenario {
  title: String;
  image: string;
  statement: string;
  missingLetter: MissingLetter;
  question: Question;
}

export interface MissingLetter {
  word: string;
}








