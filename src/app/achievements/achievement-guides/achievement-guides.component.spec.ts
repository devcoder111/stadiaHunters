import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementGuidesComponent } from './achievement-guides.component';

describe('AchievementGuidesComponent', () => {
  let component: AchievementGuidesComponent;
  let fixture: ComponentFixture<AchievementGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementGuidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
