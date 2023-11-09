import { SearchNumberAlgorithm } from "./search-number-algorithm.js";

export interface SearchNumberSimpleAlgorithmOptions {
  shouldSearchWithSpaces: boolean;
}

export class SearchNumberSimpleAlgorithm implements SearchNumberAlgorithm {
  shouldSearchWithSpaces: boolean;

  constructor(options: SearchNumberSimpleAlgorithmOptions = { shouldSearchWithSpaces: true }) {
    this.shouldSearchWithSpaces = options.shouldSearchWithSpaces;
  }

  public searchEpisodeNumber(fileName: string): number | null {
    let regex = /(\d{2,3})/g;

    if (this.shouldSearchWithSpaces) {
      regex = / (\d{2,3}) /g;
    }

    const regexMathes = fileName.match(regex);
    if (!regexMathes) 
      return null;
    const episodeNumberStr = regexMathes[0];
    return parseInt(episodeNumberStr) || null;
  }
}