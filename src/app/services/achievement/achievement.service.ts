import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  private achievementSource = new BehaviorSubject<any>(undefined)

  currentAchievement = this.achievementSource.asObservable()

  constructor() { }

  changeAchievement(achievement:any){
    this.achievementSource.next(achievement)
  }

  buildAchievementName(name:string){
      return name.replace('-', " ")
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
  }
}
