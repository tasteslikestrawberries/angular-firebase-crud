export interface ITask {
  id: string;
  name: string;
  description: string;
  date?: Date;
  time_start?: string;
  time_end?: string;
  time_count?: string;
  isExpanded: boolean;
}