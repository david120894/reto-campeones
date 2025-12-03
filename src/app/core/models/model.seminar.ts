export interface ParticipantSeminar {
  id: number;
  name: string;
  lastName: string;
  email: string;
  dni: string;
  phone: string;
  gender: string;
  birthDate: string;   // O Date si lo parseas
  age: number;
  profession: string;
  workplace: string;
  academicDegree: string;
  createdAt: string;   // O Date si lo parseas
  updateAt: string | null;
}
