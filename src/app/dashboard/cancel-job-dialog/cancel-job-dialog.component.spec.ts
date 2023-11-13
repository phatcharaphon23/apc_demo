import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelJobDialogComponent } from './cancel-job-dialog.component';

describe('CancelJobDialogComponent', () => {
  let component: CancelJobDialogComponent;
  let fixture: ComponentFixture<CancelJobDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelJobDialogComponent]
    });
    fixture = TestBed.createComponent(CancelJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
