import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { AuthService } from "../../providers/auth.service.ts.service";
import { AngularFirestore } from '@angular/fire/firestore';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsergameService {

  private userGameSource = new BehaviorSubject<any>(undefined)

  currentUserGame = this.userGameSource.asObservable()

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore
  ) { }

  changeUserGame(userGame:any){
    this.userGameSource.next(userGame)
  }

  fetchUserGame(userId: string, gameId: string){
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
            this.firestore.collection('profiles').doc(userId).collection('games').doc(gameId).get().subscribe(res =>{
              if(res !== undefined){
                this.changeUserGame(res.data())
              }
            })
        } else {
          this.auth.anonymousSignIn()
        }
      })
    ).subscribe()
  }
}
