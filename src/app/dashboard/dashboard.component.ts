import { GetService } from 'src/app/__service/get.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpService } from './../__service/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// import { TestAddnewJobComponent } from './test-addnew-job/test-addnew-job.component';
import { UpdateComponent } from './update/update.component';
import { JobUpdateService } from '../__service/job-update.service';
import { PrintPageComponent } from './print-page/print-page.component';
import { Router } from '@angular/router';
import { StatusComponent } from '../dashboard/status/status.component';
import { CancelJobDialogComponent } from './cancel-job-dialog/cancel-job-dialog.component';
import { TestAddnewJobComponent } from './test-addnew-job/test-addnew-job.component';
import { UpadteStatusComponent } from './upadte-status/upadte-status.component';

interface JobData {
  dpcno: number;
  jobspec: string;
  dpcgroup: string;
  finish: string;
  complete: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<JobData>([]);
  data: JobData[] = [];
  page: number = 1;
  pages: number = 0;
  ifFirst: boolean = false;
  ifEnd: boolean = false;
  showlist: boolean = true;
  addJob: boolean = false;
  editJob: boolean = false;
  changPassword: boolean = false;
  deleteJob: boolean = false;
  dataLength: number = 0;
  jobspec: string = '';
  searchKeyword: string = '';
  currentPage: number = 1;
  totalPages: number = 0;
  showView: boolean = false;
  jobData: any;
  isPrinting: boolean = false;
  isClicked: boolean = false;

  constructor(
    private http: HttpService,
    private dialogFrom: MatDialog,
    private jobUpdateService: JobUpdateService,
    private router: Router,
    private getService: GetService

  ) {
    this.jobUpdateService.jobUpdated$.subscribe(() => {
      this.getList();
    });
    this.jobUpdateService.updateEvent.subscribe(() => {
      this.getList();
    });
  }

  ngOnInit(): void {
    this.getList();
  }

  openAddJob() {
    const dialogRef = this.dialogFrom.open(TestAddnewJobComponent);
  }

  displayedColumns: string[] = [
    'dpcno',
    'dpc_date',
    'jobspec',
    'requestby',
    'custcode',
    'state',
    'action',
  ];

  getList() {
    let body = {
      page: this.page,
      searchKeyword: this.searchKeyword,
    };

    this.http
      .POST('/api/list', body)
      .then((response: any) => {
        console.log(response);
        this.data = response.info;
        this.pages = response.pages;
        this.page = response.page;
        this.ifFirst = this.page === 1;
        this.ifEnd = this.page === this.pages;

        this.dataLength = this.data.length;

        if (this.dataLength == 0) {
          this.page = 1;
          this.ifFirst = true;
          this.ifEnd = true;
        }

        this.dataSource.data = this.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchJob() {
    let body = {
      page: this.page,
      searchKeyword: this.searchKeyword,
    };

    this.http
      .POST('/api/list', body)
      .then((response: any) => {
        // console.log(response);
        this.data = response.info;
        this.pages = response.pages;
        this.ifFirst = this.page === 1;
        this.ifEnd = this.page === this.pages;

        if (this.dataLength == 0) {
          this.page = 1;
          this.ifFirst = true;
          this.ifEnd = true;
        }

        this.page = 1;

        this.ifFirst = this.page === 1;
        this.ifEnd = this.page === this.pages;

        this.dataLength = this.data.length;

        if (this.dataLength == 0) {
          this.page = 1;
          this.ifFirst = true;
          this.ifEnd = true;
        }

        this.dataSource.data = this.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toggleClick() {
    this.isClicked = !this.isClicked;
  }
  onEditJob(dpcno: number) {
    const jobData = this.data.find((item) => item.dpcno === dpcno);
    console.log('jobData to be sent:', jobData);
    const dialogRef = this.dialogFrom.open(UpdateComponent, {
      data: {
        jobData: jobData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  onCancel(dpcno: number): void {
    const jobData = this.data.find((item) => item.dpcno === dpcno);

    const dialogRef = this.dialogFrom.open(UpadteStatusComponent, {
      data: {
        jobData: jobData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  // delete(dpcno: number) {
  //   const jobData = this.data.find((item) => item.dpcno === dpcno);

  //   if (jobData && (jobData.finish === 'true' || jobData.complete === 'true')) {
  //     alert('ไม่สามารถลบงานที่ finish หรือ complete ได้');
  //     return;
  //   }

  //   let body = {
  //     dpcno: dpcno,
  //     page: this.page,
  //     searchKeyword: this.searchKeyword,
  //   };

  //   const confirmDelete = confirm('คุณต้องการลบงานนี้หรือไม่?');
  //   if (confirmDelete) {
  //     this.http
  //       .POST('/api/delete_dpc', body)
  //       .then((response: any) => {
  //         this.data = this.data.filter((job) => job.dpcno !== dpcno);
  //         this.dataSource.data = this.data;
  //         this.dataLength = this.data.length;
  //         if (this.dataLength === 0) {
  //           this.page = 1;
  //           this.ifFirst = true;
  //           this.ifEnd = true;
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  onBack() {
    if (this.page > 1) {
      this.page--;
      if (this.searchKeyword) {
        this.searchJob();
      } else {
        this.getList();
      }
    }
    this.ifFirst = this.page === 1;
    this.ifEnd = this.page === this.pages;
  }

  onNext() {
    if (this.page < this.pages) {
      this.page++;
      if (this.searchKeyword) {
        this.searchJob();
      } else {
        this.getList();
      }
    }
    this.ifFirst = this.page === 1;
    this.ifEnd = this.page === this.pages;
  }

  onControls(e: any) {
    if (e.control === 'close') {
      this.showlist = true;
      this.showView = false;
    } else if (e.control === 'closecall') {
      this.getList();
      this.showlist = true;
      this.showView = false;
    }
  }

  onViewJob(dpcno: number) {
    const jobData = this.data.find((item) => item.dpcno === dpcno);
    this.jobData = jobData;
    this.showView = true;
    this.showlist = false;
  }
}
