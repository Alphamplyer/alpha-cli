
export class EpisodeNumber {
  value: number;
  subValue: number | null;

  constructor(value: number, subValue: number | null = null) {
    this.value = value;
    this.subValue = subValue;
  }

  public addOffset(offset: number): EpisodeNumber {
    return new EpisodeNumber(this.value + offset);
  }

  public toString(): string {
    if (this.subValue === null) {
      return this.value.toString();
    }
    return this.value.toString() + '.' + this.subValue.toString();
  }
}