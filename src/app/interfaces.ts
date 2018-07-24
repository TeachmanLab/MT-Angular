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
  markdown: String;
  image: String;
  questions: Question[];
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

