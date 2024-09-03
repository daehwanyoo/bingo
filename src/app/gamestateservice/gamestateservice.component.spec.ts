import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamestateserviceComponent } from './gamestateservice.component';

describe('GamestateserviceComponent', () => {
  let component: GamestateserviceComponent;
  let fixture: ComponentFixture<GamestateserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamestateserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamestateserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
