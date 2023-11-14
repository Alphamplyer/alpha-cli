import { PreFormatingAlgorithm, PreformatingOptions } from "./preformating-algorithms.js";

const resolutions: string[] = [
  "360p",
  "480p",
  "720p",
  "1080p",
  "1440p",
  "2160p",
];

export class RemoveResolution implements PreFormatingAlgorithm {
  public apply(fileName: string, options: PreformatingOptions): string {
    if (options.isResolutionFormatingIsDisabled) {
      return fileName;
    }
    
    return resolutions.reduce((fileName, resolution) => {
      return fileName.replace(resolution, "");
    }, fileName);
  }
}