
export interface Session {
  session: string; // the name used on the back end, such as firstSession, etc.
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

export interface Scenario extends Step {
  type: 'Scenario';
  image: string;
  statement: string;
  missingLetter?: MissingLetter;
  question?: Question;
  buttonPressed?: string;
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

export interface MissingLetter extends Element {
  type: 'MissingLetter';
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
  sessionTitle: string;
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
