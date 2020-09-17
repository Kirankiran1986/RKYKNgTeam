import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/core/models/project.model';
import { ProjectService } from 'src/app/core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
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

  projects: any = [];
  projectCode: string = '';
  userDataSource: any;
  loading = true;
  projectId: number;
  project: any;
  selectedUsers: any = [];
  userMessage = '';

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.userDataSource = [];
      data.map(e => {
        const userList = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as User });
        if (userList && userList.role.toLowerCase() !== 'admin') {
          this.userDataSource.push({ username: userList.firstName + " " + userList.lastName, photo: userList.photo });
        }
      });
    });

    this.projectService.getProjects().subscribe(data => {
      data.map(e => {
        const projectList = Object.assign({ code: e.payload.doc.id }, { project: { ...e.payload.doc.data() as Project } });
        if (projectList) {
          this.projects.push(projectList);
        }
      });

      const projectData = this.projects.find(x => x.project.id === this.projectId);
      this.project = projectData.project;
      this.projectCode = projectData.code;
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

  formatter = (x: { username: string }) => x.username;

  saveUser() {
    if (this.model) {
      this.selectedUsers = [];
      this.selectedUsers.push(this.model);
      this.selectedUsers.filter((x) => {
        if (x) {
          this.project.authors += x.username + ",";
        }
      });
      this.updateProjectInfo();
    }
  }

  updateProjectInfo() {
    if (this.projectCode && this.project) {
      this.projectService.updateProject(this.project, this.projectCode);
      this.userMessage = 'success...project assigned to user';
      this.model = "";
    }
  }

  getUserPhoto(username: string) {
    const user = this.userDataSource.find(x => x.username === username);
    return user.photo;
  }
}
