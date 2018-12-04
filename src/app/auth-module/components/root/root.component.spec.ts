import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsModuleRootComponent } from './root.component';

describe('EventsModuleRootComponent', () => {
  let component: EventsModuleRootComponent;
  let fixture: ComponentFixture<EventsModuleRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsModuleRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsModuleRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
