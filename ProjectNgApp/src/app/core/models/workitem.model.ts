export class WorkItem {
  workItemId: number;
  title: string;
  description: string;
  workItemType: string;
  iteration: string;
  priority: string;
  originalEstimate: number;
  remainingHours: number;
  completedHours: number;
  userName: string;
  status: string;
  createdDate: Date;
  modifiedDate: Date;
}
