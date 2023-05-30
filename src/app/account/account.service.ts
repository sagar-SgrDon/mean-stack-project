import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accountinfo } from './accountinfo';
import { LoginInfo } from './login-interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = 'http://localhost:8000/users';
  constructor(private http: HttpClient) {}

  login(data: LoginInfo) {
    return this.http.post(this.url + '/login', data);
  }

  createUser(data: Accountinfo) {
    console.log(data);
    return this.http.post(this.url + '/signup', data);
  }
}
