import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { TestAddnewJobComponent } from './dashboard/test-addnew-job/test-addnew-job.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputComponent } from './dashboard/input/input.component';
import { UpdateComponent } from './dashboard/update/update.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { HeaderComponent } from './layout-dashboard/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';

import { FormsModule } from '@angular/forms';
import { DialogAnimationsComponent } from './dashboard/dialog-animations/dialog-animations.component';
import { InvoiceComponent } from './dashboard/invoice/invoice.component';
import { PrintPageComponent } from './dashboard/print-page/print-page.component';
import { StatusComponent } from './dashboard/status/status.component';
import { CancelJobDialogComponent } from './dashboard/cancel-job-dialog/cancel-job-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    InputComponent,
    UpdateComponent,
    LayoutDashboardComponent,
    HeaderComponent,
    TestAddnewJobComponent,
    DialogAnimationsComponent,
    InvoiceComponent,
    PrintPageComponent,
    StatusComponent,
    CancelJobDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    MatSortModule,
    MatSnackBarModule,
    MatChipsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
