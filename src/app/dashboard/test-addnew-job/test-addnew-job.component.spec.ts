import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAddnewJobComponent } from './test-addnew-job.component';

describe('TestAddnewJobComponent', () => {
  let component: TestAddnewJobComponent;
  let fixture: ComponentFixture<TestAddnewJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAddnewJobComponent]
    });
    fixture = TestBed.createComponent(TestAddnewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
