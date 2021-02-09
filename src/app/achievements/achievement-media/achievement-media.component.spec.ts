import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementMediaComponent } from './achievement-media.component';

describe('AchievementMediaComponent', () => {
  let component: AchievementMediaComponent;
  let fixture: ComponentFixture<AchievementMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
