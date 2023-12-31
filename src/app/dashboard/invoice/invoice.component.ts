import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HttpService } from 'src/app/__service/http.service';
import { JobUpdateService } from 'src/app/__service/job-update.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    private http: HttpService,
    private jobUpdateService: JobUpdateService
  ) {}

  @Output() controls = new EventEmitter();
  @Input() jobData: any;

  ngOnInit(): void {
    // console.log(this.jobData);
  }
  onClose() {
    this.controls.emit({
      control: 'close',
    });
  }

  printPage() {
    window.print();
  }
}

// onReport() {

// }
