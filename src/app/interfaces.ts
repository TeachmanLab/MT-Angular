export interface Intro {
  title: String;
  markdown: string[];
  questions: Question[];
}

export interface Session {
  title: string;
  icon: string;
  sections: Section[];
}

export interface Section {
  scenario?: Scenario;
  education?: Education;
}

export interface Education {
  title: String;
  markdown: string[];
  image: String;
  questions?: Question[];
  eduSession: EducationSession[];
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

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Intro {
  title: String;
  divs: string[];
  questions: Question[];
}

export interface Step {
  title: string;
  stepIndicator: string;
  stepBody: string[];
  questions: Question[];
}

export interface EducationSession {
  title: string;
  stepsIndicator: string;
  eduSessionInd: EducationSessionIndicator;
  sessionContent: string[];
  steps: Step[];
}

export interface EducationSessionIndicator {
  sessionIndicator: string;
}
