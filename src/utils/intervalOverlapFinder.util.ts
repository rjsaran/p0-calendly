import { TimeInterval } from '../module/availability/model/TimeInterval';
import { HourMinute } from './time.utils';

export class IntervalOverlapFinder {
  /**
   *
   * @param intervalA
   * @param intervalB
   * @returns
   */
  static comparator(intervalA: TimeInterval, intervalB: TimeInterval): number {
    if (intervalA.from === intervalB.from)
      return new HourMinute(intervalA.to).compare(new HourMinute(intervalB.to));

    return new HourMinute(intervalA.from).compare(
      new HourMinute(intervalB.from)
    );
  }

  /**
   * Return overlap between two list of intervals
   *
   * @param intervals1: [{ "from": "12:00", "to": "13:00" }, { "from": "18:00", "to": "19:00" }]
   * @param intervals2: [{ from: "10:00", to: "14:00"}]
   * @returns [{ from: "12:00", to: "13:00"}]
   */
  public static findOverlap(
    intervals1: Array<TimeInterval>,
    intervals2: Array<TimeInterval>
  ): Array<TimeInterval> {
    const overlapIntervals: Array<TimeInterval> = [];

    const len1 = intervals1.length;
    const len2 = intervals2.length;
    let i = 0;
    let j = 0;

    intervals1.sort(IntervalOverlapFinder.comparator);
    intervals2.sort(IntervalOverlapFinder.comparator);

    while (i < len1 && j < len2) {
      const interval1 = intervals1[i];
      const interval2 = intervals2[j];

      const low = Math.max(
        new HourMinute(interval1.from).minutes,
        new HourMinute(interval2.from).minutes
      );
      const high = Math.min(
        new HourMinute(interval1.to).minutes,
        new HourMinute(interval2.to).minutes
      );

      if (low < high) {
        const timeInterval = new TimeInterval();

        timeInterval.from = HourMinute.fromMinutes(low).val;
        timeInterval.to = HourMinute.fromMinutes(high).val;

        overlapIntervals.push(timeInterval);
      }

      if (
        new HourMinute(interval1.to).minutes <
        new HourMinute(interval2.to).minutes
      ) {
        i += 1;
      } else {
        j += 1;
      }
    }

    return overlapIntervals;
  }
}
