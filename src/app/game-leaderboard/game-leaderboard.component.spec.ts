import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLeaderboardComponent } from './game-leaderboard.component';

describe('GameLeaderboardComponent', () => {
  let component: GameLeaderboardComponent;
  let fixture: ComponentFixture<GameLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
