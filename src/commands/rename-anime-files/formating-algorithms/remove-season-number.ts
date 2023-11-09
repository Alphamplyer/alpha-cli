import { FormatingAlgorithm } from "./formating-algorithms.js";

export class RemoveSeasonNumber implements FormatingAlgorithm {
  public apply(fileName: string): string {
    return fileName.replace(/s{1}(\d{2,3})/gi, "");
  }
}