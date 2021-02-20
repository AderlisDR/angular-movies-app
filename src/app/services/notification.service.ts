import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorModel } from '../models/error-model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  notificationErrorService(errorModel: ErrorModel) {
    const message = errorModel.status_message;
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
