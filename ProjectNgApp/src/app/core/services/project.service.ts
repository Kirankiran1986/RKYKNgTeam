import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ProjectService {

    constructor(private firestore: AngularFirestore) { }

    getProjects() {
        return this.firestore.collection('projects').snapshotChanges();
    }

    createProject(project: Project) {
        return this.firestore.collection('projects').add(project);
    }

    updateProject(project: Project, id: string) {
        this.firestore.doc('projects/' + id).update(project);
    }
}

