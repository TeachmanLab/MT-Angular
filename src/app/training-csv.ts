/**
 * Converts a CSV file into data we can read into a series of training sessions.
 */
import { FillInBlank, MissingLetter, Question, Scenario} from './interfaces';


export class TrainingCSV {

  static toJson(sessionName: String, csv: string): Scenario[] {
      const lines = csv.split('\n');
      let currentLine = [];
      let scenario: Scenario;
      let image: string;
      let answer: string;
      let pages = [];
      const result = [];
      let elements = [];

      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim().length === 0) {continue; }
        currentLine = TrainingCSV.csvLineToArray(lines[i]);
        if (!currentLine)  {
          console.log(`Skipping line #${i}:  ${lines[i]}`);
          continue;
        }
        pages = [];
        pages.push({name: 'scenarioTitle', elements: [{type: 'Intro', content: currentLine[2]}]});
        elements = [];
        const lastWord = currentLine[4].trim();
        elements.push({type: 'Statements', content: this.stripLastWord(currentLine[6], lastWord)});
        // Add missing letter component or fill in the blank, depending.
        if (currentLine[4] !== 'None') {
          elements.push({type: 'MissingLetter', content: currentLine[4], numberMissing: +currentLine[3]});
        } else {
          elements.push({type: 'FillInBlank'});
        }
        pages.push({name: 'scenario', elements: elements});

        // If there is a followup negation, add that to the pagess.
        if (currentLine[7] !== 'None') {
          elements = [];
          elements.push({type: 'Statements', content: this.stripLastWord(currentLine[7], currentLine[5])});
          if (currentLine[5] !== 'None') {
            elements.push({type: 'MissingLetter', content: currentLine[5], numberMissing: +currentLine[3]});
          } else {
            elements.push({type: 'FillInBlank'});
          }
          pages.push({name: 'scenarioNegation', elements: elements});
        }
        currentLine[11] === 'Positive' ?  answer = currentLine[9] : answer = currentLine[10];
        // Dont ask follow up questions if using fill int the blank
        if (currentLine[4] !== 'None') {
          const options = TrainingCSV.shuffleOptions([currentLine[9], currentLine[10]]);
          pages.push({elements: [{type: 'Question', question: currentLine[8], answer: answer, options: options}]});
        }
        // Add a picture if one exists.
        if (currentLine[14] === 'picture') {
          image = `assets/training_images/${sessionName}/${currentLine[1]}.jpeg`;
        } else {
          image = null;
        }
        scenario = { type: 'Scenario', title: currentLine[1], image: image, stepIndicator: image, pages: pages};
        result.push(scenario);
      }
      return result;
  }

  static shuffleOptions(array) {
    // Randomize array element order in-place.
    // Using Durstenfeld shuffle algorithm.
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  static stripLastWord(text: string, wordsToStrip: string): String {
    text = text.trim();
    if ( wordsToStrip === 'None') { // if set to 'None" just remove the last word.
      return text.substring(0, text.toLocaleLowerCase().lastIndexOf(' '));
    } else if (text.toLocaleLowerCase().lastIndexOf(wordsToStrip.toLowerCase()) > 0) {
      return text.substring(0, text.toLocaleLowerCase().lastIndexOf(wordsToStrip.toLocaleLowerCase()));
    } else {
      return text;
    }
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
