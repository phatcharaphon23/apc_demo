import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(public snack: MatSnackBar) {}

  openSnackBar(message: string, timeout: number, snackClass: any) {
    this.snack.open(message, 'X', {
      duration: timeout,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [snackClass],
    });
  }

  CustomSnackBar(
    displayMessage: String,
    Timeout: number,
    MessageType: 'error' | 'success'
  ) {
    let error = false;
    if (MessageType == 'error') {
      error = true;
    } else if (MessageType == 'success') {
      error = false;
    }

    this.snack.openFromComponent(SnackbarComponent, {
      data: {
        message: displayMessage,
        type: error,
      },
      duration: Timeout,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: MessageType,
    });
  }
}
