import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';
import { AgGridAngular } from 'ag-grid-angular';

import { ViewActionButtonCellTemplate } from './cell-templates/view-action-button-cell-template';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('agProjectGrid') agGrid: AgGridAngular;

  userDataSource: any;
  paginationPageSize: number = 10;
  loading = true;
  frameworkComponents: any;

  constructor(private userService: UserService) {

    this.frameworkComponents = {
      viewActionButtonCellTemplate: ViewActionButtonCellTemplate
    }
  }

  columns = [
    {
      headerName: 'Photo',
      field: 'photo',
      cellRenderer: (data) => {
        if (data && data.value) {
          return `<img src="${data.value}" style="width: 40px; height: 40px;"/>`;
        }
      }
    },
    {
      headerName: 'Name',
      field: 'userName',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Designation',
      field: 'designation',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Contact',
      field: 'contact',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Location',
      field: 'location',
      sortable: true,
      filter: true
    },
    {
      headerName: 'Skype',
      field: 'skype',
      sortable: true,
      filter: true
    },
    {
      headerName: '',
      field: 'userid',
      cellRenderer: 'viewActionButtonCellTemplate',
    }
  ];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      data.map(e => {
        const userList = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as User });
        if (userList && userList.role.toLowerCase() !== 'admin') {
          this.userDataSource = [];
          this.userDataSource.push({
            userid: userList.uid,
            userName: userList.firstName + " " + userList.lastName,
            contact: userList.contact,
            designation: userList.designation,
            email: userList.email,
            location: userList.location,
            photo: userList.photo,
            skype: userList.skype
          });
        }
      });
    });

    this.loading = false;
  }
}
