import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/__service/http.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  submitted: boolean = false;

  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private http: HttpService,
    private dialogRef: MatDialogRef<InputComponent>
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.closeDialog.emit();
  }
}
