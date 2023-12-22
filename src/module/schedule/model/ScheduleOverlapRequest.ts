export class ScheduleOverlapRequest {
  userIds: Array<string>;

  minDuration?: number; // In minutes

  type?: 'weekly' | 'monthly' = 'weekly';
}
