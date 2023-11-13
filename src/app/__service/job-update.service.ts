import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobUpdateService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();
  constructor() {}
  updateEvent: EventEmitter<any> = new EventEmitter()
  private jobUpdateSubject = new Subject<void>();

  jobUpdated$ = this.jobUpdateSubject.asObservable();

  triggerJobUpdate() {
    // this.jobUpdateSubject.next();
    this.updateEvent.emit();
  }

  updateData(data: any) {
    this.dataSubject.next(data);
  }
}
