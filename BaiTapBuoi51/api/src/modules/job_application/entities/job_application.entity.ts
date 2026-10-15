export const JOB_APPLICATION_STATUSES = [
  'PENDING',
  'INTERVIEW',
  'ACCEPTED',
] as const;
export type JobApplicationStatus = (typeof JOB_APPLICATION_STATUSES)[number];

export class JobApplication {
  id: number;
  job_id: number;
  candidate_id: number;
  cv_id: number;
  description?: string;
  status: JobApplicationStatus;
}
