import { Component, OnInit } from '@angular/core';
import { ErrorModel } from 'src/app/models/error-model';
import { TokenResponse } from 'src/app/models/token-response';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-session',
  template: ''
})
export class SessionComponent implements OnInit {

  constructor(private authService: AuthService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.authService.createRequestToken().then((tokenResponse: TokenResponse) => {
      if (tokenResponse.success)
        window.location.href = `${environment.authenticateUrl}${tokenResponse.request_token}?redirect_to=${environment.clientRedirectUrl}`;
    }).catch(error => {
      const errorModel = error.error as ErrorModel;
      this.notificationService.notificationErrorService(errorModel);
    });
  }

}
