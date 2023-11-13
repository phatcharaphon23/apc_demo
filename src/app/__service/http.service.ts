import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  GET(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {}

  // POST(URL: string, BODY: any): Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders().set(
  //       'Content-Type',
  //       'application/json; charset=utf-8'
  //     ),
  //   };

  //   return this.httpClient.post(URL, BODY, options);
  // }

  async POST(URL: string, BODY: any) {
    return new Promise((resolve, reject) => {
      let options = {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/json; charset=utf-8'
        ),
      };
      this.httpClient.post(URL, BODY, options).subscribe({
        next: (data: any) => {
          if (data.success) {
            resolve(data.messege);
          } else {
            reject(data.messege);
          }
        },
        error: (err: any) => {
          reject(err);
        },
      });
    });
  }
}
