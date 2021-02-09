import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StatsService } from "../../services/global/stats.service";
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from "../../providers/auth.service.ts.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'stats-header',
  templateUrl: './stats-header.component.html',
  styleUrls: ['../../../assets/styles/leaderboard.sass']
})
export class StatsHeaderComponent implements OnInit {

  header: any
  players: any

  constructor(
    private data : StatsService,
    private auth: AuthService,
    private firestore: AngularFirestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const filter = this.route.snapshot.paramMap.get('filter');
    this.data.globalStats.subscribe(stats => { 
      console.log(stats)
      if(stats){
        switch(filter) { 
          case 'played': { 
            this.header = 'Most played Games'
            this.players = stats.total_timed_players
            break; 
          } 
          case 'owned': { 
            this.header = 'Most Owned Games'
            this.players = stats.total_game_players
             break; 
          }
          case 'completed': { 
            this.header = 'Most Completed Games'
            this.players = stats.total_game_players
            break; 
          } 
          default: { 
            this.header = 'Month Most Played Games'
            this.players = stats.total_month_timed_players
            console.log(stats)
            break; 
          } 
       }
      } else {
        this.fetchStats()
      }
    })
  }

  fetchStats(){
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          this.firestore.collection('global').doc('stats').get().subscribe(res =>(this.data.changeStats(res.data())));
        } else {
          this.auth.anonymousSignIn()
        }
      })
    ).subscribe()
  }

}
