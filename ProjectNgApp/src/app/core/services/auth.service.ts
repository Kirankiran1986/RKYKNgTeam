import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { CookieService } from '../services/cookie.service';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    user: User;
    users: User[] = [];

    constructor(private userService: UserService, private cookieService: CookieService) {
    }

    /** Returns the current user */
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {        
        this.userService.getUsers().subscribe(data => {
            this.users = data.map(e => {
                return {
                    ...e.payload.doc.data() as User
                };
            })
        });

        const user = this.users && this.users.length && this.users.find(x => x.email === email && x.password === password);
        if (!user) { return this.error('Email or password is incorrect'); }
        //login successful if there's a jwt token in the response
        if (user) {
            this.user = user;
            // store user details and jwt in cookie
            this.cookieService.setCookie('currentUser', JSON.stringify(user), 1);
        }
        return this.ok(user);
    }

    ok(body) {
        return of(new HttpResponse({ status: 200, body }));
    }

    unauthorised() {
        return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    error(message) {
        return throwError({ status: 400, error: { message } });
    }
    /** Logout the user */
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.user = null;
    }
}

