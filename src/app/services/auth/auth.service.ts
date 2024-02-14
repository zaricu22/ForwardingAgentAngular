import { AuthToken } from './auth-token';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private logPageFlagSubject = new Subject<boolean>();
    private landingPageFlagSubject = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    login(usern: string, pass: string): Observable<AuthToken> {
        const formData = new FormData();
        formData.append('username', usern);
        formData.append('password', pass);
        return this.http.post<AuthToken>(environment.apiUrl + '/Transport/auth/login', formData);
    }

    credExist(usern: string, pass: string): Observable<boolean> {
        const formData = new FormData();
        formData.append('username', usern);
        formData.append('password', pass);
        return this.http.post<boolean>(environment.apiUrl + '/Transport/auth/credExist', formData);
    }

    register(username: string, password: string, role: string, nazivFirme: string, sediste: string, email: string, telefon: string) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('nazivFirme', nazivFirme);
        formData.append('sediste', sediste);
        formData.append('email', email);
        formData.append('telefon', telefon);
        return this.http.post<boolean>(environment.apiUrl + '/Transport/auth/register', formData);
    }

    logout(): void {
        localStorage.removeItem('TOKEN');
    }

    isLoggedIn(): boolean {
        if (localStorage.getItem('TOKEN') != null) return true;
        else return false;
    }

    getToken(): string {
        if (localStorage.getItem('TOKEN') != null) return JSON.parse(localStorage.getItem('TOKEN')).value;
    }

    getRole(): string {
        if (localStorage.getItem('TOKEN') != null) return JSON.parse(localStorage.getItem('TOKEN')).role;
    }

    getUsername(): string {
        if (localStorage.getItem('TOKEN') != null) return JSON.parse(localStorage.getItem('TOKEN')).username;
    }

    getIdPreduzeca(): number {
        if (localStorage.getItem('TOKEN') != null) return JSON.parse(localStorage.getItem('TOKEN')).idPreduzeca;
    }

    flagLogPage() {
        this.logPageFlagSubject.next(true);
    }

    unflagLogPage() {
        this.logPageFlagSubject.next(false);
    }

    isLogPage(): Observable<boolean> {
        return this.logPageFlagSubject.asObservable();
    }

    flagLandingPage() {
        this.landingPageFlagSubject.next(true);
    }

    unflagLandingPage() {
        this.landingPageFlagSubject.next(false);
    }

    isLandingPage(): Observable<boolean> {
        return this.landingPageFlagSubject.asObservable();
    }
}
