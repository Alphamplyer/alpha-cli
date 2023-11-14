import { PreFormatingAlgorithm, PreformatingOptions } from "./preformating-algorithms.js";

export class LowerCase implements PreFormatingAlgorithm {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public apply(fileName: string, options: PreformatingOptions): string {    
    return fileName.toLowerCase();
  }
}