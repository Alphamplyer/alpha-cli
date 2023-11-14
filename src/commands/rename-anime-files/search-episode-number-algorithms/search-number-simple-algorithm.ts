import chalk from "chalk";
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
    console.log(`    \u2192 ${chalk.yellow('Searching episode number (simple way)...')}`);
    let regex = /(\d+)/g;

    if (this.shouldSearchWithSpaces) {
      regex = / (\d+) /g;
    }

    const regexMathes = fileName.match(regex);
    if (!regexMathes) 
      return null;
    const episodeNumber = parseInt(regexMathes[0]);
    return new EpisodeNumber(episodeNumber) || null;
  }
}