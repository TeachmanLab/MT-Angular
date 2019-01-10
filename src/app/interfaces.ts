
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
  stimulusName?: string;
}

export interface Image extends Element {
  type: 'Image';
  caption?: string;
}

export interface MissingLetter extends Element {
  type: 'MissingLetter';
  numberMissing: number;
}

export interface FillInBlank extends Element {
  type: 'FillInBlank';
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

export interface Study {
  name: string;
  conditioning: string;
  currentSession: string; // the name used on the back end, such as firstSession, etc.
  currentSessionIndex: number;
}

// This is how we collect data as participants move through the sessions.
export interface PageData {
  session: string; // The back end id (firstSession)
  sessionIndex: number; // The index number of the current session (0)
  sessionTitle: string; // The title and subtitle of the session that is displayed to the user (Session 1: Introduction to Anxiety)
  conditioning: string; // The user group that determines which sessions are shown (Control or Training)
  study: string; // The study being completed (Calm Thinking)
  stepTitle: string; // The title of the current step (Anxiety Disorders)
  stepIndex: number; // The index number of the step in the context of all the steps in the session (2)
  trialType: string; // The type of the stimulus (Paragraph, Question, MissingLetter)
  stimulus: string; // The content of the stimulus, such as the actual paragraph or question text
  stimulusName?: string; // The short code name for stimulus
  buttonPressed?: string; // The first button pressed when answering a Question or completing a Missing Letter prompt
  correct?: boolean; // False when an incorrect answer is chosen, otherwise True.
  device: string; // Device used to complete the exercise
  rt: number; // Response time from starting the page to completing the page in milliseconds
  rtFirstReact: number; // Response time from starting the page to the first reaction (pressing a button to answer a question) in milliseconds
  timeElapsed: number; // Time from the beginning of the session to the end of the current page in milliseconds
  sessionCounter: string; // A counter that advances as a user moves through the session
}
