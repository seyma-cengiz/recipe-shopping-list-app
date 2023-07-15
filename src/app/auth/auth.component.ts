import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading=false;
    errorMessage: string = null;

    constructor(private authService: AuthService,
        private router: Router) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(authForm: NgForm) {
        if(!authForm.valid){
            return;
        }
        const email = authForm.value.email;
        const password = authForm.value.password;

        let authObservable: Observable<AuthResponseData>;

        this.isLoading=true;
        if(this.isLoginMode)
        {
            authObservable = this.authService.login(email,password);
        }
        else
        {
            authObservable = this.authService.register(email, password);
        }

        authObservable.subscribe({
            next: (response) => {
                console.log(response);
                this.router.navigate(['/recipes']);
                this.isLoading = false;
            },
            error: (errorMessage) => {
                console.error(errorMessage);
                this.errorMessage = errorMessage;
                this.isLoading = false;
            }
        });

        authForm.reset();
    }
}