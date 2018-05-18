import { Inject, Injectable } from "@angular/core";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { CurrentUser } from "../models/current_user";

@Injectable()
export class StorageService {

    private data:any=[];

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
 
    }

    getCurrentUser() : CurrentUser {
        let usr = localStorage.getItem(STORAGE_KEYS.currentUser);
        if (usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setCurrentUser(obj : CurrentUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.currentUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(obj));
        }
    }

    setTemporaryInLocal(key, val) : void {
        console.log('recieved= key:' + key + 'value:' + val);
        localStorage.setItem(key, val);
        this.data[key]= localStorage.getItem(key);
    }

    getTemporaryInLocal(key) : string {
        let val = localStorage.getItem(key);
        if (val == null) {
            return null;
        } else {
            return val;
        }
    }

    removeTemporaryInLocal(key) : void {
        localStorage.removeItem(key);
    }
}