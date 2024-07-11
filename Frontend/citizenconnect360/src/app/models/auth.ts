export interface adduser{
    username:string,
    email:string,
    password:string
}

export interface registerresponse{
    message:string,
    token:string
}

export interface loginuser{
    username:string,
    password:string

}
export interface loginresponse{
    message:string,
    token:string
}
// export interface AuthInterface {
//     loginSuccessMessage: string;
//     loginErrorMessage: string;
//     loginLoading: boolean;
//     registerSuccessMessage: string;
//     registerErrorMessage: string;
//     registerLoading: boolean;
//   }