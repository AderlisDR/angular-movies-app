import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccountResponse } from '../models/account-response';
import { SessionResponse } from '../models/session_response';
import { TokenResponse } from '../models/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session!: SessionResponse;
  account!: AccountResponse;

  constructor(private http: HttpClient) { }

  createSession(requestToken: string) {
    const request = { request_token: requestToken };
    return this.http.post<SessionResponse>(`${environment.apiUrl}3/authentication/session/new?api_key=${environment.apiKey}`, request).toPromise();
  }

  createRequestToken() {
    return this.http.get<TokenResponse>(`${environment.apiUrl}3/authentication/token/new?api_key=${environment.apiKey}`).toPromise();
  }

  getSession(requestToken: string) {
    return new Promise<void>((resolve, reject) => {
      this.createSession(requestToken).then((sessionResponse: SessionResponse) => {
        if (sessionResponse.success) {
          this.session = sessionResponse;
          this.getAccountDetails().then((accountResponse: AccountResponse) => {
            this.account = accountResponse;
            resolve();
          }).catch(error => {
            console.log(error);
            reject();
          });
        }
      }).catch(error => {
        console.log(error);
        reject();
      });
    });
  }

  getAccountDetails() {
    return this.http.get<AccountResponse>(`${environment.apiUrl}3/account?api_key=${environment.apiKey}&session_id=${this.session.session_id}`).toPromise();
  }
}
