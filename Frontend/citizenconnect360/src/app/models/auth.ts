export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface adduser {
    username: string;
    email: string;
    password: string;
    role: string;
  }
  
  export interface loginresponse {
    token: string;
    user: User | null;
    message?: string; // Optional message property
  }
  
  export interface registerresponse {
    token: string;
    user: User;
    message: string; // Required message property
  }
  export interface loginuser{
    username:string,
    password:string

}
  


// export interface User {
//     // UserID:number;
//     id:number;
//     username: string;
//     password: string;
//     email:string,
//     role: 'citizen' | 'government' | 'admin';
//     token?: string;
//   }
// export interface adduser{
//     username:string,
//     email:string,
//     password:string
// }

// export interface registerresponse{
//     message:string,
//     token:string
// }

// export interface loginuser{
//     username:string,
//     password:string

// }
// export interface loginresponse{
//     message:string,
//     token:string
// }
// export interface AuthInterface {
//     loginSuccessMessage: string;
//     loginErrorMessage: string;
//     loginLoading: boolean;
//     registerSuccessMessage: string;
//     registerErrorMessage: string;
//     registerLoading: boolean;
//   }