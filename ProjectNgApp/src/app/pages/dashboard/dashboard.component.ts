import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/core/models/project.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { WorkItem } from 'src/app/core/models/workitem.model';
import { WorkItemService } from 'src/app/core/services/workitem.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private projectService: ProjectService,
    private workItemService: WorkItemService) { }

  loading = true;
  projects: Project[] = [];
  project: Project = new Project();
  workItems: any = [];
  currentUser: User;

  lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 20,
          suggestedMax: 50
        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'workitems/hour' },
  ];

  lineChartDataItem = [];

  lineChartLabels: Label[] = [];


  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUser();

    this.projectService.getProjects().subscribe(data => {
      this.projects = [];
      data.map(e => {
        const projectList = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as Project });
        if (projectList && (projectList.authors.split(',').indexOf(this.currentUser.firstName + ' ' + this.currentUser.lastName) >= 0 || this.currentUser.role.toLowerCase() === 'admin')) {
          this.projects.push({
            id: projectList.id,
            name: projectList.name,
            description: projectList.description,
            languages: projectList.languages,
            authors: projectList.authors,
            status: projectList.status,
            startDate: projectList.startDate,
            releaseDate: projectList.releaseDate,
            createdDate: projectList.createdDate,
            modifiedDate: projectList.modifiedDate
          });

          this.lineChartLabels.push(projectList.name);
        }
        this.loading = false;
      });
    });

    this.workItemService.getWorkItems().subscribe(data => {
      this.workItems = [];
      data.map(e => {
        const workitemList = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as WorkItem });
        if (workitemList && (workitemList.userName.indexOf(this.currentUser.firstName + ' ' + this.currentUser.lastName) >= 0 || this.currentUser.role.toLowerCase() === 'admin')) {
          this.workItems.push({
            uid: workitemList.uid,
            workItemId: workitemList.workItemId,
            title: workitemList.title,
            description: workitemList.description,
            workItemType: workitemList.workItemType,
            status: workitemList.status,
            createdDate: workitemList.createdDate,
            modifiedDate: workitemList.modifiedDate
          });

          this.lineChartDataItem.push(workitemList.originalEstimate);
        }
      })
      this.lineChartData[0].data = this.lineChartDataItem;
      this.loading = false;
    });
  }

}
