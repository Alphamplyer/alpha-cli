import { EpisodeNumber } from '../../../entities/episode-number.js';
import { SearchNumberAlgorithm } from './search-number-algorithm.js';

export interface SearchNumberWithEPrefixAlgorithmsOptions {
  prefix: string;
}

export class SearchNumberWithEPrefixAlgorithms implements SearchNumberAlgorithm {
  prefix: string;

  constructor(options: SearchNumberWithEPrefixAlgorithmsOptions) {
    this.prefix = options.prefix;
  }

  public searchEpisodeNumber(fileName: string): EpisodeNumber | null {
    const regex = new RegExp(`${this.prefix}{1}(\\d+)\\.?(\\d)?`, 'gi');
    const regexMathes = Array.from(fileName.matchAll(regex));
    return EpisodeNumber.parseFromRegExpMatchArray(regexMathes);
  }
}