import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WorkItemService } from 'src/app/core/services/workitem.service';
import { WorkItem } from 'src/app/core/models/workitem.model';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from '@angular/forms';

import { ViewActionButtonCellTemplate } from './cell-templates/view-action-button-cell-template';

@Component({
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @ViewChild('agProjectGrid') agGrid: AgGridAngular;

  columnDefs = [
    {
      headerName: 'ID',
      field: 'workItemId',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Title',
      field: 'title',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Created Date',
      field: 'createdDate',
      sortable: true,
      filter: 'agDateColumnFilter',
      cellRenderer: (data) => { return new Date(data.value.seconds * 1000).toLocaleDateString() }
    },
    {
      headerName: '',
      field: 'workItemId',
      cellRenderer: 'viewActionButtonCellTemplate',
    }
  ];


  WorkItemList: any = [];
  message: string;
  messageType: string;
  paginationPageSize: number = 10;
  closeResult = '';
  loading = true;
  workItem: WorkItem = new WorkItem();
  frameworkComponents: any;

  constructor(private workItemService: WorkItemService, private modalService: NgbModal) {
    this.frameworkComponents = {
      viewActionButtonCellTemplate: ViewActionButtonCellTemplate
    }
  }

  ngOnInit(): void {
    this.workItemService.getWorkItems().subscribe(data => {
      data.map(e => {
        const workItem = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as WorkItem });
        // this.rowData = [];
        this.WorkItemList.push({
          workItemId: workItem.workItemId,
          title: workItem.title,
          description: workItem.description,
          workItemType: workItem.workItemType,
          status: workItem.status,
          createdDate: workItem.createdDate,
        });
      })
      this.loading = false;
      this.agGrid.api.setRowData(this.agGrid.rowData);
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editWorkItem(id: string) {
    console.log(id);
    let workItem = undefined;

    this.workItemService.getWorkItemsById(id).then(data => {
      console.log(data);
    });;

  }

  deleteWorkItem(id: string) {
    console.log(id);
    let workItem = undefined;

    this.workItemService.getWorkItemsById(id).then(data => {
      console.log(data);
    });;

  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(addWorkItemForm: NgForm) {
    this.loading = true;
    if (addWorkItemForm && addWorkItemForm.value) {
      if (!addWorkItemForm.valid) {
        this.message = 'please enter proper details for work item'
        this.messageType = "error";
        return
      }

      let tempId: number = 1;
      if (this.WorkItemList.length > 0) {
          var ids = this.WorkItemList.map(x => x.workItemId ? x.workItemId : 0);
          tempId = Math.max(...ids) + 1;
      } else {
          tempId = 1;
      }

      const workItem: WorkItem = {
        workItemId: tempId,
        title: addWorkItemForm.value.inputTitle,
        description: addWorkItemForm.value.inputDescription,
        status: "New",
        workItemType: addWorkItemForm.value.inputWorkItemType,
        createdDate: new Date(),
        modifiedDate: new Date()
      }
      this.workItemService.createWorkItem(workItem);
      this.loading = false;
      addWorkItemForm.reset();
      this.modalService.dismissAll();
      this.message = 'Work item added successfully.'
      this.messageType = "success";
    }
  }
}
