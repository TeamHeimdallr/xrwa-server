export class CreateScheduleDto {
  scheduleId: number;
  unlockDate: Date;

  callback?: () => void;
}
