import { SearchNumberAlgorithm } from './search-number-algorithm.js';

export interface SearchNumberWithEPrefixAlgorithmsOptions {
  prefix: string;
}

export class SearchNumberWithEPrefixAlgorithms implements SearchNumberAlgorithm {
  prefix: string;

  constructor(options: SearchNumberWithEPrefixAlgorithmsOptions) {
    this.prefix = options.prefix;
  }

  public searchEpisodeNumber(fileName: string): number | null {
    const regex = new RegExp(`${this.prefix}{1}(\\d{2,3})`, 'gi');
    const regexMathes = fileName.match(regex);
    if (!regexMathes) 
      return null;
    const episodeNumberStr = regexMathes[0].substring(1);
    return parseInt(episodeNumberStr) || null;
  }
}