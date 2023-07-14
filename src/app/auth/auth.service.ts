import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";


interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
}


@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpClient)
    {}
    
    signUp(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=["API_KEY"]',{
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(errorRes=>{
            let errorMessage= 'An unknow error occured!';
            if(!errorRes.error || !errorRes.error.error)
            {
                return throwError(() => new Error(errorMessage));
            }
            switch(errorRes.error.error.message)
            {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email is already exist';
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    errorMessage = 'Sign-in is not allowed';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'Too many attempts to sign-up. Try again later'
                    break;
            }
            return throwError(() => new Error(errorMessage));
        }));
    }
}