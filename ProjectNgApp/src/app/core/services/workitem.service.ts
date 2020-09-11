import { Injectable } from '@angular/core';
import { WorkItem } from '../models/workitem.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class WorkItemService {

  constructor(private firestore: AngularFirestore) { }

  getWorkItems() {
    return this.firestore.collection('workItem').snapshotChanges();
  }

  createWorkItem(workItem: WorkItem) {
    return this.firestore.collection('workItem').add(workItem);
  }

  // updatePolicy(policy: Policy) {
  //   delete policy.id;
  //   this.firestore.doc('policies/' + policy.id).update(policy);
  // }
}
