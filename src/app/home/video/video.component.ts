import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'video',
  templateUrl: './video.component.html',
  styleUrls: []
})
export class VideoComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer) {
    }

  @Input('data') data: any
  url: SafeResourceUrl = "";

  ngOnInit(): void {
    console.log(this.data)
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url); 
  }
}
