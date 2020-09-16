import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkItemService } from 'src/app/core/services/workitem.service';
import { WorkItem } from 'src/app/core/models/workitem.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize, debounceTime, map } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  workItemForm: FormGroup;
  workItemId: string;
  workItemList: any = [];
  workItem: any = [];
  fileUrl: string = ""
  userDataSource: any = [];
  loading: boolean = false;

  constructor(private workItemService: WorkItemService, private userService: UserService, private formBuilder: FormBuilder, private actRoute: ActivatedRoute) {
    this.workItemId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.workItemForm = this.formBuilder.group({
      workItemId: [''],
      title: ['', Validators.required],
      description: [''],
      workItemType: [''],
      status: ['', Validators.required],
      iteration: [''],
      priority: ['', Validators.required],
      originalEstimate: [''],
      remainingHours: [''],
      completedHours: [''],
      userName: ['', Validators.required]
    });

    this.userService.getUsers().subscribe(data => {
      this.userDataSource = [];
      data.map(e => {
        const userList = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as User });
        if (userList && userList.role.toLowerCase() !== 'admin') {
          this.userDataSource.push({ username: userList.firstName + " " + userList.lastName, photo: userList.photo });
        }
      });
    });

    // this.workItemService.getWorkItems().subscribe(data => {
    //   data.map(e => {
    //     const workItems = Object.assign({ uid: e.payload.doc.id }, { ...e.payload.doc.data() as WorkItem });
    //     if (workItems) {
    //       this.workItemList.push(workItems);
    //     }
    //   });

    //   this.workItem = this.workItemList.find(x => x.workItemId === this.workItemId);
    // });


    if (this.workItemId) {
      this.workItemService.getWorkItemsById(this.workItemId).then((workItem) => {
        console.log(workItem);
        this.workItemForm.patchValue({
          workItemId: workItem.workItemId,
          title: workItem.title,
          description: workItem.description,
          status: workItem.status,
          iteration: workItem.iteration,
          priority: workItem.priority,
          workItemType: workItem.workItemType,
          originalEstimate: workItem.originalEstimate,
          remainingHours: workItem.remainingHours,
          completedHours: workItem.completedHours,
          userName: workItem.userName
        });
      });
    }
  }

  get f() { return this.workItemForm.controls; }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.userDataSource.filter(v => v.username.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  formatter = (x: { username: string }) => x.username;

  onSave(): void {
    this.loading = true;
    if (this.workItemForm.invalid) {
      this.loading = false;
      return;
    }

    let workItemData: WorkItem;
    if (this.workItemId) {
      this.workItemService.getWorkItemsById(this.workItemId).then((workItem) => {
        workItemData = workItem;

        workItemData.title = this.workItemForm.controls.title.value;
        workItemData.description = this.workItemForm.controls.description.value;
        workItemData.status = this.workItemForm.controls.status.value;
        workItemData.iteration = this.workItemForm.controls.iteration.value;
        workItemData.userName = this.workItemForm.controls.userName.value;
        workItemData.priority = this.workItemForm.controls.priority.value;
        workItemData.originalEstimate = this.workItemForm.controls.originalEstimate.value;
        workItemData.remainingHours = this.workItemForm.controls.remainingHours.value;
        workItemData.completedHours = this.workItemForm.controls.completedHours.value;

        this.workItemService.updateWorkItem(workItemData, this.workItemId);
        this.loading = false;
      });
    }
  }

  onFileSelected(event) {
    if (event && event.target.files.length > 0) {
      const file = event.target.files[0];
      const task = this.workItemService.uploadFile(file);
      task.snapshotChanges().pipe(finalize(() => {
        const downloadURL = this.workItemService.getUploadFileRef().getDownloadURL();
        downloadURL.subscribe(url => {
          this.fileUrl = url;
        });
      })
      ).subscribe();
    }
  }
}
