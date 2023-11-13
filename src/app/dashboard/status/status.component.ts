import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetService } from 'src/app/__service/get.service';
import { HttpService } from 'src/app/__service/http.service';
import { SnackService } from 'src/app/__service/snack.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  constructor(
    private http: HttpService,
    private getService: GetService,
    private snackBar: SnackService,
    private dialogRef: MatDialogRef<StatusComponent> 
  ) {}

  onClose() {
    this.dialogRef.close();
    // this.form.reset();
  }
}
