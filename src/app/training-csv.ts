/**
 * Converts a CSV file into data we can read into a series of training sessions.
 */
import {MissingLetter, Question, Scenario} from './interfaces';
import {current} from 'codelyzer/util/syntaxKind';

export class TrainingCSV {

  static toJson(csv: string): Scenario[] {
      const lines = csv.split('\n');
      let currentLine = [];
      let scenario: Scenario;
      let missingLetter: MissingLetter;
      let question: Question;
      let image: string;

      const result = [];
      for (let i = 1; i < lines.length - 1; i++) {
        currentLine = TrainingCSV.csvLineToArray(lines[i]);
        if (!currentLine)  {
          console.log(`Skipping line #${i}:  ${lines[i]}`);
          continue;
        }

        const intro = {type: 'Intro', content: currentLine[1]};
        const statement = {type: 'Statements', content: currentLine[3]};
        missingLetter = {type: 'MissingLetter', word: currentLine[2], content: currentLine[2]}; // setting content as well as word in order to populate pageData stimulus field.
        question = {type: 'Question', question: currentLine[4], answer: currentLine[5], options: ['Yes', 'No']};
        image = `assets/training_images/${currentLine[0]}.jpg`;
        scenario = {
          type: 'Scenario', title: currentLine[1], image: image, statement: currentLine[3],
          pages: [{elements: [intro]}, {elements: [statement]}, {elements: [missingLetter]}, {elements: [question]}],
          missingLetter: missingLetter, question: question, stepIndicator: image,
        };
        result.push(scenario);
      }
      return result;
  }

// Return array of string values, or NULL if CSV string not well formed.
  static csvLineToArray(text: string) {
    let re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
    let re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
    // Return NULL if input string is not well formed CSV string.
    if (!re_valid.test(text)) return null;
    var a = [];                     // Initialize array to receive values.
    text.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {
        // Remove backslash from \' in single quoted values.
        if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
        // Remove backslash from \" in double quoted values.
        else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
        else if (m3 !== undefined) a.push(m3);
        return ''; // Return empty string.
      });
    // Handle special case of empty last value.
    if (/,\s*$/.test(text)) a.push('');
    return a;
  }

}
