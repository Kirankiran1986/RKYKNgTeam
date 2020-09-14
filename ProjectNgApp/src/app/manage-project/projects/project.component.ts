import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/core/models/project.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-projects',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    constructor(private projectService: ProjectService, private modalService: NgbModal) { }

    projectStatus: string[] = ['Not Started', 'On Hold', 'Off Track', 'At Risk', 'On Track'];
    projects:Project[] = [];

    message: string;
    messageType: string;
    loading = true;
    project: Project = new Project();

    ngOnInit(): void {
        this.projectService.getProjects().subscribe(data => {
            this.projects = data.map(e => {
                return {
                    ...e.payload.doc.data() as Project
                }
            });
        });
        this.loading = false;
    }

    open(content) {
        this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
    }

    onSubmit(addProjectForm: NgForm) {
        this.loading = true;
        if (addProjectForm && addProjectForm.value) {
            if (!addProjectForm.valid) {
                this.message = "please enter proper detail for project";
                this.messageType = "error";
            }

            let tempId: number = 1;

            if (this.projects.length > 0) {
                var ids = this.projects.map(x => x.id);
                tempId = Math.max(...ids) + 1;
            } else {
                tempId = 1;
            }

            const project: Project = {
                id: tempId,
                createdDate: new Date(),
                authors:'',
                description: addProjectForm.value.inputDescription,
                languages:addProjectForm.value.inputLanguages,
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
    }
}