import { FormatingAlgorithm } from "./formating-algorithms.js";

const resolutions: string[] = [
  "360p",
  "480p",
  "720p",
  "1080p",
  "1440p",
  "2160p",
];

export class RemoveResolution implements FormatingAlgorithm {
  public apply(fileName: string): string {
    return resolutions.reduce((fileName, resolution) => {
      return fileName.replace(resolution, "");
    }, fileName);
  }
}