import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from "../providers/auth.service.ts.service";
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: []
})
export class FaqComponent implements OnInit {

  questions: any

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.fetchFaq()
  }

  fetchFaq(){
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          this.firestore.collection('faq').valueChanges().subscribe(faq =>{
        
            this.questions = faq
          })
        } else {
          this.auth.anonymousSignIn()
        }
      })
    ).subscribe()
  }
}
