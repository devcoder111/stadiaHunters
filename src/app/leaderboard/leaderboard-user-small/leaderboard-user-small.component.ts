import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'leaderboard-user-small',
  templateUrl: './leaderboard-user-small.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class LeaderboardUserSmallComponent implements OnInit {
  
  @Input('index') index: any;
  @Input('filter') filter: string = 'overall';
  @Input('data') data: any;

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  buildRoute(){
    return `/user/${this.data.username.replace('#','-')}`
  }

  changeUser(){
    console.log(this.data)
    this.user.changeUser(this.data)
  }

}
