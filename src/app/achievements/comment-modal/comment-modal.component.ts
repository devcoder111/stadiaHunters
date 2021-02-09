import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { QuestionService } from './dynamic-form/question.service';
import { QuestionBase } from './dynamic-question/question-base';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { AuthService } from "../../providers/auth.service.ts.service";
import { GameDataService } from "../../services/game/game-data.service";
import { AchievementService } from "../../services/achievement/achievement.service";

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['../comment/comment.component.sass', '../../achievements/achievement-card/achievement-card.component.sass'],
})
export class CommentModalComponent implements OnInit {
  user: any
  game: any
  achievement: any

  questions$: QuestionBase<string>[] = [];
  responses$: Observable<any[]>;

  bugged: boolean = false
  missable: boolean = false
  dlc: boolean = false

  constructor(
    private dialogRef: MatDialogRef<CommentModalComponent>,
    private service: QuestionService,

    private firebase: AngularFirestore,

    private authService: AuthService,
    private gameService: GameDataService,
    private achievementService: AchievementService,

    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      service.getQuestions().subscribe(response => {
        this.questions$ = response
      });
      this.responses$ = service.getResponses();
    }

  ngOnInit(): void {
    this.authService.loggedUser.subscribe(user => this.user = user)
    this.gameService.currentGame.subscribe(game => this.game = game)
    this.achievementService.currentAchievement.subscribe(achievement => this.achievement = achievement)
  }

  buildTitle(): String{
    if(this.data.type == "comment"){
      return "Write an achievment guide"
    }
    if(this.data.type == "guide"){
      return "Write a game guide"
    }
    if(this.data.type == "review"){
      return "Write a game review"
    }

    return ""
  }

  addField(type: string){
    this.service.addQuestion(type)
  }

  removeField(){
    this.service.removeQuestion()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(){
    let content = this.service.responses$.filter(element => {
      return element.text.trim() != ""
    })

    let isValid = this.user && this.game && content.length > 0
    if(isValid){

      if(this.data.type == "comment" && this.achievement){
        this.submitComment(content)
      }
      if(this.data.type == "guide"){
        this.submitGuide(content)
      }
      if(this.data.type == "review"){
        this.submitReview(content)
      }
      this.onNoClick()
    }
  }

  submitGuide(content: any){
    let userGuide = {
      content: content,
      dlc: this.dlc,
      bugged: this.bugged,
      missable: this.missable,
      votes: 0,
      created: new Date(),
      text:"Game Guide",
      user: {
        _id: this.user._id,
        username: this.user.username,
        avatar: this.user.avatar,
        stadiaId: this.user.stadiaId,
      },
      game: {
        _id: this.game._id,
        tag: this.game.tag,
        banner: this.game.banner,
        name: this.game.name,
      }
    }
    let activityRef = this.firebase.collection('activity').doc()
    activityRef.set(userGuide)
    this.snackBar.open("Guide Submitted for approval", 'Dismiss')
  }

  submitReview(content: any){
    let userReview = {
      content: content,
      dlc: this.dlc,
      bugged: this.bugged,
      missable: this.missable,
      votes: 0,
      created: new Date(),
      text:"Game Review",
      user: {
        _id: this.user._id,
        username: this.user.username,
        avatar: this.user.avatar,
        stadiaId: this.user.stadiaId,
      },
      game: {
        _id: this.game._id,
        tag: this.game.tag,
        banner: this.game.banner,
        name: this.game.name,
      }
    }
    let activityRef = this.firebase.collection('activity').doc()
    activityRef.set(userReview)
    this.snackBar.open("Review Submitted for approval", 'Dismiss')
  }

  submitComment(content: any){
    let achievementRef = this.firebase.collection('games').doc(this.game._id).collection('achievement').doc(this.achievement._id)
    let profileRef = this.firebase.collection('profiles').doc(this.user._id)
    let userCommentsRef = profileRef.collection('comments').doc()
    let achievementCommentsRef = achievementRef.collection('comments').doc()
    let activityRef = this.firebase.collection('activity').doc()

    let comment = {
      content: content,
      text : content[0].text,
      dlc: this.dlc,
      bugged: this.bugged,
      missable: this.missable,
      votes: 0,
      created: new Date(),
      user: {
        _id: this.user._id,
        username: this.user.username,
        avatar: this.user.avatar,
        stadiaId: this.user.stadiaId,
      },
    }

    achievementRef.update({'comments': firebase.default.firestore.FieldValue.increment(1), })
    achievementCommentsRef.set(comment)

    let userComment = {
      game: {
        _id: this.game._id,
        tag: this.game.tag,
        banner: this.game.banner,
        name: this.game.name,
      },
      achievement:{
        _id: this.achievement._id,
        icon: this.achievement.icon,
        title: this.achievement.title,
        subtitle: this.achievement.subtitle,
      },
      ...comment
    }

    userCommentsRef.set(userComment)
    activityRef.set(userComment)

    profileRef.update({'comments': firebase.default.firestore.FieldValue.increment(1), })
  }
}
