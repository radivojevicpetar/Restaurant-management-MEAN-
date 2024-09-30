import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostaveGostComponent } from './dostave-gost.component';

describe('DostaveGostComponent', () => {
  let component: DostaveGostComponent;
  let fixture: ComponentFixture<DostaveGostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DostaveGostComponent]
    });
    fixture = TestBed.createComponent(DostaveGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
