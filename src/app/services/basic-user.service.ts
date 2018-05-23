import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {BasicUser,ComplUser,BankUser } from '../models/index';

@Injectable()
export class BasicUserService {
    constructor(private http: HttpClient) { }

    getById(id: number) {
        return this.http.get('/api/basic/' + id);
    }

    createBasicUser(user: BasicUser) {
        return this.http.post(`${environment.API_URL}/basic/newbasic`, user);
    }

    createCompleUser(user: ComplUser) {
        return this.http.post(`${environment.API_URL}/compl/insert`, user);
    }

    createBankUser(user: BankUser) {
        return this.http.post(`${environment.API_URL}/compl/insert`, user);
    }



   
}