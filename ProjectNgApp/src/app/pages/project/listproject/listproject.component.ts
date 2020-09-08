import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-listproject',
  templateUrl: './listproject.component.html',
  styleUrls: ['./listproject.component.scss']
})
export class ListprojectComponent implements OnInit {
  @ViewChild('agProjectGrid') agGrid: AgGridAngular;

  columnDefs = [
    {headerName: 'Project Name', field: 'Projectname', sortable: true, filter: true },
    {headerName: 'Project Type', field: 'Projecttype', sortable: true, filter: true },
    {headerName: 'Start Date', field: 'Startdate', sortable: true, filter: 'agDateColumnFilter'},
    {headerName: 'Actions', field: 'Actions', cellRenderer: function clickNextRendererFunc(){
      return "<button mat-stroked-button><mat-icon>Edit</mat-icon></button><button style='margin-left:10px;' mat-stroked-button><mat-icon>Delete</mat-icon></button>";}
    }
  ];

  rowData: any;
  errorMessage: string;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: projects => this.rowData = projects,
      error: err => this.errorMessage = err
    });
  }

}
