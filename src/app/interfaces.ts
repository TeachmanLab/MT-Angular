
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
  numCorrect?: number; // Total number of correctly completed pages in this scenario.
  score?: number;
  numAnswer?: number;
}

export interface Page {
  name: string;
  elements: Element[];
  auto_continue?: boolean;
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
  link?: string;
}

export interface Link extends Element {
  type: 'Link';
  link: string;
  target: string;
}

export interface MissingLetter extends Element {
  type: 'MissingLetter';
  numberMissing: number;
}

export interface FillInBlank extends Element {
  type: 'FillInBlank';
  maxCharacters: number;
  minCharacters: number;
  compact?: boolean;
  placeholder?: string;
  submitButtonText?: string;
}

export interface Countdown extends Element {
  type: 'Countdown';
  delayInSeconds: number;
  autoStart: boolean;
}

export interface Slider extends Element {
  type: 'Slider';
  min: number;
  max: number;
}

export interface Question extends Element {
  type: 'Question';
  question: string;
  options: string[];
  answer?: string;
  explanation?: string;
  completed?: boolean;
  preferNotToAnswer?: boolean;
}

export interface ThoughtBubble extends Element {
  type: 'ThoughtBubble';
  image: string;
  colorClass: string;
  title: string;
  thought: string;
  followup: string;
  skip_continue?: boolean;
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

export interface RandomNonPreviousStatement extends Element {
  type: 'RandomNonPreviousStatement';
  options: string[];
}

export interface MultiEntry extends Element {
  type: 'MultiEntry';
  title: string;
  fillInBlank: FillInBlank;
}

export interface Study {
  name: string;
  conditioning: string;
  currentSession: ServerSessionInfo; // the name used on the back end, such as firstSession, etc.
}

export interface ServerSessionInfo {
  index: number;
  name: string;
  displayName?: string;
  complete?: boolean;
  current?: boolean;
}

// A way to provide details about a particular component, this
// is a subset of the full EventRecord
export interface ElementEvent {
  trialType: string; // The type of the stimulus (Paragraph, Question, MissingLetter)
  stimulus: string; // The content of the stimulus, such as the actual paragraph or question text
  stimulusName?: string; // The short code name for stimulus
  buttonPressed?: string; // The first button pressed when answering a Question or completing a Missing Letter prompt
  correct?: boolean; // False when an incorrect answer is chosen, otherwise True.
  rt: number; // Response time from starting the page to completing the page in milliseconds
  rtFirstReact: number; // Response time from starting the page to the first reaction (pressing a button to answer a question) in ms.
}

// This is how we collect data as participants move through the sessions.
export interface EventRecord extends ElementEvent {
  session: string; // The back end id (firstSession)
  sessionIndex: number; // The index number of the current session (0)
  sessionTitle: string; // The title and subtitle of the session that is displayed to the user (Session 1: Introduction to Anxiety)
  conditioning: string; // The user group that determines which sessions are shown (Control or Training)
  study: string; // The study being completed (Calm Thinking)
  stepTitle: string; // The title of the current step (Anxiety Disorders)
  stepIndex: number; // The index number of the step in the context of all the steps in the session (2)
  device: string; // Device used to complete the exercise
  timeElapsed: number; // Time from the beginning of the session to the end of the current page in milliseconds
  sessionCounter: string; // A counter that advances as a user moves through the session
}

