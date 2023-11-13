import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputComponent } from 'src/app/dashboard/input/input.component';
import { TestAddnewJobComponent } from 'src/app/dashboard/test-addnew-job/test-addnew-job.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(private _dialog: MatDialog){}

  openNewJobEmFrom(){
    this._dialog.open(InputComponent);
  }

  openAddJob() {
    this._dialog.open(TestAddnewJobComponent);
  }
}

