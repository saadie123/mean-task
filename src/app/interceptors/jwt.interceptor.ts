import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injector, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem("token");
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
