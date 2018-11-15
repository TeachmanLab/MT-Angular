/**
 * Converts a CSV file into data we can read into a series of training sessions.
 */
import { FillInBlank, MissingLetter, Question, Scenario} from './interfaces';


export class TrainingCSV {

  static toJson(csv: string): Scenario[] {
      const lines = csv.split('\n');
      let currentLine = [];
      let scenario: Scenario;
      let image: string;
      let answer: string;
      let pages = [];
      const result = [];
      let elements = [];

      for (let i = 1; i < lines.length - 1; i++) {
        currentLine = TrainingCSV.csvLineToArray(lines[i]);
        if (!currentLine)  {
          console.log(`Skipping line #${i}:  ${lines[i]}`);
          continue;
        }
        pages = [];

        pages.push({elements: [{type: 'Intro', content: currentLine[2]}]});
        elements = [];
        elements.push({type: 'Statements', content: this.stripLastWord(currentLine[5], currentLine[3])});
        // Add missing letter component or fill in the blank, depending.
        if (currentLine[3] !== 'None') {
          elements.push({type: 'MissingLetter', content: currentLine[3]});
        } else {
          elements.push({type: 'FillInBlank'});
        }
        pages.push({elements: elements});

        // If there is a followup negation, add that to the pagess.
        if (currentLine[6] !== 'None') {
          elements = [];
          elements.push({type: 'Statements', content: this.stripLastWord(currentLine[6], currentLine[4])});
          if (currentLine[4] !== 'None') {
            elements.push({type: 'MissingLetter', content: currentLine[4]});
          } else {
            elements.push({type: 'FillInBlank'});
          }
          pages.push({elements: elements});
        }
        currentLine[10] === 'Positive' ?  answer = currentLine[8] : answer = currentLine[9];
        // Dont ask follow up questions if using fill int the blank
        if (currentLine[3] !== 'None') {
          pages.push({elements: [{type: 'Question', question: currentLine[7], answer: answer, options: [currentLine[8], currentLine[9]]}]});
        }
        // Add a picture if one exists.
        if (currentLine[13] === 'picture') {
          image = `assets/training_images/${currentLine[1]}.jpeg`;
        } else {
          image = null;
        }
        scenario = { type: 'Scenario', title: currentLine[1], image: image, stepIndicator: image, pages: pages};
        result.push(scenario);
      }
      return result;
  }

  static stripLastWord(text: string, wordsToStrip: string): String {
    return text.substring(0, text.toLocaleLowerCase().lastIndexOf(wordsToStrip.toLocaleLowerCase()));
  }

// Return array of string values, or NULL if CSV string not well formed.
  // noinspection TsLint
  static csvLineToArray(text: string) {
    const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) {return null; }
    const a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {
        // Remove backslash from \' in single quoted values.
        if (m1 !== undefined) {
          a.push(m1.replace(/\\'/g, '\''));
          // Remove backslash from \" in double quoted values.
          } else if (m2 !== undefined) {
            a.push(m2.replace(/\\"/g, '"'));
          } else if (m3 !== undefined) {
            a.push(m3);
          }
        return ''; // Return empty string.
      });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) {
      a.push('');
    }
    return a;
  }

}
