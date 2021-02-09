import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs";

import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap, first, map } from "rxjs/operators";

import { Profile } from "./user.model";
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {Inject, OnInit, PLATFORM_ID} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

  private userSource = new BehaviorSubject<any>(undefined)
  loggedUser = this.userSource.asObservable()

  user$ : Observable<Profile | null | undefined> =  new Observable();
  userState$: Observable<firebase.User | null>

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platformId: any) {

      this.userState$ = auth.authState
      if(!this.isFullyLoggedIn()) {
        this.anonymousSignIn()

        this.user$ = auth.authState.pipe(
          switchMap(user => {
            if(user){
              return this.firestore.doc<Profile>(`profiles/${user.uid}`).valueChanges()
            } else {
              return of(undefined)
            }
          })
        )

        this.user$.subscribe(user => {
          if(user && user._id && user.username){
            this.changeUser(user)
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('user', JSON.stringify(user));
            }
          } else {
            if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('user')
            }
          }
        })
      }
    }


    isLoggedIn() {
      return this.auth.authState.pipe(first())
    }

    isFullyLoggedIn(){
      if (isPlatformBrowser(this.platformId)) {
      const cache = localStorage.getItem('user')
      if(cache){
        const user = JSON.parse(cache)
        this.changeUser(user)
        return true
      } else {
        return false
      }
    }
    return false;
    }

    changeUser(user: any){
      this.userSource.next(user)
    }

    async anonymousSignIn(){
      this.auth.signInAnonymously()
    }

    async googleSignIn(){
      const provider = new firebase.auth.GoogleAuthProvider()
      const credentials = await this.auth.signInWithPopup(provider)
      this.updateUserData(credentials.user)
    }

    async googleRegister(fields:any){
      const provider = new firebase.auth.GoogleAuthProvider()
      const credentials = await this.auth.signInWithPopup(provider)
      this.createUserData(credentials.user, fields)
    }

    async signOut(){
      await this.anonymousSignIn()
      if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      }
      this.changeUser(undefined)
      return this.router.navigate(['/'])
    }

    private createUserData(user: any, fields: any){
      const userRef : AngularFirestoreDocument<Profile> = this.firestore.doc(`profiles/${user.uid}`)

      const data = {
        _id : user.uid,
        created: new Date(),
        lastSignedIn: new Date(),
        email: user.email,
        avatar: "https://www.gstatic.com/stadia/gamers/avatars/xxhdpi/avatar_01.png",
        stadiaId: fields.stadiaId,
        username: fields.username,
        platform: "web"
      }
      userRef.get().subscribe(result => {
        if(!result.exists){
          userRef.set(data)
        }
      })
    }

    private updateUserData(user: any){
      const userRef : AngularFirestoreDocument = this.firestore.doc(`profiles/${user.uid}`)

      userRef.get().subscribe(result => {
        if(result.exists){
          userRef.set({
            lastSignedIn: new Date(),
            platform: "web"
          }, {merge: true})
        } else {
          userRef.set({
            _id : user.uid,
            created: new Date(),
            lastSignedIn: new Date(),
            email: user.email,
            avatar: "",
            stadiaId: "",
            username: "",
            platform: "web",
          })
        }
      })
    }

}
