import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token';
import { AuthGuard } from './guard/auth.guard';
import routes from './app.routes';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideStore(reducers, { metaReducers }),    
    provideEffects(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([])),
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    // AuthGuard,
]};

// provideRouter(routes)
