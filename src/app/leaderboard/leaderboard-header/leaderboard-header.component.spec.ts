import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardHeaderComponent } from './leaderboard-header.component';

describe('LeaderboardHeaderComponent', () => {
  let component: LeaderboardHeaderComponent;
  let fixture: ComponentFixture<LeaderboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderboardHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
