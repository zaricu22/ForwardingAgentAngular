import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        document.body.style.background = '#11418d';
        this.authService.flagLandingPage();
    }
    ngOnDestroy(): void {
        document.body.style.background = '#f4f4f7';
        this.authService.unflagLandingPage();
    }
}
