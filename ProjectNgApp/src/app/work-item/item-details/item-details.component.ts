import { Component, OnInit } from '@angular/core';
import { WorkItemService } from 'src/app/core/services/workitem.service';
import { WorkItem } from 'src/app/core/models/workitem.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  workItemId: number = 0;
  workItemList: any = [];
  workItem: any = [];

  constructor(private workItemService: WorkItemService, private actRoute: ActivatedRoute) {
    this.workItemId = Number(this.actRoute.snapshot.params.id);
  }

  ngOnInit(): void {
    this.workItemService.getWorkItems().subscribe(data => {
      data.map(e => {
        const workItems = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as WorkItem });
        if (workItems) {
          this.workItemList.push(workItems);
        }
      });

      this.workItem = this.workItemList.find(x => x.workItemId === this.workItemId);
    });
  }

  onSave(addWorkItemForm: NgForm): void {

  }
}
