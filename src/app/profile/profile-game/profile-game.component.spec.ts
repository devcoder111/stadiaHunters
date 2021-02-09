import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGameComponent } from './profile-game.component';

describe('ProfileGameComponent', () => {
  let component: ProfileGameComponent;
  let fixture: ComponentFixture<ProfileGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
