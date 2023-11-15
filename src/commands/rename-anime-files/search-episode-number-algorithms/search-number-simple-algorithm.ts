import { EpisodeNumber } from "../../../entities/episode-number.js";
import { SearchNumberAlgorithm } from "./search-number-algorithm.js";

export interface SearchNumberSimpleAlgorithmOptions {
  shouldSearchWithSpaces: boolean;
  shouldSearchWithOneDigit: boolean;
}

export class SearchNumberSimpleAlgorithm implements SearchNumberAlgorithm {
  shouldSearchWithSpaces: boolean;
  shouldSearchWithOneDigit: boolean;

  constructor(options: SearchNumberSimpleAlgorithmOptions = { shouldSearchWithSpaces: true, shouldSearchWithOneDigit: false }) {
    this.shouldSearchWithSpaces = options.shouldSearchWithSpaces;
    this.shouldSearchWithOneDigit = options.shouldSearchWithOneDigit;
  }

  public searchEpisodeNumber(fileName: string): EpisodeNumber | null {
    let regex = this.shouldSearchWithOneDigit ? /(\d{1})(?:.(\d+))?/ : /(\d+)(?:.(\d+))?/;

    if (this.shouldSearchWithSpaces) {
      regex = this.shouldSearchWithOneDigit ? / ?(\d{1})(?:.(\d+))? ?/ : / ?(\d+)(?:.(\d+))? ?/;
    }
    
    const regexMatchArray: RegExpMatchArray | null = fileName.match(regex)
    return EpisodeNumber.parseFromRegExpMatchArray(regexMatchArray);
  }
}