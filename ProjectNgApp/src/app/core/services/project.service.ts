import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IProject, Project } from '../models/project';
import { Observable, throwError, observable, empty, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectURL: string = '/api/projects';
  private projectAddURL: string = '/api/addproject';
  constructor(private http: HttpClient) { }
  private projects: IProject[] = [];

  getProjects(): Observable<IProject[]> {
    if(this.projects.length <= 0)
    {
      return this.http.get<IProject[]>(this.projectURL).pipe(
        tap(data => {
          this.projects.push(...data);
          return JSON.stringify(data);
        }),
        catchError(this.handleError)
      );
    }
    else
    {
      return of(this.projects);
    }
  }

  addProject() {
    return this.http.post<any>(this.projectAddURL, {})
    .pipe(map(result => {
      this.projects.push(result);
      return true;
    }))
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage= '';

    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
