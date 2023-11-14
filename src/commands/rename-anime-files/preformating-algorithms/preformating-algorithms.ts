import { DefaultCommandOptions } from "../../../base/default-command-options.js";

export interface PreformatingOptions extends DefaultCommandOptions {
  isSeasonFormatingIsDisabled: boolean;
  isResolutionFormatingIsDisabled: boolean;
  isCodecFormatingIsDisabled: boolean;
  isSquareBracketsFormatingIsDisabled: boolean;
}

export interface PreFormatingAlgorithm {
  apply(fileName: string, options: PreformatingOptions): string
}