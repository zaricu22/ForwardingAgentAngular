import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TransportAppInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.authService.getToken()) {
            const authReq = request.clone({
                headers: request.headers.set('Authorization', 'Basic' + this.authService.getToken())
            });
            request = authReq;
        }
        console.log('INTERCEPTOR: Authorization ' + request.headers.get('Authorization'));
        return next.handle(request);
    }
}
