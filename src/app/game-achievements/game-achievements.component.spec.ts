import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAchievementsComponent } from './game-achievements.component';

describe('GameAchievementsComponent', () => {
  let component: GameAchievementsComponent;
  let fixture: ComponentFixture<GameAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAchievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
