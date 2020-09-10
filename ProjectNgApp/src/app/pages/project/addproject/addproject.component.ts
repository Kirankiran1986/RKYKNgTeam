import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss']
})
export class AddprojectComponent implements OnInit {
  projectForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  loading = false;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    // this.projectForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', Validators.required],
    // });

  }

  /**
   * On submit form
   */
  onSubmit() {
    // this.submitted = true;

    // // stop here if form is invalid
    // // if (this.projectForm.invalid) {
    // //   return;
    // // }

    // this.loading = true;
    // this.projectService.addProject().pipe(first())
    // .subscribe(
    //   data => {
    //     this.router.navigate(['listproject']);
    //     this.loading = false;
    //   },
    //   error => {
    //     this.error = error;
    //     this.loading = false;
    //   });
    // //this.router.navigate(['listproject']);
    // this.loading = false;
  }

}
