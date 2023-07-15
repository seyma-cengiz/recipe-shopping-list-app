import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";


export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?: boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient)
    {}

    login(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]',{
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(errorRes=>{
            return this.handleError(errorRes);
        }), 
        tap(resData => {
            this.handleAuthentication(resData.localId, resData.email,resData.idToken, +resData.expiresIn);
        }));
    }
    
    register(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',{
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(errorRes=>{
           return this.handleError(errorRes);
        }), 
        tap(resData => {
            this.handleAuthentication(resData.localId, resData.email,resData.idToken, +resData.expiresIn);
        }));
    }

    private handleError(errorRes: HttpErrorResponse){
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
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no registered user with this e-mail';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
        }
        return throwError(() => new Error(errorMessage));
    }

    private handleAuthentication(id:string, email:string, token:string, expiresIn: number)
    {
        const expirationDate = new Date(new Date().getTime() + (+expiresIn *1000));
        const user = new User(id, email, token,expirationDate);
        this.user.next(user);
    }
}