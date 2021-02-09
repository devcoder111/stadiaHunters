import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementUserComponent } from './achievement-user.component';

describe('AchievementUserComponent', () => {
  let component: AchievementUserComponent;
  let fixture: ComponentFixture<AchievementUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
