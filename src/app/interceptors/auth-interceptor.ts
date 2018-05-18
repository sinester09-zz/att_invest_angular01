import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { environment } from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUser = this.storage.getCurrentUser();

        let N = environment.API_URL.length;
        let requestToAPI = req.url.substring(0, N) == environment.API_URL;

        if (currentUser && requestToAPI) {
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + currentUser.token)});
            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};