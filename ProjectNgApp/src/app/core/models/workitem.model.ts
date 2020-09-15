export class WorkItem {
  workItemId?: number;
  title: string;
  description: string;
  workItemType: string;
  iteration?: string;
  priority?: number;
  originalEstimate?: number;
  remainingHours?: number;
  completedHours?: number;
  status: string;
  createdDate: Date;
  modifiedDate: Date;
}
