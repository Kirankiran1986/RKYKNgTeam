//user model
export class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    skype: string;
    contact: number;
    location: string;
    designation: string;
    isActive: boolean;
    photo: string;
    role: string;
    skills?: string;
    createdDate: Date;
    modifiedDate: Date;
}


export interface UserList {
    userid: string;
    userName: string;
    email: string;
    skype: string;
    location: string;
    designation: string;
    photo: string;
    contact: number;
}