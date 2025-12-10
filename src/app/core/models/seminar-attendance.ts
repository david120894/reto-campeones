export interface SeminarAttendance {
  id: number;
  dni: string;
  name: string;
  lastName: string;
  profession: string;
  workplace: string;
  date: string | null;
  checkinFirst: string | null;
  checkinSecond: string | null;
}
