import { Directive, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';
import { of } from 'rxjs';

@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter()
  
  constructor() { 
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event:any) {
    try {
      const top = document.documentElement.scrollTop
      const height = window.innerHeight
      const offset = document.body.offsetHeight
      // emit bottom event

      if (top > offset - height - 1) {
        this.scrollPosition.emit('bottom')
      }

      // emit top event
      if (top === 0) {
        this.scrollPosition.emit('top')
      }

    } catch (err) {
      console.log('err')
    }
  }

}
