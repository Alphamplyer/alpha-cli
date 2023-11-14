import chalk from 'chalk';
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
    console.log(`    \u2192 ${chalk.yellow('Searching episode number (advanced way)...')}`);
    const regex = new RegExp(`${this.prefix}{1}(\\d+)\\.?(\\d)?`, 'gi');
    const regexMathes = Array.from(fileName.matchAll(regex));
    
    if (!regexMathes || regexMathes.length === 0) 
      return null;

    const episodeNumberValue = parseInt(regexMathes[0][1]);

    const matchedSubValue = regexMathes[0][2];
    const episodeNumberSubValue = matchedSubValue === undefined ? null : parseInt(matchedSubValue);
    
    return new EpisodeNumber(episodeNumberValue, episodeNumberSubValue);
  }
}