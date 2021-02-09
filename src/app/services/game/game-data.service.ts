import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private gameSource = new BehaviorSubject<any>(undefined)

  currentGame = this.gameSource.asObservable()

  constructor() { }

  changeGame(game:any){
    this.gameSource.next(game)
  }

  buildGameName(tag:string){
    return tag.replace(/\-/g, " ")
              .split(' ')
              .map(word => {
                if(word == 'and' || word == 'the' || word == 'of'){
                  return word
                } else{
                  return word.charAt(0).toUpperCase() + word.slice(1)
                }
              })
              .join(' ');
  }

  buildGameBanner(tag:string){
    return `https://storage.googleapis.com/stadiaachievements-34145.appspot.com/banners/${tag}.jpg`
  }
}
