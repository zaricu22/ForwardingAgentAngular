import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Role } from '../../../enums/role.enum';
import { Subscription } from 'rxjs';
import { AuthToken } from 'src/app/services/auth/auth-token';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {
    username: string;
    password: string;

    invalidLogin: boolean = false;

    subscription1: Subscription;

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

    ngOnInit(): void {
        this.authService.flagLogPage();
    }

    ngOnDestroy(): void {
        this.authService.unflagLogPage();
        if (this.subscription1 != null) this.subscription1.unsubscribe();
    }

    greskaToast(): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Neuspešno prijavljivanje',
            detail: 'Greška na serveru!'
        });
    }

    login(): void {
        // aa -> CARRIER -> idPreduzeca: 1
        // bb -> MANUFACTURER -> idPreduzeca: 2
        // localStorage.setItem('TOKEN', '{ "value": "gL2Zi4t6ysREH7CMCkNTIg11z", "username": "aa", "role": "CARRIER", "idPreduzeca": "1" }');
        // if (this.authService.getRole() == Role.Carrier) this.router.navigate(['carrier']);
        // else this.router.navigate(['manufacturer']);

        this.subscription1 = this.authService.login(this.username, this.password).subscribe(
            (res: AuthToken) => {
                if (res != null) {
                    localStorage.setItem('TOKEN', JSON.stringify(res));
                    if (res.role == Role.Carrier) this.router.navigate(['carrier']);
                    else this.router.navigate(['manufacturer']);
                } else {
                    this.invalidLogin = true;
                }
            },
            (err) => {
                this.greskaToast();
            }
        );
    }

    isLogged(): boolean {
        return this.authService.isLoggedIn();
    }
}
