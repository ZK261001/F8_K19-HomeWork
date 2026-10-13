export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class Candidate {
  id: number;
  name: string;
  phone?: string;
  email: string;
  gender?: Gender;
  province_id?: number;
  ward_id?: number;
  addressDetail?: string;
  active?: boolean;
}
