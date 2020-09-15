import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/storage";

@Injectable({ providedIn: 'root' })
export class UserService {
    n = Date.now();
    filePath = `UserPhotos/${this.n}`;

    constructor(private firestore: AngularFirestore, private store: AngularFireStorage) { }

    getUsers() {
        return this.firestore.collection('users').snapshotChanges();
    }

    getUserById(id: string): Promise<User> {
        return this.firestore.collection('users').doc(id).ref.get().then(function (doc) {
            if (doc.exists) {
                return doc.data() as User;
            }
        })
    }

    createUser(user: User) {
        return this.firestore.collection('users').add(user);
    }

    updateUser(user: User, id: string) {
        this.firestore.doc('users/' + id).update(user);
    }

    uploadPhoto(photo: File): AngularFireUploadTask {
        return this.store.upload(this.filePath, photo);
    }

    getUserPhotoRef(): AngularFireStorageReference {
        return this.store.ref(this.filePath);
    }
}