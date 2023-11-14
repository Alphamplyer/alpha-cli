import { EpisodeNumber } from "../../../entities/episode-number.js";

export interface SearchNumberAlgorithm {
  searchEpisodeNumber(fileName: string): EpisodeNumber | null;
}