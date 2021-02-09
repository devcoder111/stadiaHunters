import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamesComponent } from './games/games.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GameAchievementsComponent } from './game-achievements/game-achievements.component';
import { GameLeaderboardComponent } from './game-leaderboard/game-leaderboard.component';
import { GameGuidesComponent } from './game-guides/game-guides.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { ScrollableDirective } from './scrollable.directive';
import { LoadingSpinnerComponent } from './elements/loading-spinner/loading-spinner.component';
import { FooterComponent } from './elements/footer/footer.component';
import { AchievementCardComponent } from './achievements/achievement-card/achievement-card.component';
import { AchievementGuidesComponent } from './achievements/achievement-guides/achievement-guides.component';
import { ToolbarComponent } from './elements/toolbar/toolbar.component';
import { GameUserComponent } from './leaderboard/game-user/game-user.component';
import { GameHeaderComponent } from './leaderboard/game-header/game-header.component';
import { StatsHeaderComponent } from './leaderboard/stats-header/stats-header.component';
import { StatsUserComponent } from './leaderboard/stats-user/stats-user.component';
import { LeaderboardComponent } from './leaderboard/leaderboard/leaderboard.component';
import { LeaderboardHeaderComponent } from './leaderboard/leaderboard-header/leaderboard-header.component';
import { LeaderboardUserComponent } from './leaderboard/leaderboard-user/leaderboard-user.component';
import { StatsComponent } from './leaderboard/stats/stats.component';
import { CommentComponent } from './achievements/comment/comment.component';
import { AchievementUserComponent } from './leaderboard/achievement-user/achievement-user.component';
import { HomeComponent } from './home/home.component';
import { GameCardComponent } from './games/game-card/game-card.component';
import { UserGuideComponent } from './home/user-guide/user-guide.component';
import { LeaderboardUserSmallComponent } from './leaderboard/leaderboard-user-small/leaderboard-user-small.component';
import { AchievementMediaComponent, MediaDialog } from './achievements/achievement-media/achievement-media.component';
import { BannerComponent } from './elements/banner/banner.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileGameComponent } from './profile/profile-game/profile-game.component';
import { ProfileScoreComponent } from './profile/profile-score/profile-score.component';
import { BountyComponent } from './home/bounty/bounty.component';
import { LoginComponent } from './profile/login/login.component';
import { GuideComponent } from './game-guides/guide/guide.component';
import { CommentModalComponent } from './achievements/comment-modal/comment-modal.component';
import { DynamicFormComponent } from './achievements/comment-modal/dynamic-form/dynamic-form.component';
import { DynamicQuestionComponent } from './achievements/comment-modal/dynamic-question/dynamic-question.component';
import { DiscordComponent } from './elements/discord/discord.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { QuestionComponent } from './faq/question/question.component';
import { GameReviewComponent } from './game-review/game-review.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { NewsComponent } from './news/news.component';
import { GuidesComponent } from './guides/guides.component';
import { VideoComponent } from './home/video/video.component';
import { GameGuideComponent } from './home/game-guide/game-guide.component';

const firebaseConfig = {
  apiKey: "AIzaSyARYOQ7YNL0l5cFN_c1vmp3COTSZ9EQ0TE",
  authDomain: "stadiaachievements-34145.firebaseapp.com",
  databaseURL: "https://stadiaachievements-34145.firebaseio.com",
  projectId: "stadiaachievements-34145",
  storageBucket: "stadiaachievements-34145.appspot.com",
  messagingSenderId: "1001591143424",
  appId: "1:1001591143424:web:0fff83f75d010b041aece5",
  measurementId: "G-QR3K7T3HHE"
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    GamesComponent,
    GameAchievementsComponent,
    GameLeaderboardComponent,
    GameGuidesComponent,
    GameDetailsComponent,
    ScrollableDirective,
    LoadingSpinnerComponent,
    FooterComponent,
    AchievementCardComponent,
    AchievementGuidesComponent,
    ToolbarComponent,
    GameUserComponent,
    GameHeaderComponent,
    StatsHeaderComponent,
    StatsUserComponent,
    LeaderboardComponent,
    LeaderboardHeaderComponent,
    LeaderboardUserComponent,
    StatsComponent,
    CommentComponent,
    AchievementUserComponent,
    HomeComponent,
    GameCardComponent,
    UserGuideComponent,
    LeaderboardUserSmallComponent,
    AchievementMediaComponent,
    MediaDialog,
    BannerComponent,
    ProfileComponent,
    ProfileGameComponent,
    ProfileScoreComponent,
    BountyComponent,
    LoginComponent,
    GuideComponent,
    CommentModalComponent,
    DynamicFormComponent,
    DynamicQuestionComponent,
    DiscordComponent,
    ContactComponent,
    FaqComponent,
    QuestionComponent,
    GameReviewComponent,
    HighlightsComponent,
    NewsComponent,
    GuidesComponent,
    VideoComponent,
    GameGuideComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled:false }),
  ],
  exports:[
    MatToolbarModule,
    MatSidenavModule,],
  entryComponents:[
    MediaDialog,
    CommentModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
