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
import { SnackService } from 'src/app/__service/snack.service';
import * as moment from 'moment';

@Component({
  selector: 'app-test-addnew-job',
  templateUrl: './test-addnew-job.component.html',
  styleUrls: ['./test-addnew-job.component.scss'],
})
export class TestAddnewJobComponent {
  submitted: boolean = false;
  jobtypes: string[] = ['design quantity', 'composing a/w', 'ready made a/w'];
  operators: string[] = [];
  filteredOperators: { employee_id: string; username: string }[] = [];
  selectedOperator: string = '';

  requests: string[] = [];
  filteredRequest: { employee_id: string; username: string }[] = [];
  selectedRequest: string = '';

  groups: string[] = [];
  filteredGroups: { group_id: string; group_name: string }[] = [];
  selectedGroup: string = '';

  constructor(
    private jobUpdateService: JobUpdateService,
    private http: HttpService,
    private getService: GetService,
    private snackBar: SnackService,
    private dialogRef: MatDialogRef<TestAddnewJobComponent> // private datePipe: DatePipe,
  ) {}

  form = new FormGroup({
    jobspec: new FormControl('', [Validators.required]),
    // dpcgroup: new FormControl('', [Validators.required]),
    status_order: new FormControl('New Order', [Validators.required]),
    working_date: new FormControl(new Date(), [Validators.required]),
    due_date: new FormControl(new Date(), [Validators.required]),
    createdby: new FormControl('Name Test', [Validators.required]),
    // requestby: new FormControl('', [Validators.required]),
    // operator_id: new FormControl('', [Validators.required]),
    urgent_aw: new FormControl(false),
    urgent_film: new FormControl(false),
    urgent_normal: new FormControl(false),
    design: new FormControl(''),
    compos_aw: new FormControl(''),
    ready_aw: new FormControl(''),
    custcode: new FormControl('', [Validators.required]),
    customer_name: new FormControl('', [Validators.required]),
    productname: new FormControl('', [Validators.required]),
    jobtype: new FormControl('', [Validators.required]),
    quantity: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit(): void {
    // this.getOperate();
    // this.getRequestby();
    // this.getGroup();
    const today = new Date();
  }

  dueDateHint: string = '';
  onDueDateInput(event: MatDatepickerInputEvent<Date>) {
    const workingDate = this.form.get('working_date')?.value;
    const dueDate = event.value;
  
    if (moment(dueDate).isBefore(workingDate)) {
      this.dueDateHint = 'Due date cannot be before working date';
    } else {
      this.dueDateHint = '';
    }
  }
  
  onWorkingDateInput(event: MatDatepickerInputEvent<Date>) {
    const workingDate = event.value;
    const dueDate = this.form.get('due_date')?.value;
  
    if (moment(dueDate).isBefore(workingDate)) {
      this.dueDateHint = 'Due date cannot be before working date';
    } else {
      this.dueDateHint = '';
    }
  }
  
  
  

  onSave() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const dueDate = this.form.get('due_date')?.value;
    const workingDate = this.form.get('working_date')?.value;

    if (moment(dueDate).isBefore(workingDate)) {
      console.log('Due Date must be on or after Working Date');
      this.submitted = false;
      return;
    }
    // เพิ่มเงื่อนไขเพิ่มเติมที่ตรวจสอบว่า working_date ไม่มากกว่า due_date
    if (moment(workingDate).isAfter(dueDate)) {
      console.log('Working Date must be on or before Due Date');
      this.submitted = false;
      return;
    }
    const jobspec = this.form.get('jobspec')?.value;
    // const dpcgroup =
    //   this.selectedGroup || this.form.get('dpcgroup')?.value;
    const status_order = this.form.get('status_order')?.value;
    const createdby = this.form.get('createdby')?.value;
    const working_date = this.form.get('working_date')?.value;
    const due_date = this.form.get('due_date')?.value;
    // const requestby =
    //   this.selectedRequest || this.form.get('requestby')?.value;
    // const operator_id =
    //   this.selectedOperator || this.form.get('operator_id')?.value;
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
      // dpcgroup: dpcgroup,
      status_order: status_order,
      createdby: createdby,
      working_date: working_date,
      due_date: due_date,
      // requestby: requestby,
      // operator_id: operator_id,
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
        // console.log(res);
        this.snackBar.CustomSnackBar('Add job successful', 3000, 'success');
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
    const jobtypeControl = this.form.get('jobtype');
    const designControl = this.form.get('design');
    const compos_awControl = this.form.get('compos_aw');
    const ready_awControl = this.form.get('ready_aw');
    const quantityControl = this.form.get('quantity'); // เพิ่ม control สำหรับ quantity

    jobtypeControl?.setValue(jobtype);

    switch (jobtype) {
      case 'design':
        designControl?.setValue('Y');
        compos_awControl?.setValue('N');
        ready_awControl?.setValue('N');
        quantityControl?.enable(); // Enable quantity input
        break;
      case 'compos_aw':
        designControl?.setValue('N');
        compos_awControl?.setValue('Y');
        ready_awControl?.setValue('N');
        quantityControl?.disable(); // Disable quantity input
        // รีเซตค่า quantity เมื่อไม่เลือก design
        quantityControl?.setValue('');
        break;
      case 'ready_aw':
        designControl?.setValue('N');
        compos_awControl?.setValue('N');
        ready_awControl?.setValue('Y');
        quantityControl?.disable(); // Disable quantity input
        // รีเซตค่า quantity เมื่อไม่เลือก design
        quantityControl?.setValue('');
        break;
      default:
        break;
    }
  }

  // TODO function getOperate
  // getOperate() {
  //   this.getService
  //     .GET('/api/operators')
  //     .then((res: any) => {
  //       // console.log(res);
  //       this.operators = res;
  //       this.filteredOperators = res;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }
  // onSelectOperator(operator: string | null): void {
  //   if (operator !== null) {
  //     this.selectedOperator = operator;
  //   }
  // }

  // TODO function getRequestby
  // getRequestby() {
  //   this.getService
  //     .GET('/api/requestby')
  //     .then((res: any) => {
  //       // console.log(res);
  //       this.requests = res;
  //       this.filteredRequest = res;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // onSelectRequest(request: string | null): void {
  //   if (request !== null) {
  //     this.selectedRequest = request;
  //   }
  // }

  // TODO function getGroup
  // getGroup() {
  //   this.getService
  //     .GET('/api/groupname')
  //     .then((res: any) => {
  //       // console.log(res);
  //       this.groups = res;
  //       this.filteredGroups = res;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  // onSelectGroup(group: string | null): void {
  //   if (group !== null) {
  //     this.selectedGroup = group;
  //   }
  // }

  onClose() {
    this.dialogRef.close();
    this.form.reset();
  }

  onReset() {
    this.form.reset();
    this.submitted = false;
  }
}
