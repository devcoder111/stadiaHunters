import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PaginationService } from "../services/pagination/pagination.service";
import { UserService } from "../services/user/user.service";
import { UsergameService } from "../services/usergame/usergame.service";
import { GameDataService} from "../services/game/game-data.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../providers/auth.service.ts.service';
import { SeoService } from '../seo/seo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass', '../game-details/game-details.component.sass']
})
export class ProfileComponent implements OnInit {

  user: any
  loggedUser: any 
  banner: string = ""

  showDropdown = false
  selected = 'launchDate'

  constructor( 
    private router: Router, 
    private route: ActivatedRoute,
    private gameData: GameDataService,
    private authService: AuthService,
    private userService: UserService,
    private userGameService: UsergameService,
    private firestore: AngularFirestore,
    private seo: SeoService,
    public page: PaginationService
  ) { }

  ngOnInit(): void {
    this.initTags()
    this.authService.loggedUser.subscribe(user => {
      this.loggedUser = user
    })
    this.userService.currentUser.subscribe(user => { 
      if(user && !this.user){
        this.user = user
        this.fetchGames()
        this.fetchLastPlayedGame()
      } else if(!this.user){
        this.fetchUser()
      }
    })
  }

  initTags(){
    const username = this.route.snapshot.paramMap.get('username')
    let meta_data = {
      title: `${username}'s profile | Stadia Hunters`,
      description: `An overview of ${username}'s gaming activity. Full list of games, achievement and rank on the month, year and overall leaderboard.`,
    }
    this.seo.generateTags(meta_data)
  }

  isUser(){
    if(this.user && this.loggedUser){
      return this.user._id == this.loggedUser._id
    } else {
      return false
    }
  }

  signOut(){
    this.authService.signOut()
  }

  stadiaLink(){
    return `https://stadia.google.com/profile/${this.user.stadiaId}/gameactivities/all`
  }

  fetchLastPlayedGame(){
    this.firestore.collection(`profiles/${this.user._id}/games`, ref => ref.limit(1).orderBy('last_played', 'desc')).valueChanges().subscribe(games =>{
      if(games[0] !== undefined){
        this.banner = (games[0] as any).banner
      }else {
        this.banner = "https://storage.googleapis.com/stadiaachievements-34145.appspot.com/banners/outcasters.jpg"
      }
    })
  }

  fetchUser(){
    const username = this.route.snapshot.paramMap.get('username')?.replace('-', '#');
    console.log(username)
    if(username) this.userService.fetchUserByUsername(username)
  }

  redirect(game_data:any){
    this.gameData.changeGame(undefined)
    this.userGameService.changeUserGame(game_data)
    this.router.navigate([`/game/${game_data.tag}/achievements/${this.user._id}`]);
  }

  buildHoursPlayed(){
    if(this.user.time_played){
      return `${Math.floor(this.user.time_played / 3600)} h`
    } else{
      return ''
    }
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

  showDialog() {
    this.showDropdown = !this.showDropdown
  }

  buildDropdownText(){
    switch (this.selected) {
      case 'last_played':
          return `Sort by : Last Played`
      case 'game_completed':
        return `Sort by : Completed`
      case 'achievements':
        return `Sort by : Achievements`
      case 'achievements_completed':
        return `Sort by : Achievements Completed`
      case 'time_played':
        return `Sort by : Most Played`
      case 'month':
        return `Sort by : Month Most Played`
      default:
        return `Sort by : Last Played` 
    }
  }

  sort(type: string){
    this.showDialog()
    if(type !== this.selected){
      this.selected = type
      this.fetchGames(type)
    }
  }

  fetchGames(field:string = "last_played", query:string = "", reverse: boolean = true){
    this.page.init(`profiles/${this.user._id}/games`, field, { limit: 36, reverse: reverse, prepend: false, sort: { field:'achievements', reverse: true } })
  }

  itemTrackBy(index: number, item) {
    return item._id;
  }
}
