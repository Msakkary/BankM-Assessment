import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      apikey: environment.apiKey,
    });
  }

  get<T extends any>(url: string) {
    return this.http.get<T>(environment.serverUrl + url, {
      headers: this.headers,
    });
  }
}
