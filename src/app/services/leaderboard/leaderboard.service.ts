import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor() { }

  buildLeaderboard(type: String){
    switch(type){
      case "month": return `${this.getMonth()} Leaderboard`
      case "year" : return `${this.getYear()} Leaderboard`
      default: return "Global Leaderboard"
    }
  }

  buildRank(type:String, user:any){
    switch(type){
      case "month": return user.month_rank
      case "year" : return user.year_rank
      default: return user.rank
    }
  }

  buildScore(type:String, user:any){
    switch(type){
      case "month": return user.month_score
      case "year" : return user.year_score
      default: return user.score
    }
  }

  buildGames(type:String, user:any){
    switch(type){
      case "month": return user.month_games_completed
      case "year" : return user.year_games_completed
      default: return user.games_completed
    }
  }

  buildAchievements(type:String, user:any){
    switch(type){
      case "month": return user.month_achievements
      case "year" : return user.year_achievements
      default: return user.achievements_completed
    }
  }

  getMonth(){
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
      ];
  
      return monthNames[new Date().getMonth()];
  }

  getYear(){
    return new Date().getFullYear().toString()
  }
}
