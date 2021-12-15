import axios from "axios";
import { AppConstants } from "../common/app.constants";


export class AuthService{
    
    login(credentials:any): any{
        axios.post(AppConstants.AUTH_API+'signin', {
            email: credentials.username,
            password: credentials.password
        },{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            return res
        })
    }
    
    register(user:any): any{
        axios.post(AppConstants.AUTH_API+'signup',{
            displayName: user.displayName,
            email: user.email,
            password: user.password,
            matchingPassword: user.matchingPassword,
            socialProvider: 'LOCAL'
          }, {
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res =>{
            console.log(res)
            return res
        })
    }
}