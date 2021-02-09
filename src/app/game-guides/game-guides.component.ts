import { Component, OnInit } from '@angular/core';
import { SeoService } from "../seo/seo.service";
import { Router, ActivatedRoute} from '@angular/router';
import { GameDataService } from "../services/game/game-data.service";
import { PaginationService } from "../services/pagination/pagination.service";
import { MatDialog } from '@angular/material/dialog';
import { CommentModalComponent } from '../achievements/comment-modal/comment-modal.component';
import { AuthService } from '../providers/auth.service.ts.service';

@Component({
  selector: 'app-game-guides',
  templateUrl: './game-guides.component.html',
  styleUrls: ['./game-guides.component.sass']
})
export class GameGuidesComponent implements OnInit {

  tag: any
  game : any
  user: any

  constructor(
    private router: Router,
    private seo: SeoService,
    private route: ActivatedRoute,
    private gameService: GameDataService,
    public page: PaginationService,
    private dialog: MatDialog,
    private auth: AuthService
    ) {
      this.tag = this.route.parent?.snapshot.paramMap.get('tag')
     }

  ngOnInit(): void {
    this.initTags()
    this.gameService.currentGame.subscribe(game => { 
      if(game){
        this.game = game
        console.log(game)
        this.generateGameTags(game.name, game.banner)
        this.fetchGuides(game._id)
      }
    })
    this.auth.loggedUser.subscribe(user => {
      this.user = user
    })
  }

  initTags(){
    if(this.tag){
      this.generateGameTags(this.gameService.buildGameName(this.tag), this.gameService.buildGameBanner(this.tag))
    }
  }
  
  generateGameTags(name : string, banner: string){
    let data = {
      title: `${name} Guide | Stadia Hunters`,
      description: `${name} guide for Stadia.`,
      image: banner, 
    }
    this.seo.generateTags(data)
  }
  
  fetchGuides(gameId:string){
    this.page.init(`games/${gameId}/guide`, 'position', { limit: 20, reverse: false, prepend: false })
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

  achievements(){
    return `/game/${this.tag}/achievements/`
  }

  leaderboard(){
    return `/game/${this.tag}/leaderboard/`
  }

  review(){
    return `/game/${this.tag}/review/`
  }

  signIn(){
    this.router.navigate([`/login`]);
  }

  buildCommentModal(){
    const dialogRef = this.dialog.open(CommentModalComponent, {
      data: {type: 'guide'}
    });
  }

}
