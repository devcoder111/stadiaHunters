import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileScoreComponent } from './profile-score.component';

describe('ProfileScoreComponent', () => {
  let component: ProfileScoreComponent;
  let fixture: ComponentFixture<ProfileScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
