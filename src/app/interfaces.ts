
export interface Intro {
  title: string;
  introBody: Div[];
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
  pages: Page[]
}

export interface Page{
  divs: Div[]
}

export interface Div {
  header?: string;
  text?: string[];
  questions?: Question[];
  scenarios?: Scenario[];
}

export interface Scenario {
  title: String;
  image: string;
  statement: string;
  missingLetter?: MissingLetter;
  question?: Question;
}

export interface MissingLetter {
  word: string;
}

export interface Question {
  question: string;
  type: string;
  options: string[];
  answer?: string;
}






