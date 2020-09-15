import { Injectable } from '@angular/core';
import { WorkItem } from '../models/workitem.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class WorkItemService {

  constructor(private firestore: AngularFirestore) { }

  getWorkItems() {
    return this.firestore.collection('workItem').snapshotChanges();
  }

  getWorkItemsById(id: string): Promise<WorkItem> {
    return this.firestore.collection('WorkItem').doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log("doc");
        return doc.data() as WorkItem;
      }
    })
  }

  createWorkItem(workItem: WorkItem) {
    return this.firestore.collection('workItem').add(workItem);
  }

  updateWorkItem(workItem: WorkItem, id: string) {
    this.firestore.doc('workItem/' + id).update(workItem).then((data) => {
      console.log(data);
    })
  }
}
