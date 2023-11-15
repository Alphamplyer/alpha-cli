
export class EpisodeNumber {
  value: number;
  subValue: number | null;

  constructor(value: number, subValue: number | null = null) {
    this.value = value;
    this.subValue = subValue;
  }

  public addOffset(offset: number): void {
    this.value += offset;
  }

  public toString(): string {
    if (this.subValue === null) {
      return this.value.toString();
    }
    return this.value.toString() + '.' + this.subValue.toString();
  }

  public static parseFromRegExpMatchArray(regexMathes: RegExpMatchArray[]): EpisodeNumber | null {
    if (!regexMathes || regexMathes.length === 0) 
      return null;

    const episodeNumberValue = parseInt(regexMathes[0][1]);

    const matchedSubValue = regexMathes[0][2];
    const episodeNumberSubValue = matchedSubValue === undefined ? null : parseInt(matchedSubValue);
    
    return new EpisodeNumber(episodeNumberValue, episodeNumberSubValue);
  }
}