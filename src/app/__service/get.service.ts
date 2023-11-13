import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private httpClient: HttpClient) {}

  async GET(URL: string) {
    return new Promise((resolve, reject) => {
      let options = {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/json; charset=utf-8'
        ),
      };
      this.httpClient.get(URL, options).subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (err: any) => {
          reject(err);
        },
      });
    });
  }

}
