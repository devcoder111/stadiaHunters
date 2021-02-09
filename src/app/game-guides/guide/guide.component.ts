import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer,SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.sass']
})
export class GuideComponent implements OnInit {

  @Input('guide') guide: any
  url: SafeResourceUrl = "";

  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.guide.text); 
  }

}
