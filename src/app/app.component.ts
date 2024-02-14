import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Role } from './enums/role.enum';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('sidebarShow', [
            state(
                'show',
                style({
                    opacity: 1
                })
            ),
            state(
                'hide',
                style({
                    opacity: 0
                })
            ),
            transition('show=>hide', animate('200ms ease-out')),
            transition('hide=>show', animate('200ms ease-in'))
        ])
    ]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
    title = 'TransportAngApp';
    sidebarCarrShow: boolean = false;
    sidebarManuShow: boolean = false;
    sidebarDisplayed: boolean = false;
    toggleFlag: boolean = false;

    logPage: boolean = false;
    landingPage: boolean = false;
    selectedMenuItem: number = 1;

    subscription1: Subscription;
    subscription2: Subscription;

    constructor(private authService: AuthService, private cdRef: ChangeDetectorRef, private router: Router) {}

    ngOnInit() {
        this.subscription1 = this.authService.isLogPage().subscribe((res: boolean) => {
            this.logPage = res;
        });

        this.subscription2 = this.authService.isLandingPage().subscribe((res: boolean) => {
            this.logPage = res;
        });
    }

    ngOnDestroy(): void {
        this.subscription1!.unsubscribe();
        this.subscription2!.unsubscribe();
    }

    ngAfterViewChecked() {
        // zbog logPage & landingPage flagova, ucitaju se tek nakon prikaza
        this.cdRef.detectChanges();
    }

    isLogged(): boolean {
        return this.authService.isLoggedIn();
    }

    logout(): void {
        this.sidebarCarrShow = false;
        this.sidebarManuShow = false;
        this.sidebarDisplayed = false;
        this.authService.logout();
        this.router.navigate(['/home']);
    }

    isCarrier(): boolean {
        return this.authService.getRole() == Role.Carrier;
    }

    isManufacturer(): boolean {
        return this.authService.getRole() == Role.Manufacturer;
    }

    sidebarCarrStateName(): string {
        return this.sidebarCarrShow ? 'show' : 'hide';
    }
    sidebarManuStateName(): string {
        return this.sidebarManuShow ? 'show' : 'hide';
    }

    toggleSideBar(): void {
        if (this.isCarrier()) this.sidebarCarrShow = !this.sidebarCarrShow;
        else this.sidebarManuShow = !this.sidebarManuShow;
        this.sidebarDisplayed = !this.sidebarDisplayed;
        this.toggleFlag = true;
    }

    closeSideBar(event): void {
        // toggleFlag da ne bi ponistavao toggle button posto se racuna kao izvan menija
        if (!this.toggleFlag && this.sidebarDisplayed) {
            this.sidebarCarrShow = false;
            this.sidebarManuShow = false;
            this.sidebarDisplayed = false;
        }
        this.toggleFlag = false;
    }
}
