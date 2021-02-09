import { Component, OnInit, Sanitizer } from '@angular/core';

import { SeoService } from "../seo/seo.service";

import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { LeaderboardService } from '../services/leaderboard/leaderboard.service';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../assets/styles/games.component.sass', './home.component.sass' ]
})
export class HomeComponent implements OnInit {

  meta_data = {
    title: 'Stadia Hunters | Stadia Achievement Tracking and Guides',
    description: 'Stadia Hunters is the community of Stadia achievement hunters available on Web and Android. Find all the secret achievements with guides, reporting bugged , seperationg by dlc requirements and more. Join the community of achievement hunters on Stadia.',
    image:'https://firebasestorage.googleapis.com/v0/b/stadiaachievements-34145.appspot.com/o/Achievements%20%26%20Guides%20(7).png?alt=media&token=64343a06-8dcd-45f6-bf80-ee6b34de4ab4', 
  }

  recentGames: any
  recentGameGuides: any
  recentVideos : any
  recentAchievementGuides: any
  missingAchievements: any

  overallLeaderboard: any
  yearLeaderboard: any
  monthLeaderboard: any

  constructor(
    private seo: SeoService,
    private firestore: AngularFirestore,
    private leadeboardService: LeaderboardService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.seo.generateTags(this.meta_data)
    this.fetch()
  }

  fetch(){
    this.fetchMissingAchievements()
    this.overallLeaderboard = this.fetchLeaderboards('score')
    this.yearLeaderboard = this.fetchLeaderboards('year_score')
    this.monthLeaderboard = this.fetchLeaderboards('month_score')
    this.fetchGameGuides()
    this.fetchVideos()
    this.fetchUserGuides()
    this.fetchRecentGames()
  }

  fetchMissingAchievements(){
    this.missingAchievements = this.firestore.collection('missing').snapshotChanges().pipe(
      map(actions => this.parseData(actions))
    );
  }

  fetchRecentGames(){
    this.recentGames = this.firestore.collection('games', res => {
      return res.orderBy('launchDate', 'desc').limit(12)
    }).snapshotChanges().pipe(
      map(actions => this.parseData(actions))
    );
  }

  fetchGameGuides(){
    this.recentGameGuides = this.firestore.collection('guides', res => {
      return res.orderBy('created', 'desc').limit(4)
    }).snapshotChanges().pipe(
      map(actions => this.parseData(actions))
    );
  }

  fetchVideos(){
    this.recentVideos = this.firestore.collection('videos', res => {
      return res.orderBy('created', 'desc').limit(4)
    }).snapshotChanges().pipe(
      map(actions => this.parseData(actions))
    );
  }

  fetchUserGuides(){
    this.recentAchievementGuides = this.firestore.collection('highlight', res => {
      return res.orderBy('created', 'desc').limit(6)
    }).snapshotChanges().pipe(
      map(actions => this.parseData(actions))
    );
  }

  fetchLeaderboards(field: string){
      return this.firestore.collection('profiles', res => {
        return res.orderBy(field, 'desc').limit(10)
      }).snapshotChanges().pipe(
        map(actions => this.parseData(actions))
      );
  }

  getMonth(){
    return this.leadeboardService.getMonth()
  }

  getYear(){
    return this.leadeboardService.getYear()
  }

  parseData(actions:any) : any {
    return actions.map(a => {
      const data = a.payload.doc.data() as any
      const doc = a.payload.doc
      return { _id: doc.id, ...data, doc }
    })
  }
}
