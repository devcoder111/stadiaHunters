import {Component, OnInit, Input, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

export interface DialogData {
  url: string;
  isVideo: boolean;
}

@Component({
  selector: 'achievement-media',
  templateUrl: './achievement-media.component.html',
  styleUrls: ['./achievement-media.component.sass']
})
export class AchievementMediaComponent implements OnInit {

  @Input('media') media: any;
  @Input('isVideo') isVideo: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  buildMedia(){
    if(this.isVideo){
      let video = this.media.split('/')
      let params = video[video.length - 1].split("v=")
      let videoId = params[params.length - 1].slice(0, 11)
      return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`
    } else {
      return this.media
    }
  }

  expand(event: any){
    const dialogRef = this.dialog.open(MediaDialog, {
      data: {url: this.media, isVideo: this.isVideo}
    });
    event.stopPropagation()
  }

}

@Component({
  selector: 'media-dialog',
  templateUrl: 'achievement-media-dialog.component.html',
  styleUrls: ['./achievement-media.component.sass']
})
export class MediaDialog {

  constructor(
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<MediaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
      console.log('dialog ')
    }

  url: SafeResourceUrl = "";

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url + "?autoplay=1"); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
