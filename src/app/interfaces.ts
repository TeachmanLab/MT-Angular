
export interface Session {
  title: string;
  subTitle: String;
  sessionIndicator: string;
  allSteps: string;
  description: string[];
  steps: Step[];
  startTime?: number;
  conditioning: string;
  study: string;
  trainingTitle?: string;
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
  content?: string | string[];
  responseTime?: number;
  buttonPressed?: string;
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
  completed?: boolean;
}

export interface ThoughtBubble extends Element {
  type: 'ThoughtBubble';
  image: string;
  colorClass: string;
  title: string;
  thought: string;
  followup: string;
}

export interface Highlight extends Element {
  type: 'Highlight';
  colorClass: string;
  title: string;
  highlight: string;
  icon: string;
}

export interface BulletList extends Element {
  type: 'BulletList';
  title: string;
  bullets: string[];
}

export interface PageData {
  date: string;
  session: string;
  conditioning: string;
  study: string;
  step_title: string;
  step_index: number;
  trial_type: string;
  stimulus: string | string[];
  button_pressed?: string;
  correct?: boolean;
  device: string;
  rt: number;
  rt_first_react: number;
  time_elapsed: number;
}
