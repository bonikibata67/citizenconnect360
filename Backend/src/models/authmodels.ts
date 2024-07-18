export interface User{
    Id:string,
    Username:string
    Email:string   
    Password:string
    isDeleted:number
    isEmailSent:number
    Role:string
}


export interface Payload{
    Sub:string
    Username:string
    role:string
}
