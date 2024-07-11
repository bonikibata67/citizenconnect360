import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { authactions } from '../actions/auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authactions.register),
      mergeMap(action =>
        this.authService.registerUser(action.user).pipe(
          map(response => authactions.registerSuccess({ response })),
          catchError(error => of(authactions.registerFailure({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authactions.login),
      mergeMap(action =>
        this.authService.loginUsers(action.user).pipe(
          map(response => authactions.loginSuccess({ response })),
          catchError(error => of(authactions.loginFailure({ error })))
        )
      )
    )
  );

//   logout$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(authactions.logout),
//       map(() => {
//         this.authService.logout();
//         this.router.navigate(['/login']);
//       })
//     ),
//     { dispatch: false }
//   );
}
