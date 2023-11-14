import { PreFormatingAlgorithm, PreformatingOptions } from "./preformating-algorithms.js";

export class RemoveInSquareBracketsValue implements PreFormatingAlgorithm {
  public apply(fileName: string, options: PreformatingOptions): string {
    if (options.isSquareBracketsFormatingIsDisabled) {
      return fileName;
    }
    
    return fileName.replace(/\[.*\]/g, "");
  }
}