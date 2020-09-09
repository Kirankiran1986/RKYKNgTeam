import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(private firestore: AngularFirestore) { }

    getUsers() {
        return this.firestore.collection('users').snapshotChanges();
    }

    createUser(user: User) {
        return this.firestore.collection('users').add(user);
    }
}