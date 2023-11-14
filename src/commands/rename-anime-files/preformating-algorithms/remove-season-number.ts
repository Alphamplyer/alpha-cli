import { PreFormatingAlgorithm, PreformatingOptions } from "./preformating-algorithms.js";

export class RemoveSeasonNumber implements PreFormatingAlgorithm {
  public apply(fileName: string, options: PreformatingOptions): string {
    if (options.isSeasonFormatingIsDisabled) {
      return fileName;
    }
    
    return fileName.replace(/s{1}(\d{2,3})/gi, "");
  }
}