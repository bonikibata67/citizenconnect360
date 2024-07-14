// import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
// import { Observable } from "rxjs";

// export function TokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//     if(req.url==='http://localhost:4000/auth/login' || req.url==='http://localhost:4000/auth/register'){
//         return next(req)
//     }else{
//      const token = localStorage.getItem('token') as string
//     const modifiedRequest= req.clone({headers:new HttpHeaders().append('token', token)})
//     return next(modifiedRequest);
//     }
//   }
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next.handle(req);
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    }
  }
}
