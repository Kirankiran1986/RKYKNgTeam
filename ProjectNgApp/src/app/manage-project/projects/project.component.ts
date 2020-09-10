import { Component, OnInit, ViewChild } from '@angular/core';
// import { UserService } from '../../core/services/user.service';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
// import { User } from '../../core/models/user.model';
import { AgGridAngular } from 'ag-grid-angular';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-projects',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
    @ViewChild('agProjectGrid') agGrid: AgGridAngular;

    constructor(private projectService: ProjectService, private modalService: NgbModal){}

    columnDefs = [
        {
            headerName: 'Project Name',
            field: 'name',
            sortable: true,
            filter: true,
        },
        {
            headerName: 'Status',
            field: 'status',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Description',
            field: 'description',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Start Date',
            field: 'startDate',
            sortable: true,
            filter: 'agDateColumnFilter',
            cellRenderer: (data) => { return new Date(data.value.seconds * 1000).toLocaleDateString() }
        },
        {
            headerName: 'Release Date',
            field: 'releaseDate',
            sortable: true,
            filter: 'agDateColumnFilter',
            cellRenderer: (data) => { return data.value != null ? new Date(data.value.seconds * 1000).toLocaleDateString() : '' }
        },
        {
            headerName: '',
            field: '',
            cellRenderer: function clickNextRendererFunc() {
              return `<button class="btn btn-light" style="margin-left:25px" ngbtooltip="Update" placement="top" type="button">
                          <i class="uil uil-envelope-edit"></i>
                        </button>

                        <button class="btn btn-light" ngbtooltip="Tasks" placement="top" type="button">
                            <i class="uil uil-bookmark-full"></i>
                        </button>
              
                      <button class="btn btn-light" ngbtooltip="Delete" placement="top" type="button">
                                     <i class="uil uil-trash-alt"></i>
                       </button> 
                       
                       
                      `;
            }
        }
    ];

    projectStatus: string[] = ['Off Track', 'At Risk', 'On Track'];

    rowData: any;
    message: string;
    messageType: string;
    paginationPageSize: number = 10;
    closeResult = '';
    loading = true;
    project: Project = new Project();

    ngOnInit(): void{
        this.projectService.getProjects().subscribe(data => {
            debugger;
            const projects = data.map(e => {
                return{
                    ...e.payload.doc.data() as Project
                }
            })

            this.rowData = projects.filter(x => x.name != '')
        })
        this.loading = false;
    }

    open(content){
        this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        })
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

    onSubmit(addProjectForm: NgForm) {
        debugger;
        this.loading = true;
        if(addProjectForm && addProjectForm.value){
            if(!addProjectForm.valid){
                this.message = "please enter proper detail for project";
                this.messageType = "error";
            }

            let tempId: number = 1;

            if(this.rowData.length > 0){
                var ids = this.rowData.map(x => x.id);
                tempId = Math.max(...ids) + 1;
            } else{
                tempId = 1;
            }

            const project: Project = {
                id: tempId,
                code: 'Project' + tempId,
                createdDate: new Date(),
                description: addProjectForm.value.inputDescription,
                modifiedDate: new Date(),
                name: addProjectForm.value.inputName,
                releaseDate: addProjectForm.value.inputReleaseDate != null ? new Date(addProjectForm.value.inputReleaseDate) : null,
                startDate: new Date(addProjectForm.value.inputStartDate),
                status: addProjectForm.value.inputStatus
            }

            this.projectService.createProject(project);            
            this.loading = false;
            addProjectForm.reset();
            this.modalService.dismissAll();
            this.message = 'Project added successfully';
            this.messageType = 'success';
        }
        // if (addUserForm && addUserForm.value) {
        //   if (!addUserForm.valid) {
        //     this.message = 'please enter proper details for user'
        //     this.messageType = "error";
        //     return
        //   }
          
        //   const user: User = {
        //     firstName: addUserForm.value.inputFirstName,
        //     lastName: addUserForm.value.inputLastName,
        //     email: addUserForm.value.inputEmail,
        //     isActive: true,
        //     password: addUserForm.value.inputPassword,
        //     role: 'user',
        //     createdDate: new Date(),
        //     modifiedDate: new Date()
        //   }
        //   this.userService.createUser(user);
        //   this.loading = false;
        //   addUserForm.reset();
        //   this.modalService.dismissAll();
        //   this.message = 'user added successfully.'
        //   this.messageType = "success";
        // }
      }
}