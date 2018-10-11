
export interface Session {
  session: string; // the name used on the back end, such as firstSession, etc.
  title: string;
  subTitle: String;
  sessionIndicator: string;
  description: string[];
  steps: Step[];
  startTime?: number;
  conditioning: string;
  study: string;
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
  answer?: string;
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
  title: string;
  highlight: string;
  icon: string;
}

export interface BulletList extends Element {
  type: 'BulletList';
  title: string;
  bullets: string[];
}

// This is how we collect data as participants move through the sessions.
export interface PageData {
  date: string; // Date and time at the moment of beginning the page
  session: string; // The back end id (firstSession)
  sessionTitle: string; // The title and subtitle of the session that is displayed to the user (Session 1: Introduction to Anxiety)
  conditioning: string; // The user group that determines which sessions are shown (Control or Training)
  study: string; // The study being completed (Calm Thinking)
  step_title: string; // The title of the current step (Anxiety Disorders)
  step_index: number; // The index number of the step in the context of all the steps in the session (2)
  trial_type: string; // The type of the stimulus (Paragraph, Question, MissingLetter)
  stimulus: string | string[]; // The content of the stimulus, such as the actual paragraph or question text
  button_pressed?: string; // The first button pressed when answering a Question or completing a Missing Letter prompt
  correct?: boolean; // False when an incorrect answer is chosen, otherwise True.
  device: string; // Device used to complete the exercise
  rt: number; // Response time from starting the page to completing the page in milliseconds
  rt_first_react: number; // Response time from starting the page to the first reaction (pressing a button to answer a question) in milliseconds
  time_elapsed: number; // Time from the beginning of the session to the end of the current page in milliseconds
}
