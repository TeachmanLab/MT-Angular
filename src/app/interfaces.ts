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
  title: string;
  markdown: String;
  image: String;
  questions?: Question[];
  intro: Intro;
  eduSession: EducationSession;
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
  stepBody: string;
  questions: Question[];
}

export interface EducationSession {
  title: string;
  eduSessionInd: EducationSessionIndicator;
  sessionContent: string;
  step: Step[];
}

export interface EducationSessionIndicator {
  sessionIndicator: string;
}
