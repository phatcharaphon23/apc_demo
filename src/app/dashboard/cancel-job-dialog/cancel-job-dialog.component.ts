import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-job-dialog',
  templateUrl: './cancel-job-dialog.component.html',
  styleUrls: ['./cancel-job-dialog.component.scss'],
})
export class CancelJobDialogComponent {
  cancelReason: string = '';
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CancelJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose() {
    this.dialogRef.close();
    // this.form.reset();
  }

  // onReset() {
  //   this.form.reset();
  //   this.submitted = false;
  // }
}
