import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.sass', '../../achievements/achievement-card/achievement-card.component.sass', '../../game-guides/guide/guide.component.sass']
})
export class CommentComponent implements OnInit {

  @Input('data') data: any;

  constructor() { }

  ngOnInit(): void {
  }

  buildUsername(){
    if(this.data.user){
      return this.data.user.username
    } else {
      return this.data.name
    }
  }

  buildAvatar(){
    if(this.data.user){
      return this.data.user.avatar
    } else {
      return ''
    }
  }

  buildDate(){
    if(this.data.created){
      var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      };
      var date = new Date(1970, 0, 1)
      date.setSeconds(this.data.created.seconds)
      var fmt = new Intl.DateTimeFormat('en-GB', options);
      return fmt.format(date);
    } else {
      return ''
    }
  }

}
