import { Injectable } from '@angular/core';
import { WorkItem } from '../models/workitem.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireUploadTask, AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class WorkItemService {
  n = Date.now();
  filePath = `WorkItemFiles/${this.n}`;

  constructor(private firestore: AngularFirestore, private store: AngularFireStorage) { }

  getWorkItems() {
    return this.firestore.collection('workItem').snapshotChanges();
  }

  getWorkItemsById(id: string): Promise<WorkItem> {
    return this.firestore.collection('workItem').doc(id).ref.get().then(function (doc) {
      if (doc.exists) {
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

  uploadFile(file: File): AngularFireUploadTask {
    return this.store.upload(this.filePath, file);
  }

  getUploadFileRef(): AngularFireStorageReference {
    return this.store.ref(this.filePath);
  }
}
