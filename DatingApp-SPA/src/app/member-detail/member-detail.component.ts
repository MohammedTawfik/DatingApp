import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/User.service';
import { IUser } from './../_models/IUser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: IUser;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(userData => {
      this.user = userData['user'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imagePercent: 100,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getUserImages();
  }
  getUserImages(): any {
    const userImages = [];
    for (let index = 0; index < this.user.photos.length; index++) {
      userImages.push({
        small: this.user.photos[index].url,
        medium: this.user.photos[index].url,
        big: this.user.photos[index].url,
        description: this.user.photos[index].description
      });
    }
    return userImages;
  }

  // loadUser() {
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
  //     (user: IUser) => {
  //       this.user = user;
  //     },
  //     error => {
  //       this.alertifyService.error(error);
  //     }
  //   );
  // }
}
