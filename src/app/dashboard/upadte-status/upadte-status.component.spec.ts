import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadteStatusComponent } from './upadte-status.component';

describe('UpadteStatusComponent', () => {
  let component: UpadteStatusComponent;
  let fixture: ComponentFixture<UpadteStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpadteStatusComponent]
    });
    fixture = TestBed.createComponent(UpadteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
