export const QUALIFICATIONS = [
  'Trung cấp',
  'Cao đẳng',
  'Đại học',
  'Thạc sĩ',
  'Tiến sĩ',
] as const;
export type Qualification = (typeof QUALIFICATIONS)[number];

export const WORK_TYPES = [
  'Full-time',
  'Part-time',
  'Remote',
  'Hybrid',
  'Freelance',
] as const;
export type WorkType = (typeof WORK_TYPES)[number];

export class Job {
  id: number;
  category_id: number;
  company_id: number;
  title: string;
  description: string;
  requirement: string;
  benefit?: string;
  experience: number;
  due_date: string;
  quantity: number;
  min_salary: number;
  max_salary: number;
  qualification: Qualification;
  work_type: WorkType;
  working_time: string;
}
