import { PreFormatingAlgorithm, PreformatingOptions } from "./preformating-algorithms.js";

const squareBracketsRegex = /\[[A-Za-z0-9-_ ]*\]/;

export class RemoveInSquareBracketsValue implements PreFormatingAlgorithm {
  public apply(fileName: string, options: PreformatingOptions): string {
    if (options.isSquareBracketsFormatingIsDisabled) {
      return fileName;
    }
    
    let lastFileNameLength;

    do {
      lastFileNameLength = fileName.length;
      fileName = fileName.replace(squareBracketsRegex, "");
    } while (lastFileNameLength !== fileName.length);

    return fileName.trim();
  }
}