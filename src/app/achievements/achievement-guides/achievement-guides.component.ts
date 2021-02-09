import { Component, OnInit } from '@angular/core';
import { SeoService } from "../../seo/seo.service";

import { UserService } from "../../services/user/user.service";
import { GameDataService } from "../../services/game/game-data.service";
import { AchievementService } from "../../services/achievement/achievement.service";

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { PaginationService } from "../../services/pagination/pagination.service";

import { AuthService } from "../../providers/auth.service.ts.service";
import { BehaviorSubject } from "rxjs";
import { tap } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { CommentModalComponent } from "../comment-modal/comment-modal.component";

@Component({
  selector: 'app-achievement-guides',
  templateUrl: './achievement-guides.component.html',
  styleUrls: ['./achievement-guides.component.sass']
})
export class AchievementGuidesComponent implements OnInit {

  game: any
  achievement: any

  user: any

  private firstAchieversSource = new BehaviorSubject<any>(undefined)
  firstAchievers = this.firstAchieversSource.asObservable()

  private latestAchieversSource = new BehaviorSubject<any>(undefined)
  latestAchievers = this.latestAchieversSource.asObservable()

  constructor(
    private seo: SeoService,

    private userService: UserService,
    private gameService: GameDataService, 
    private achievementService: AchievementService,

    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,

    private dialog: MatDialog,
    public page: PaginationService
  ) { }

  ngOnInit(): void {
    this.initTags()
    this.gameService.currentGame.subscribe(game => { 
      if(game){
        this.game = game
        this.observeAchievement()
      }
    })
  }

  initTags(){
    const tag = this.route.parent?.snapshot.paramMap.get('tag')
    const name = this.route.snapshot.paramMap.get('name')
    if(tag && name){
      this.generateAchievementTags(this.gameService.buildGameName(tag), this.gameService.buildGameBanner(tag), this.achievementService.buildAchievementName(name), "")
    }
  }

  observeAchievement(){
    this.auth.loggedUser.subscribe(user => {
      this.user = user
    })
    this.achievementService.currentAchievement.subscribe(achiev => {
      if(achiev){
        this.achievement = achiev
        this.generateAchievementTags(this.game.name, achiev.icon, achiev.title, achiev.subtitle)
        this.fetchComments()
        this.fetchAchievers(true)
        this.fetchAchievers(false)
      } else if(!this.achievement) {
        this.fetchAchievement()
      }
    })
  }

  fetchAchievement(){

    const id = this.route.snapshot.paramMap.get('id');
    if(id !== null){
      this.firestore.collection('games').doc(this.game._id).collection('achievement').doc(id).get().pipe(
        tap( arr =>{
          let data = arr.data()
          if(data){
            this.achievementService.changeAchievement(data)
          }
        })
      ).subscribe();
    }
  }

  fetchAchievers(first: boolean){
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== null){
      this.firestore.collection('games').doc(this.game._id).collection('achievement').doc(id).collection('players', ref => {
        return ref.orderBy('completed', first ? "asc" : "desc").limit(10)
      })
      .snapshotChanges().pipe(
        tap(arr => {
          let values = arr.map(snap => {
            const data = snap.payload.doc.data()
            const doc = snap.payload.doc
            return { _id: doc.id, ...data,}
          })
          if(first){
            this.firstAchieversSource.next(values)
          } else {
            this.latestAchieversSource.next(values)
          }
        })
      ).subscribe()
    }
  }

  generateAchievementTags(game: string, banner: string, title: string, subtitle: string){
    let data = {
      title: `${title} achievement in ${game} | Stadia Hunters`,
      description: `${title} achievement in ${game} ${subtitle}. Find guides to this achievement here.`,
      image: banner, 
    }
    this.seo.generateTags(data)
  }

  fetchComments(){
    const id = this.route.snapshot.paramMap.get('id');
    this.page.init(`games/${this.game._id}/achievement/${id}/comments`, 'created', { limit: 20, reverse: true, prepend: false })
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      console.log('more')
      this.page.more()
    }
  }

  redirect(data:any){
    console.log(data)
    var username = data.name
    if (data.tag != "0000") {
        username += `-${data.tag}`
    }
    this.userService.changeUser(undefined)
    this.userService.fetchUserByStadiaId(data)
    this.router.navigate([`/user/${username}`]);
  }

  signIn(){
    this.router.navigate([`/login`]);
  }

  buildCommentModal(){
    const dialogRef = this.dialog.open(CommentModalComponent, {
      data: {type: 'comment'}
    });
  }
}
