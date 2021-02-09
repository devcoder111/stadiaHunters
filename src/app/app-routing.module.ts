import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from "./games/games.component";

import { HomeComponent } from "./home/home.component";
import { GameDetailsComponent } from "./game-details/game-details.component";
import { GameAchievementsComponent } from "./game-achievements/game-achievements.component";
import { GameLeaderboardComponent } from "./game-leaderboard/game-leaderboard.component";
import { GameGuidesComponent } from "./game-guides/game-guides.component";
import { AchievementGuidesComponent } from "./achievements/achievement-guides/achievement-guides.component";
import { LeaderboardComponent } from './leaderboard/leaderboard/leaderboard.component';
import { LoginComponent } from "./profile/login/login.component";
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from "./about/about.component";

import { StatsComponent } from './leaderboard/stats/stats.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { GameReviewComponent } from './game-review/game-review.component';
import { NewsComponent } from './news/news.component';
import { GuidesComponent } from './guides/guides.component';
import { HighlightsComponent } from './highlights/highlights.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'games', component: GamesComponent },
    { path: 'news', component: NewsComponent },
    { path: 'guides', component: GuidesComponent},
    { path: 'highlights', component: HighlightsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user/:username', component: ProfileComponent },
    { path: 'leaderboard',children:[
      { path: '', redirectTo: 'month', pathMatch: 'full' },
      { path: ':filter',component: LeaderboardComponent,},
    ] },
    { path: 'stats',children:[
      { path: '', redirectTo: 'completions', pathMatch: 'full' },
      { path: ':filter', component: StatsComponent,},
    ] },
    { path: 'games/:gameId', component: GameDetailsComponent, children:[
      { path: 'achievement/:id/:name', component: AchievementGuidesComponent,},
    ]},
    { path: 'game/:tag', component: GameDetailsComponent, children:[
      { path: '', redirectTo: 'achievements', pathMatch: 'full' },
      { path: 'achievements', children:[
        {path: '', component: GameAchievementsComponent},
        {path: ':userId', component: GameAchievementsComponent}
      ]},
      { path: 'leaderboard', component: GameLeaderboardComponent,},
      { path: 'guide', component: GameGuidesComponent,},
      { path: 'review', component: GameReviewComponent,},
      { path: 'achievement/:id/:name', component: AchievementGuidesComponent,},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
