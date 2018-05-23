import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CurrentUser, NewUser,BasicUser } from '../models/index';

@Injectable()
export class UserService {
 
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<BasicUser[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    update(user: CurrentUser) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }

    createNewUser(user: NewUser) {
        return this.http.post(`${environment.API_URL}/user/newuser`, user);
    }

    confirmEmail(email: string, token: string) {
        return this.http.post(`${environment.API_URL}/user/confirm`, {'email': email, 'token': token});
    }

    aprove(user: BasicUser) {
        return this.http.put('/api/users/' + user.id, user);
    }


    
}