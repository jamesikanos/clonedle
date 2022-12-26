import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullGameComponent } from './full-game.component';

describe('FullGameComponent', () => {
  let component: FullGameComponent;
  let fixture: ComponentFixture<FullGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
