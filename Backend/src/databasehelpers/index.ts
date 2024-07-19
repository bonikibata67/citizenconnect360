import { ConnectionPool, Request } from "mssql";
import mssql from 'mssql'
import { sqlConfig } from "../config";
export class DbHelper{

    
    private pool :Promise<ConnectionPool>
    constructor() {
       
        this.pool= mssql.connect(sqlConfig) 
    }

    private createRequest(emptyRequest:Request, data:{[x:string]: string|number}){
       
        const keys = Object.keys(data)
        keys.map(key=>{
            emptyRequest.input(key, data[key])
        })
        return emptyRequest
    }

    async exec(storedprocedure:string, data:{[x:string]: string|number}){
       
        const emptyRequest= (await this.pool).request()
        const request=this.createRequest(emptyRequest,data)
        let results= (await request.execute(storedprocedure))
        return results
    }

    async query(queryString: string, p0: { Username: any; }){
        return (await ((await this.pool).request().query(queryString)))
    }

    async getUser(username: string) {
        try {
            const result = await this.exec('GetUser', { Username: username });
            return result.recordset[0]; // Assuming only one user is returned based on username
        } catch (error) {
            throw error;
        }
    }
    async getViews() {
        return this.exec('GetViews', {});
    }

    async addView(username: string, location: string, role: string, viewText: string) {
        const data = {
            Username: username,
            Location: location,
            Role: role,
            ViewText: viewText
        };
        return this.exec('AddView', data);
    }

    
}