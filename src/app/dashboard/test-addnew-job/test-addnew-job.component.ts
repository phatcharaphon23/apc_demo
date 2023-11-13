import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/__service/http.service';
import { JobUpdateService } from 'src/app/__service/job-update.service';
import { Router } from '@angular/router';
import { GetService } from 'src/app/__service/get.service';

@Component({
  selector: 'app-test-addnew-job',
  templateUrl: './test-addnew-job.component.html',
  styleUrls: ['./test-addnew-job.component.scss'],
})
export class TestAddnewJobComponent {
  submitted: boolean = false;
  jobtypes: string[] = ['design quantity', 'composing a/w', 'ready made a/w'];
  operators: string[] = [];
  filteredOperators: string[] = [];
  requestOptions: any[] = [];

  constructor(
    private jobUpdateService: JobUpdateService,
    private http: HttpService,
    private getService: GetService,
    private dialogRef: MatDialogRef<TestAddnewJobComponent> // private datePipe: DatePipe,
  ) {}
  form = new FormGroup({
    jobspec: new FormControl('', [Validators.required]),
    dpcgroup: new FormControl('', [Validators.required]),
    status_order: new FormControl('New Order', [Validators.required]),
    working_date: new FormControl(new Date(), [Validators.required]),
    due_date: new FormControl(new Date(), [Validators.required]),
    // createdby: new FormControl('Name Test', [Validators.required]),
    requestby: new FormControl('', [Validators.required]),
    operator_id: new FormControl('', [Validators.required]),
    urgent_aw: new FormControl(false),
    urgent_film: new FormControl(false),
    urgent_normal: new FormControl(false),
    design: new FormControl('', [Validators.required]),
    compos_aw: new FormControl('', [Validators.required]),
    ready_aw: new FormControl('', [Validators.required]),
    custcode: new FormControl('', [Validators.required]),
    customer_name: new FormControl('', [Validators.required]),
    productname: new FormControl('', [Validators.required]),
    quantity: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit(): void {
    const today = new Date();
    this.getRequestOptions();
  }

  onOperatorInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    if (this.operators && this.operators.length > 0) {
      this.filteredOperators = this.operators.filter(
        (operator) =>
          typeof operator === 'string' &&
          operator.toLowerCase().includes(input.toLowerCase())
      );
    }
  }

  onSave() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const jobspec = this.form.get('jobspec')?.value;
    const dpcgroup = this.form.get('dpcgroup')?.value;
    const status_order = this.form.get('status_order')?.value;
    const createdby = this.form.get('createdby')?.value;
    const working_date = this.form.get('working_date')?.value;
    const due_date = this.form.get('due_date')?.value;
    const requestby = this.form.get('requestby')?.value;
    const operator_id = this.form.get('operator_id')?.value;
    const urgent_aw = this.form.get('urgent_aw')?.value;
    const urgent_film = this.form.get('urgent_film')?.value;
    const urgent_normal = this.form.get('urgent_normal')?.value;
    const design = this.form.get('design')?.value;
    const compos_aw = this.form.get('compos_aw')?.value;
    const ready_aw = this.form.get('ready_aw')?.value;
    const custcode = this.form.get('custcode')?.value;
    const customer_name = this.form.get('customer_name')?.value;
    const productname = this.form.get('productname')?.value;
    const quantity = this.form.get('quantity')?.value;

    const body = JSON.stringify({
      jobspec: jobspec,
      dpcgroup: dpcgroup,
      status_order: status_order,
      createdby: createdby,
      working_date: working_date,
      due_date: due_date,
      requestby: requestby,
      operator_id: operator_id,
      urgent_aw: urgent_aw,
      urgent_film: urgent_film,
      urgent_normal: urgent_normal,
      design: design,
      compos_aw: compos_aw,
      ready_aw: ready_aw,
      custcode: custcode,
      customer_name: customer_name,
      productname: productname,
      quantity: quantity,
    });

    this.http
      .POST('/api/add_dpc', body)
      .then((res: any) => {
        console.log(res);
        this.onClose();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.submitted = false;
      });

  }

  selectjobType(jobtype: string) {
    switch (jobtype) {
      case 'design quantity':
        this.form.get('design')?.setValue('Y');
        this.form.get('compos_aw')?.setValue('N');
        this.form.get('ready_aw')?.setValue('N');
        this.form.get('quantity')?.enable();
        break;
      case 'composing a/w':
        this.form.get('design')?.setValue('N');
        this.form.get('compos_aw')?.setValue('Y');
        this.form.get('ready_aw')?.setValue('N');
        this.form.get('quantity')?.disable();
        this.form.get('quantity')?.reset();
        break;
      case 'ready made a/w':
        this.form.get('design')?.setValue('N');
        this.form.get('compos_aw')?.setValue('N');
        this.form.get('ready_aw')?.setValue('Y');
        this.form.get('quantity')?.disable();
        this.form.get('quantity')?.reset();
        break;
      default:
        break;
    }
  }
  async getRequestOptions() {
    try {
      const res = await this.getService.GET('/api/employee')
      console.log(res);
      if (Array.isArray(res)) {
        this.requestOptions = res;
      } else {
        this.requestOptions = Object.values(res);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  

  onClose() {
    this.dialogRef.close();
    this.form.reset();
  }

  onReset() {
    this.form.reset();
    this.submitted = false;
  }
}
