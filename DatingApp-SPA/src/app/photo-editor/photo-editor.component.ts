import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { AuthService } from './../_services/Auth.service';
import { environment } from './../../environments/environment';
import { IPhoto } from './../_models/IPhoto';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: IPhoto[];
  @Output() mainPhotoChanged = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: IPhoto;

  constructor(private authService: AuthService, private detector: ChangeDetectorRef,
    private userService: UserService, private alertifyService: AlertifyService) {}

  ngOnInit() {
    this.intializeFileUploader();
  }

  intializeFileUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'users/' +
        this.authService.decodedToken.nameid +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      autoUpload: false,
      removeAfterUpload: true,
      allowedFileType: ['image'],
      maxFileSize: 10 * 1024 * 1024,
      itemAlias: 'PhotoFile'
    });
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onProgressAll = (progress: any) => this.detector.detectChanges();
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: IPhoto = JSON.parse(response);
        const photo: IPhoto = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setUserMainPhoto(photo: IPhoto) {
    this.userService.setUserMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(
      () => {
        this.currentMainPhoto = this.photos.filter(p => p.isMain)[0];
        this.currentMainPhoto.isMain = false;
        photo.isMain = true;
        this.mainPhotoChanged.emit(photo.url);
      },
      error => {
        this.alertifyService.error(error);
      });
  }
}
