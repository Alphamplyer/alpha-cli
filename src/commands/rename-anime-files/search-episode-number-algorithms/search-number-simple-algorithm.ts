import { EpisodeNumber } from "../../../entities/episode-number.js";
import { SearchNumberAlgorithm } from "./search-number-algorithm.js";

export interface SearchNumberSimpleAlgorithmOptions {
  shouldSearchWithSpaces: boolean;
}

export class SearchNumberSimpleAlgorithm implements SearchNumberAlgorithm {
  shouldSearchWithSpaces: boolean;

  constructor(options: SearchNumberSimpleAlgorithmOptions = { shouldSearchWithSpaces: true }) {
    this.shouldSearchWithSpaces = options.shouldSearchWithSpaces;
  }

  public searchEpisodeNumber(fileName: string): EpisodeNumber | null {
    let regex = /(\d+)\.?(\d?)/g;

    if (this.shouldSearchWithSpaces) {
      regex = / (\d+) /g;
    }
    
    const regexMathes = Array.from(fileName.matchAll(regex));
    return EpisodeNumber.parseFromRegExpMatchArray(regexMathes);
  }
}