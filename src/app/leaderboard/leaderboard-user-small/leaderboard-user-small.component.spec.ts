import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardUserSmallComponent } from './leaderboard-user-small.component';

describe('LeaderboardUserSmallComponent', () => {
  let component: LeaderboardUserSmallComponent;
  let fixture: ComponentFixture<LeaderboardUserSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardUserSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardUserSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
