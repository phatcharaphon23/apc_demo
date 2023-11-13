import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/__service/http.service';
@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss'],
})
export class PrintPageComponent implements OnInit {
  constructor(
    private http: HttpService
  ) {}

  @Output() controls = new EventEmitter();
  @Input() jobData: any;
  @Input() jobtype: any;

  ngOnInit(): void {

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
