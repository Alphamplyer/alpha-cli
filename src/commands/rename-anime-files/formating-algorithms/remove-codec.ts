import { PreFormatingAlgorithm, PreformatingOptions } from "./formating-algorithms.js";

const encounteredCodecs: string[] = [
  "x264",
  "h264",
  "h.264",
  "av1",
  "mpeg-4",
  "mpeg4",
];

export class RemoveCodec implements PreFormatingAlgorithm {
  public apply(fileName: string, options: PreformatingOptions): string {
    if (options.isCodecFormatingIsDisabled) {
      return fileName;
    }
    
    return encounteredCodecs.reduce((fileName, codec) => {
      return fileName.replace(codec, "");
    }, fileName);
  }
}