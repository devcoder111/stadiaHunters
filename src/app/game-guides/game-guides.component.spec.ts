import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGuidesComponent } from './game-guides.component';

describe('GameGuidesComponent', () => {
  let component: GameGuidesComponent;
  let fixture: ComponentFixture<GameGuidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameGuidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
