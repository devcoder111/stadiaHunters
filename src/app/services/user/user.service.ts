import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { SeoService } from "../../seo/seo.service";
import { AuthService } from "../../providers/auth.service.ts.service";
import { AngularFirestore } from '@angular/fire/firestore';

import { tap } from 'rxjs/operators';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject<any>(undefined)

  currentUser = this.userSource.asObservable()

  constructor(
    private seo: SeoService,
    private auth: AuthService,
    private firestore: AngularFirestore
  ) { }

  changeUser(user: any){
    this.userSource.next(user)
    if(user) {
      this.buildSeoTags(user)
    }
  }

  fetchUserByUsername(username: string){
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          if(username){
            this.firestore.collection('profiles', ref => ref.where('username', '==', username)).valueChanges().subscribe(users =>{
              if(users[0] !== undefined){
                this.changeUser(users[0])
              }
            })
          }
        } else {
          this.auth.anonymousSignIn()
        }
      })
    ).subscribe()
  }

  fetchUserByStadiaId(user: Player){
    let id = user._id
    let username = this.buildUsername(user.name, user.tag)
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          if(id){
            this.firestore.collection(`profiles`).doc(id).get().subscribe(res =>{
              if(res !== undefined){
                let data = res.data() as any
                if(username !== data.username){
                  this.updateUser(id, username)
                  data.username = username
                }
                this.changeUser(data)
              }
            })
          }
        } else {
          this.auth.anonymousSignIn()
        }
      })
    ).subscribe()
  }

  updateUser(id:string, username: string){
    console.log(username)
    this.firestore.collection(`profiles`).doc(id).update({username: username})
  }

  buildUsername(name:string, tag:String){
    var username = name
    if (tag != "0000") {
        username += `#${tag}`
    }
    return username
  }

  buildSeoTags(user:any){
    let username = user.username.replace("#", "-")
    let meta_data = {
      title: `${username}'s profile | Stadia Hunters`,
      description: `An overview of ${username}'s gaming activity. Earned a total of ${user.achievements_completed} achievements, completed ${user.games_completed} and currently is rank ${user.rank} on the overall leaderboard.`,
      image: user.avatar, 
    }
    this.seo.generateTags(meta_data)
  }
}
