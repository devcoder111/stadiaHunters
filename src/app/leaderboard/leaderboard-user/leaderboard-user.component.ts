import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from "../../services/user/user.service";

@Component({
  selector: 'leaderboard-user',
  templateUrl: './leaderboard-user.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class LeaderboardUserComponent implements OnInit {

  @Input('index') index: any;
  @Input('filter') filter: string = 'overall';
  @Input('data') data: any;
  @Input('isUser') isUser: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private user: UserService,
  ) { }

  ngOnInit(): void {
    this.updateRank()
  }

  updateRank(){
    switch(this.filter){
      case 'month':
        if(this.index !== this.data.month_rank && this.data.month_score > 0){
          this.data.month_rank = this.index
          this.updateUser(this.data._id, { month_rank: this.index })
        }
        break;
      case 'year':
        if(this.index !== this.data.year_rank && this.data.year_score > 0){
          this.data.year_rank = this.index
          this.updateUser(this.data._id, { year_rank: this.index })
        }
        break;
      case 'overall':
        if(this.index !== this.data.rank && this.data.score > 0){
          this.data.rank = this.index
          this.updateUser(this.data._id, { rank: this.index })
        }
        break;
      default:
        break
    }
  }

  buildRoute(){
    if(!this.data.username) return ''
    let username = this.data.username.replace("#", "-")
    return `/user/${username}`
  }

  changeUser(){
    console.log(this.data)
    this.user.changeUser(this.data)
  }

  updateUser(id:string, update: any){

    this.firestore.collection(`profiles`).doc(id).update(update)
  }

}
