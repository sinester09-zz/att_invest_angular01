import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from '../services/upload-file.service';


@Component({
  selector: 'app-docs-user',
  templateUrl: './docs-user.component.html',
  styles: [],
  providers: [UploadFileService]
})
export class DocsUserComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
 
  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
  
        console.log('File is completely uploaded!');
      
    });
 
    this.selectedFiles = undefined;
  }
}
