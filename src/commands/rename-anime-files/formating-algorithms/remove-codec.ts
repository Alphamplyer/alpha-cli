import { FormatingAlgorithm } from "./formating-algorithms.js";

const encounteredCodecs: string[] = [
  "x264",
  "H264",
  "H.264",
  "AV1",
  "MPEG-4",
  "MPEG4",
];

export class RemoveCodec implements FormatingAlgorithm {
  public apply(fileName: string): string {
    return encounteredCodecs.reduce((fileName, codec) => {
      return fileName.replace(codec, "");
    }, fileName);
  }
}