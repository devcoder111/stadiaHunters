import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GameDataService } from "../services/game/game-data.service";
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from "../providers/auth.service.ts.service";
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.sass']
})
export class GameDetailsComponent implements OnInit {

  game: any;
  usergame: any;

  constructor(
    private auth: AuthService,
    private data : GameDataService, 
    private router: Router, 
    private route: ActivatedRoute,
    private firestore: AngularFirestore, 
    ) {
   }

  ngOnInit(): void {
    this.data.currentGame.subscribe(game => { 
      if(game){
        this.game = game
      } else if(!this.game){
        this.fetchGame()
      }
    })
  }

  fetchGame(){
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
            const tag = this.route.snapshot.paramMap.get('tag');
            const gameId = this.route.snapshot.paramMap.get('gameId');
          if(tag){
            this.firestore.collection('games', ref => ref.where('tag', '==', tag)).valueChanges().subscribe(games =>{
              if(games[0] !== undefined){
                this.data.changeGame(games[0])
              }
            })
          } else if(gameId){
            this.firestore.collection('games').doc(gameId).get().subscribe(res =>{
              let data: any = res.data()
              data._id = res.id
              this.data.changeGame(data)
              });
          }
        } else {
          this.auth.anonymousSignIn()
        }
      })
    ).subscribe()
  }

  buildValue(value: any){
    if(value){
      return value
    } else {
      return 0
    }
  }

  navigateToGame(){
    this.router.navigate([`/game/${this.game.tag}/achievements`])
  }
}
