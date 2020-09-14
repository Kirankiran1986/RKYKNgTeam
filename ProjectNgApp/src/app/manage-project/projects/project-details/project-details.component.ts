import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  constructor(private userService: UserService, private projectService: ProjectService, private actRoute: ActivatedRoute) {
    this.projectId = Number(this.actRoute.snapshot.params.id);
  }

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  projects: Project[] = [];
  userDataSource: any;
  loading = true;
  projectId: number;
  project: any;
  selectedUsers:any = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      data.map(e => {
        const userList = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as User });
        if (userList && userList.role.toLowerCase() !== 'admin') {
          this.userDataSource = [];
          this.userDataSource.push({ username: userList.firstName + " " + userList.lastName, photo: userList.photo});
        }
      });
    });


    this.projectService.getProjects().subscribe(data => {
      this.projects = data.map(e => {
        return {
          ...e.payload.doc.data() as Project
        }
      });

      this.project = this.projects.find(x => x.id === this.projectId);
    });

    this.loading = false;
  }

  public model: any;

  search = (text$: Observable<string>) =>
    text$.pipe(      
      debounceTime(200),
      map(term => term === '' ? []
        : this.userDataSource.filter(v => v.username.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {username: string}) => x.username;

  saveUser(){
    if(this.model){
    this.selectedUsers.push(this.model);
    }
  }

}
