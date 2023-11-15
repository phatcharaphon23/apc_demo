import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpService } from 'src/app/__service/http.service';
import { JobUpdateService } from 'src/app/__service/job-update.service';
import { SnackService } from 'src/app/__service/snack.service';

@Component({
  selector: 'app-upadte-status',
  templateUrl: './upadte-status.component.html',
  styleUrls: ['./upadte-status.component.scss'],
})
export class UpadteStatusComponent {
  cancelReason: string = '';
  submitted: boolean = false;
  constructor(
    public dialog: MatDialog,
    private jobUpdateService: JobUpdateService,
    public dialogRef: MatDialogRef<UpadteStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: SnackService,
    private http: HttpService
  ) {}

  @Input() jobData: any;

  ngOnInit(): void {
    if (this.data && this.data.jobData) {
      this.form.patchValue({
        dpcno: this.data.jobData.dpcno,
        state: this.data.jobData.state || 'cancel',
        cancel_content: this.data.jobData.cancel_content,
      });
    } else {
      // Set default value to "cancel" if there is no jobData
      this.form.patchValue({
        state: 'cancel',
      });
    }
  }

  form = new FormGroup({
    dpcno: new FormControl('', [Validators.minLength(1)]),
    state: new FormControl('cancel', [Validators.minLength(1)]),
    cancel_content: new FormControl('', [Validators.required]),
  });

  onSave() {
    if (this.form.invalid) {
      return;
    }

    const dpcno = this.form.get('dpcno')?.value;
    const state = this.form.get('state')?.value;
    const cancel_content = this.form.get('cancel_content')?.value;

    const body = {
      dpcno: dpcno,
      state: state,
      cancel_content: cancel_content,
    };

    this.submitted = true;

    this.http.POST('/api/update_status', body)
      .then((res: any) => {
        console.log(res);
        this.snackBar.CustomSnackBar('Status update successful', 3000, 'success');
        this.jobUpdateService.triggerJobUpdate();
        this.onClose();
      })
      .catch((err) => {
        console.error(err);
        // Handle error
      })
      .finally(() => {
        this.submitted = false;
      });
  }

  onClose() {
    this.dialogRef.close();
    // this.form.reset();
  }
}
