import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:              
              alert('Session expired or unauthorized. Please log in again.');
              break;
            case 500:
              alert('Oops! A server error occurred.');
              break;
            default:
              alert(`An error occurred: ${error.message}`);
              break;
          }
        }
        return throwError(() => error);
      })
    );
  }
}
