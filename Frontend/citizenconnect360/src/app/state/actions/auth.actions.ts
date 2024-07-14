// import { createAction, createActionGroup, props } from '@ngrx/store';
// import { adduser, loginuser, registerresponse, loginresponse } from '../../models/auth';

// export const authactions= createActionGroup({
//     source: "Auth API",
//     events:{
//         'login':props<{ user: loginuser }>(),
//         'loginSuccess':props<{ response: loginresponse }>(),
//         'loginFailure':props<{ error: string }>(),

//         'register':props<{ user: adduser }>(),
//         'registerSuccess':props<{ response: registerresponse }>(),
//         'registerFailure':props<{ error: string }>()
//     }

// });
// // export const logout = createAction('[Auth] Logout');
// // auth.actions.ts




// export const registerSuccess = createAction(
//   '[Auth/API] Register Success',
//   props<{ response: registerresponse }>()
// );

// export const registerFailure = createAction(
//   '[Auth/API] Register Failure',
//   props<{ error: any }>()
// );

// export const loginSuccess = createAction(
//   '[Auth/API] Login Success',
//   props<{ response: loginresponse }>()
// );

// export const loginFailure = createAction(
//   '[Auth/API] Login Failure',
//   props<{ error: any }>()
// );
