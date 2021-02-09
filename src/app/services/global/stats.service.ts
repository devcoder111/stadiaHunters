import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private statsSource = new BehaviorSubject<any>(undefined)

  globalStats = this.statsSource.asObservable()

  constructor() { }

  changeStats(stats:any){
    this.statsSource.next(stats)
  }
}
