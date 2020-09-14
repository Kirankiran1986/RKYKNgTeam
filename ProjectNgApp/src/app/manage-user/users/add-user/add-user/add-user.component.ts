import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { MessageType } from "src/app/core/models/common.enum";
import { UserService } from 'src/app/core/services/user.service';
import { finalize } from "rxjs/operators";
import { errorMessage, userAddedSuccessMessage } from 'src/app/core/models/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  /** local variables for form component */
  registerForm: FormGroup;
  submitted = false;
  viewMode = false;
  formMode = "";
  userPhotoUrl: string = null;
  loading = false;
  message: string = '';
  messageType: string = '';
  userId: string;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder, private actRoute: ActivatedRoute) {
    this.userId = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.showLoading();

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      designation: ['', Validators.required],
      skype: ['', Validators.required],
      contact: ['', Validators.required],
      location: ['', Validators.required],
      photo: ['', this.userId && this.userPhotoUrl ? '' : Validators.required],
      isActive: [false, Validators.requiredTrue]
    });

    if (this.userId) {
      this.viewMode = true;

      this.userService.getUserById(this.userId).then((user) => {
        this.registerForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          designation: user.designation,
          skype: user.skype,
          contact: user.contact,
          location: user.location,
          isActive: user.isActive,
          photo: user.photo
        });
        this.userPhotoUrl = user.photo;
      });
    }

    this.hideLoading();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.showLoading();
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.hideLoading();
      return;
    }

    let user: User = {
      ...this.registerForm.value,
      photo: this.userPhotoUrl,
      role: 'USER',
      skills: "",
      createdDate: new Date(),
      modifiedDate: new Date()
    };

    if (user) {
      if (!this.userId) {
        this.userService.createUser(user).then(options => {
          if (options && options.path && options.path.length > 0) {
            // display form values on success
            this.messageType = MessageType.SUCCESS;
            this.message = userAddedSuccessMessage;
          }
          else {
            // display form values on success
            this.messageType = MessageType.ERROR;
            this.message = errorMessage;
          }
        });
      }
      else {
        this.userService.updateUser(user, this.userId);
        // display form values on success
        this.messageType = MessageType.SUCCESS;
        this.message = userAddedSuccessMessage;
      }
    }

    this.hideLoading();
  }

  onReset(forceRest?: boolean) {
    if (this.userId && !forceRest) {
      return false;
    }
    this.submitted = false;
    this.viewMode = false;
    this.userPhotoUrl = "";
    this.message = '';
    this.messageType = '';
    this.registerForm.reset();
  }

  onFileSelected(event) {
    if (event && event.target.files.length > 0) {
      const file = event.target.files[0];
      const task = this.userService.uploadPhoto(file);
      task.snapshotChanges().pipe(finalize(() => {
        const downloadURL = this.userService.getUserPhotoRef().getDownloadURL();
        downloadURL.subscribe(url => {
          this.userPhotoUrl = url;
        });
      })
      ).subscribe();
    }
  }

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  onEdit() {
    this.viewMode = false;
  }
}
