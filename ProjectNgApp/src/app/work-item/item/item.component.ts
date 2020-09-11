import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WorkItemService } from 'src/app/core/services/workitem.service';
import { WorkItem } from 'src/app/core/models/workitem.model';
import { AgGridAngular } from 'ag-grid-angular';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @ViewChild('agProjectGrid') agGrid: AgGridAngular;

  columnDefs = [
    {
      headerName: 'ID',
      field: '$key',
      sortable: true,
      filter: true,
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
      field: '',
      cellRenderer: function clickNextRendererFunc() {
        return `<button class="btn btn-light" style="margin-left:25px" ngbtooltip="Update" placement="top" type="button">
                    <i class="uil uil-envelope-edit"></i>

                <button class="btn btn-light" ngbtooltip="Delete" placement="top" type="button">
                               <i class="uil uil-trash-alt"></i>
                 </button>
                `;
      }
    }
  ];


  rowData: any;
  message: string;
  messageType: string;
  paginationPageSize: number = 10;
  closeResult = '';
  loading = true;
  workItem: WorkItem = new WorkItem();

  constructor(private workItemService: WorkItemService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.workItemService.getWorkItems().subscribe(data => {
      this.rowData = data.map(e => {
        return {
          ...e.payload.doc.data() as WorkItem
        };
      })
      this.loading = false;
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

      const workItem: WorkItem = {
        title: addWorkItemForm.value.inputTitle,
        description: addWorkItemForm.value.inputDescription,
        status: "Active",
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
