// auth.reducers.ts

// import { createReducer, on } from '@ngrx/store';
// // import { createReducer, on } from '@ngrx/store';
// import { authactions } from '../actions/auth.actions';
// import { registerresponse, loginresponse } from '../../models/auth';

// // import { AuthState } from '../models/auth';
// // import { authactions } from '../actions/auth.actions';
// export interface AuthState {
//   user: registerresponse | null;
//   error: string | null;
//   isAuthenticated: boolean;
// }
export interface AuthInterface {
  loginSuccessMessage: string;
  loginErrorMessage: string;
  loginLoading: boolean;
  registerSuccessMessage: string;
  registerErrorMessage: string;
  registerLoading: boolean;
}

// export const initialState: AuthState = {
//   user: null,
//   error: null,
//   isAuthenticated: false
// };

// export const authReducer = createReducer(
//   initialState,
//   on(authactions.registerSuccess, (state, { response }) => ({
//     ...state,
//     user: response.user,
//     isAuthenticated: true,
//     error: null
//   })),
//   on(authactions.registerFailure, (state, { error }) => ({
//     ...state,
//     error
//   })),
//   on(authactions.loginSuccess, (state, { response }) => ({
//     ...state,
//     user: response.user,
//     isAuthenticated: true,
//     error: null
//   })),
//   on(authactions.loginFailure, (state, { error }) => ({
//     ...state,
//     error
//   }))
// );
// // import { createReducer, on } from '@ngrx/store';
// // import { authactions } from '../actions/auth.actions';
// // import { registerresponse, loginresponse } from '../../models/auth';


// export interface AuthInterface {
//     loginSuccessMessage: string;
//     loginErrorMessage: string;
//     loginLoading: boolean;
//     registerSuccessMessage: string;
//     registerErrorMessage: string;
//     registerLoading: boolean;
//   }

// export interface AuthState {
//   user: registerresponse | null;
//   error: string | null;
//   isAuthenticated: boolean;
// }

// export const initialState: AuthState = {
//   user: null,
//   error: null,
//   isAuthenticated: false
// };

// export const authReducer = createReducer(
//   initialState,
//   on(authactions.registerSuccess, (state, { response }) => ({
//     ...state,
//     user: response,
//     isAuthenticated: true,
//     error: null
//   })),
//   on(authactions.registerFailure, (state, { error }) => ({
//     ...state,
//     error
//   })),
//   on(authactions.loginSuccess, (state, { response }) => ({
//     ...state,
//     user: response,
//     isAuthenticated: true,
//     error: null
//   })),
//   on(authactions.loginFailure, (state, { error }) => ({
//     ...state,
//     error
//   }))
// );


// // ,
// //   on(authactions.logout, state => ({
// //     ...state,
// //     user: null,
// //     isAuthenticated: false,
// //     error: null
// //   }))