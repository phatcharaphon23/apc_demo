import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NumericOnlyDirective } from './numeric-only.directive';

@Component({
  template: `<input appNumericOnly [(ngModel)]="testValue" />`
})
class TestComponent {
  testValue: any;
}

describe('NumericOnlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NumericOnlyDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should allow only numeric values', () => {
    inputEl.nativeElement.value = 'abc123';
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.testValue).toBe('123');
  });

  it('should disallow non-numeric characters', () => {
    inputEl.nativeElement.value = 'abc';
    inputEl.triggerEventHandler('input', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.testValue).toBe(undefined);
  });
});
