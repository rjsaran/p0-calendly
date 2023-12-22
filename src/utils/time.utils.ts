export class HourMinute {
  val: string;

  constructor(val: string) {
    this.val = val;
  }

  /**
   * getter for time to minutes
   * e.g: 12:45 => (12 * 60) + 45 =  765
   */
  get minutes(): number {
    const [hour, minute] = this.val.split(':');

    return parseInt(hour) * 60 + parseInt(minute);
  }

  /**
   * Compare hourMinute with other
   *
   * @param hourMinute
   * @returns
   */
  compare(hourMinute: HourMinute): number {
    return this.minutes - hourMinute.minutes;
  }

  /**
   * Factory method to create HourMinute instance
   *
   * @param minutes minutes as number
   * @returns
   */
  static fromMinutes(minutes: number): HourMinute {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes =
      remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;

    return new HourMinute(`${formattedHours}:${formattedMinutes}`);
  }
}
