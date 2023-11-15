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
    const regex = new RegExp(`${this.prefix}{1}(\\d+)(?:.(\\d+))?`, 'i');
    const regexMatchArray: RegExpMatchArray | null = fileName.match(regex)    
    return EpisodeNumber.parseFromRegExpMatchArray(regexMatchArray);
  }
}