import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { environment } from "../../environments/environment";
import { StorageService } from "./storage.service";

import { CredenciaisDTO } from "../models/credenciais.dto";
import { CurrentUser } from "../models/current_user";


@Injectable()
export class AuthService {

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private router: Router,
        public http: HttpClient,         
        public storage: StorageService) {
    }

    authenticate(creds : CredenciaisDTO) {
        return this.http.post(`${environment.API_URL}/login`, creds, {
                    observe: 'response',
                    responseType: 'text'
                });
    }

    refreshToken() {
        return this.http.post(
            `${environment.API_URL}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue : string) {
        let token = this.jwtHelper.decodeToken(authorizationValue).sub;
        let val = token.split(";");
        
        let tok = authorizationValue.substring(7);
        let user : CurrentUser = {
            id      : val[0],            
            token   : tok,
            username: val[1],
            email   : val[2],
            lang    : val[3]
        };
        this.storage.setCurrentUser(user);
    }

    logout() {
        this.storage.setCurrentUser(null);
        this.router.navigate(['/login']);
    }
}