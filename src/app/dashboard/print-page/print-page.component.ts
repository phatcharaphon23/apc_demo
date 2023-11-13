import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/__service/http.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss'],
})
export class PrintPageComponent implements OnInit{
  constructor(private http: HttpService, private fb: FormBuilder) {}

  @Output() controls = new EventEmitter();
  @Input() jobData: any;
  @Input() jobtype: any;

  ngOnInit(): void {
    console.log("gg", this.jobData);
  }

  myGroup = new FormGroup({
    urgent_aw: new FormControl(''),
    urgent_film: new FormControl(''),
    urgent_normal: new FormControl(''),
    design: new FormControl(''),
    compos_aw: new FormControl(''),
    ready_aw: new FormControl(''),
  })

  onClose() {
    this.controls.emit({
      control: 'close',
    });
  }

  printPage() {
    window.print();
  }
}
