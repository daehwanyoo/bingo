import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketserviceComponent } from './socketservice.component';

describe('SocketserviceComponent', () => {
  let component: SocketserviceComponent;
  let fixture: ComponentFixture<SocketserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocketserviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});