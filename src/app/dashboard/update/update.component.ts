import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/__service/http.service';
import { JobUpdateService } from 'src/app/__service/job-update.service';
import { Router } from '@angular/router';
import { GetService } from 'src/app/__service/get.service';
import { SnackService } from 'src/app/__service/snack.service';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  jobspec: string = '';
  editJob: boolean = false;
  submitted: boolean = false;
  operators: string[] = [];
  filteredOperators: { employee_id: string; username: string }[] = [];

  selectedOperator: string = '';

  requests: string[] = [];
  filteredRequest: { employee_id: string; username: string }[] = [];
  selectedRequest: string = '';

  groups: string[] = [];
  filteredGroups: { group_id: string; group_name: string }[] = [];
  selectedGroup: string = '';
  finish: boolean = true;
  complete: boolean = true;
  color: ThemePalette = 'primary';
  today: moment.Moment = moment();

  @Input() jobData: any;
  @Input() jobtype: any;

  constructor(
    private getService: GetService,
    private jobUpdateService: JobUpdateService,
    private dialogRef: MatDialogRef<UpdateComponent>,
    private snackBar: SnackService,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private http: HttpService
  ) {}

  form = new FormGroup({
    dpcno: new FormControl('', [Validators.minLength(1)]),
    jobspec: new FormControl('', [Validators.minLength(1)]),
    dpc_date: new FormControl('', [Validators.minLength(1)]),
    // dpcgroup: new FormControl('', [Validators.minLength(1)]),
    status_order: new FormControl('', [Validators.minLength(1)]),
    working_date: new FormControl('', [Validators.required]),
    due_date: new FormControl('', [Validators.required]),
    createdby: new FormControl({ value: '', disabled: true }),
    // requestby: new FormControl('', [Validators.required]),
    // operator_id: new FormControl('', [Validators.required]),
    urgent_aw: new FormControl(''),
    urgent_film: new FormControl(''),
    urgent_normal: new FormControl(''),
    design: new FormControl(''),
    compos_aw: new FormControl(''),
    ready_aw: new FormControl(''),
    finish: new FormControl(''),
    complete: new FormControl(''),
    totcor: new FormControl({ value: '', disabled: true }),
    fdate: new FormControl({ value: '', disabled: true }),
    qty_estimatefilm: new FormControl({ value: '', disabled: true }),
    cdate: new FormControl({ value: '', disabled: true }),
    jobtype: new FormControl('', [Validators.required]),
    custcode: new FormControl('', [Validators.required]),
    customer_name: new FormControl('', [Validators.required]),
    productname: new FormControl('', [Validators.required]),
    quantity: new FormControl({ value: '', disabled: true }),
  });

  ngOnInit(): void {
    // this.getOperate();
    // this.getRequestby();
    // this.getGroup();
    const today = moment();
    const jobtypeControl = this.form.get('jobtype');
    const quantityControl = this.form.get('quantity');
    this.form.get('due_date')?.valueChanges.subscribe((dueDate) => {
      const workingDate = moment(this.form.get('working_date')?.value);
  
      if (moment(dueDate).isBefore(workingDate)) {
        console.log('Due Date must be on or after Working Date');

      }
    });
    if (this.data && this.data.jobData) {
      this.form.get('jobtype')?.valueChanges.subscribe((value) => {
        this.form.get('design')?.setValue(value === 'design' ? 'Y' : 'N');
        this.form.get('compos_aw')?.setValue(value === 'compos_aw' ? 'Y' : 'N');
        this.form.get('ready_aw')?.setValue(value === 'ready_aw' ? 'Y' : 'N');
      });
      this.form.patchValue({
        dpcno: this.data.jobData.dpcno,
        jobspec: this.data.jobData.jobspec,
        dpc_date: this.data.jobData.dpc_date,
        // dpcgroup: this.data.jobData.dpcgroup,
        status_order: this.data.jobData.status_order,
        working_date: this.data.jobData.working_date,
        due_date: this.data.jobData.due_date,
        createdby: this.data.jobData.createdby,
        // requestby: this.data.jobData.requestby,
        // operator_id: this.data.jobData.operator_id,
        urgent_aw: this.data.jobData.urgent_aw,
        urgent_film: this.data.jobData.urgent_film,
        urgent_normal: this.data.jobData.urgent_normal,
        design: this.data.jobData.design,
        compos_aw: this.data.jobData.compos_aw,
        ready_aw: this.data.jobData.ready_aw,
        finish: this.data.jobData.finish,
        complete: this.data.jobData.complete,
        totcor: this.data.jobData.totcor,
        qty_estimatefilm: this.data.jobData.qty_estimatefilm,
        fdate: this.data.jobData.fdate,
        cdate: this.data.jobData.cdate,
        custcode: this.data.jobData.custcode,
        customer_name: this.data.jobData.customer_name,
        productname: this.data.jobData.productname,
        quantity: this.data.jobData.quantity,
      });
    }
    if (this.data.jobData.design === 'Y') {
      jobtypeControl?.setValue('design');
    } else if (this.data.jobData.ready_aw === 'Y') {
      jobtypeControl?.setValue('ready_aw');
    } else if (this.data.jobData.compos_aw === 'Y') {
      jobtypeControl?.setValue('compos_aw');
    }

    jobtypeControl?.valueChanges.subscribe((value) => {
      this.form.get('design')?.setValue(value === 'design' ? 'Y' : 'N');
      this.form.get('compos_aw')?.setValue(value === 'compos_aw' ? 'Y' : 'N');
      this.form.get('ready_aw')?.setValue(value === 'ready_aw' ? 'Y' : 'N');

      if (value === 'design') {
        quantityControl?.enable();
      } else {
        quantityControl?.disable();
      }
    });
    // console.log('UpdateComponent', this.jobData);
  }

  // TODO function getOperate
  // getOperate() {
  //   this.getService
  //     .GET('/api/operators')
  //     .then((res: any) => {
  //       // console.log("oper",res);
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
  onSave() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const working_date = moment(this.form.get('working_date')?.value).format(
      'YYYY-MM-DD'
    );
    const due_date = moment(this.form.get('due_date')?.value).format(
      'YYYY-MM-DD'
    );
    const dueDate = this.form.get('due_date')?.value;
    const workingDate = this.form.get('working_date')?.value;
  
    if (moment(dueDate).isBefore(workingDate)) {
      console.log('Due Date must be on or after Working Date');
      this.submitted = false; 
      return;
    }
    const dpcno = this.form.get('dpcno')?.value;
    const jobspec = this.form.get('jobspec')?.value;
    const dpc_date = this.form.get('dpc_date')?.value;
    // const dpcgroup = this.selectedGroup || this.form.get('dpcgroup')?.value;
    const status_order = this.form.get('status_order')?.value;
    const createdby = this.form.get('createdby')?.value;
    // const requestby = this.selectedRequest || this.form.get('requestby')?.value;

    // const operator_id =
    //   this.selectedOperator || this.form.get('operator_id')?.value;
    const urgent_aw = this.form.get('urgent_aw')?.value;
    const urgent_film = this.form.get('urgent_film')?.value;
    const urgent_normal = this.form.get('urgent_normal')?.value;
    const design = this.form.get('design')?.value;
    const compos_aw = this.form.get('compos_aw')?.value;
    const ready_aw = this.form.get('ready_aw')?.value;
    const finish = this.form.get('finish')?.value;
    const complete = this.form.get('complete')?.value;
    const totcor = this.form.get('totcor')?.value;
    const qty_estimatefilm = this.form.get('qty_estimatefilm')?.value;
    const fdate = this.form.get('fdate')?.value;
    const cdate = this.form.get('cdate')?.value;
    const custcode = this.form.get('custcode')?.value;
    const customer_name = this.form.get('customer_name')?.value;
    const productname = this.form.get('productname')?.value;
    const jobData = this.form.get('jobData')?.value;
    const quantity = this.form.get('quantity')?.value;

    const body = JSON.stringify({
      dpcno: dpcno,
      jobspec: jobspec,
      dpc_date: dpc_date,
      // dpcgroup: dpcgroup,
      status_order: status_order,
      working_date: working_date,
      due_date: due_date,
      createdby: createdby,
      // requestby: requestby,
      // operator_id: operator_id,
      urgent_aw: urgent_aw,
      urgent_film: urgent_film,
      urgent_normal: urgent_normal,
      design: design,
      compos_aw: compos_aw,
      ready_aw: ready_aw,
      finish: finish,
      complete: complete,
      totcor: totcor,
      qty_estimatefilm: qty_estimatefilm,
      fdate: fdate,
      cdate: cdate,
      custcode: custcode,
      customer_name: customer_name,
      productname: productname,
      jobData: jobData,
      quantity: quantity,
    });

    this.http
      .POST('/api/update_dpc', body)
      .then((res: any) => {
        // console.log(res);
        this.snackBar.CustomSnackBar('Update job successful', 3000, 'success');
        this.jobUpdateService.triggerJobUpdate();
        this.onClose();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.submitted = false;
      });
  }

  onFinish(event: any) {
    this.finish = event.checked;
    if (this.finish) {
      this.finish = true;
      this.form.get('totcor')?.enable();
      this.form.get('fdate')?.enable();
    } else {
      this.finish = false;
      this.form.get('totcor')?.disable();
      this.form.get('fdate')?.disable();
      this.form.get('totcor')?.reset();
      this.form.get('fdate')?.reset();
    }
  }

  onComplete(event: any) {
    this.complete = event.checked;
    if (this.complete) {
      this.complete = true;
      this.form.get('qty_estimatefilm')?.enable();
      this.form.get('cdate')?.enable();
    } else {
      this.complete = false;
      this.form.get('qty_estimatefilm')?.disable();
      this.form.get('cdate')?.disable();
      this.form.get('qty_estimatefilm')?.reset();
      this.form.get('cdate')?.reset();
    }
  }

  onClose() {
    this.dialogRef.close();
    // this.form.reset();
  }
}
