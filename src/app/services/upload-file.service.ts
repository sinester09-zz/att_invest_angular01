import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
@Injectable()
export class UploadFileService {
 
  constructor(private http: HttpClient) { }
 
  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    //const req = new HttpRequest('POST', `${environment.API_URL}/doc`, formdata, {
      //reportProgress: true,
      ///responseType: 'text'
    //});

    return this.http.post(`${environment.API_URL}/doc`, formdata);
  }
 
  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
}