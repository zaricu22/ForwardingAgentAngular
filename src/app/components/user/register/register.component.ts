import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Role } from 'src/app/enums/role.enum';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [MessageService]
})
export class RegisterComponent implements OnInit, OnDestroy {
    invalidCred: boolean = false;
    invalidReg: boolean = false;

    prvaStrana: boolean = true;
    odabranoPreduzece: boolean = true;
    username: string;
    password: string;
    nazivFirme: string;
    sediste: string;
    email: string;
    telefon: string;

    items: MenuItem[];
    activeIndex: number = 0;

    subscription1: Subscription;
    subscription2: Subscription;

    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

    ngOnInit(): void {
        this.items = [{ label: 'Korisnik' }, { label: 'Preduzece' }];
    }

    ngOnDestroy(): void {
        if (this.subscription1 != null) this.subscription1.unsubscribe();
        if (this.subscription2 != null) this.subscription2.unsubscribe();
    }

    greskaToast(): void {
        this.messageService.add({ severity: 'error', summary: 'Neuspešna registracija', detail: 'Greška na serveru!' });
    }

    register(): void {
        let role: string;
        if (this.odabranoPreduzece) role = Role.Manufacturer;
        else role = Role.Carrier;
        if (
            this.nazivFirme == null ||
            this.username.trim().length == 0 ||
            this.sediste == null ||
            this.username.trim().length == 0 ||
            this.email == null ||
            this.username.trim().length == 0 ||
            this.telefon == null ||
            this.username.trim().length == 0
        )
            this.invalidReg = true;
        else {
            this.subscription1 = this.authService.register(this.username, this.password, role, this.nazivFirme, this.sediste, this.email, this.telefon).subscribe(
                (res) => {
                    if (res == true) this.router.navigate(['login']);
                },
                (err) => {
                    this.greskaToast();
                }
            );
        }
    }

    promeniKorak(): void {
        if (this.activeIndex == 0) {
            this.subscription2 = this.authService.credExist(this.username, this.password).subscribe(
                (res: boolean) => {
                    if (this.username == null || this.username.trim().length == 0 || res == true) this.invalidCred = true;
                    else {
                        this.activeIndex = 1;
                        this.prvaStrana = !this.prvaStrana;
                    }
                },
                (err) => {
                    this.greskaToast();
                }
            );
        } else {
            this.activeIndex = 0;
            this.prvaStrana = !this.prvaStrana;
        }
    }
}
