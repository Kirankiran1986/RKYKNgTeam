import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('agProjectGrid') agGrid: AgGridAngular;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  columnDefs = [
    {
      headerName: 'Name',
      field: 'firstName',
      sortable: true,
      filter: true,
      cellRenderer: (data) => { return data.data.firstName + ' ' + data.data.lastName }
    },
    {
      headerName: 'Email',
      field: 'email',
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
  user: User = new User();

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      const users = data.map(e => {
        return {
          ...e.payload.doc.data() as User
        };
      })

      this.rowData = users.filter(x => x.role != 'admin')
    });
    this.loading = false;
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

  onSubmit(addUserForm: NgForm) {
    this.loading = true;
    if (addUserForm && addUserForm.value) {
      if (!addUserForm.valid) {
        this.message = 'please enter proper details for user'
        this.messageType = "error";
        return
      }
      
      const user: User = {
        firstName: addUserForm.value.inputFirstName,
        lastName: addUserForm.value.inputLastName,
        email: addUserForm.value.inputEmail,
        isActive: true,
        password: addUserForm.value.inputPassword,
        role: 'user',
        createdDate: new Date(),
        modifiedDate: new Date()
      }
      this.userService.createUser(user);
      this.loading = false;
      addUserForm.reset();
      this.modalService.dismissAll();
      this.message = 'user added successfully.'
      this.messageType = "success";
    }
  }

}
