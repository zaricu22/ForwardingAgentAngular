import { Prikolica } from './../../interfaces/model/prikolica';
import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Kamion } from './../../interfaces/model/kamion';
import { Vozac } from './../../interfaces/model/vozac';
import { Prevoznik } from './../../interfaces/model/prevoznik';
import { Isporuka } from './../../interfaces/model/isporuka';

@Injectable({
    providedIn: 'root'
})
export class CarrService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getCarrier(idPrevoznik: number): Observable<Prevoznik> {
        return this.http.get<Prevoznik>(environment.apiUrl + '/Transport/carr/getCarrier/' + idPrevoznik);
    }

    deliveryAll(idProizvodjac: number): Observable<Array<Isporuka>> {
        return this.http.get<Array<Isporuka>>(environment.apiUrl + '/Transport/manu/deliveryAll/' + idProizvodjac);
    }

    truckAges(idPrevoznik: number): Observable<Array<number>> {
        return this.http.get<Array<number>>(environment.apiUrl + '/Transport/carr/truckAge/' + idPrevoznik);
    }

    deliverySuccess(idPrevoznik: number): Observable<Array<number>> {
        return this.http.get<Array<number>>(environment.apiUrl + '/Transport/carr/deliverySuccess/' + idPrevoznik);
    }

    salaryByMonth(idPrevoznik: number): Observable<Array<number>> {
        return this.http.get<Array<number>>(environment.apiUrl + '/Transport/carr/salaryByMonth/' + idPrevoznik);
    }

    jobsByMonth(idPrevoznik: number): Observable<Array<number>> {
        return this.http.get<Array<number>>(environment.apiUrl + '/Transport/carr/jobsByMonth/' + idPrevoznik);
    }

    truckNum(idCarrier: number): Observable<number> {
        let prms = new HttpParams();
        prms = prms.append('idPrevoznik', idCarrier.toString());
        return this.http.get<number>(environment.apiUrl + '/Transport/carr/truckNum', { params: prms });
    }

    truckAll(idPrevoznik: number): Observable<Kamion[]> {
        return this.http.get<Kamion[]>(environment.apiUrl + '/Transport/carr/truckAll/' + idPrevoznik);
    }

    truckPage(page: number, perPage: number, sortBy: string, idPrevoznik: number): Observable<Kamion[]> {
        let prms = new HttpParams();
        prms = prms.append('page', page.toString());
        prms = prms.append('perPage', perPage.toString());
        prms = prms.append('sortBy', sortBy);
        prms = prms.append('idPrevoznik', idPrevoznik.toString());
        return this.http.get<Kamion[]>(environment.apiUrl + '/Transport/carr/truckPage', { params: prms });
    }

    trailerNum(idCarrier: number): Observable<number> {
        let prms = new HttpParams();
        prms = prms.append('idPrevoznik', idCarrier.toString());
        return this.http.get<number>(environment.apiUrl + '/Transport/carr/trailerNum', { params: prms });
    }

    trailerAll(idPrevoznik: number): Observable<Prikolica[]> {
        return this.http.get<Prikolica[]>(environment.apiUrl + '/Transport/carr/trailerAll/' + idPrevoznik);
    }

    trailerPage(page: number, perPage: number, sortBy: string, idPrevoznik: number): Observable<Prikolica[]> {
        let prms = new HttpParams();
        prms = prms.append('page', page.toString());
        prms = prms.append('perPage', perPage.toString());
        prms = prms.append('sortBy', sortBy);
        prms = prms.append('idPrevoznik', idPrevoznik.toString());
        return this.http.get<Prikolica[]>(environment.apiUrl + '/Transport/carr/trailerPage', {
            params: prms
        });
    }

    driverNum(idCarrier: number): Observable<number> {
        let prms = new HttpParams();
        prms = prms.append('idPrevoznik', idCarrier.toString());
        return this.http.get<number>(environment.apiUrl + '/Transport/carr/driverNum', { params: prms });
    }

    driverPage(page: number, perPage: number, sortBy: string, idPrevoznik: number): Observable<Vozac[]> {
        let prms = new HttpParams();
        prms = prms.append('page', page.toString());
        prms = prms.append('perPage', perPage.toString());
        prms = prms.append('sortBy', sortBy);
        prms = prms.append('idPrevoznik', idPrevoznik.toString());
        return this.http.get<Vozac[]>(environment.apiUrl + '/Transport/carr/driverPage', {
            params: prms
        });
    }

    createTruck(kam: Kamion): Observable<Kamion> {
        let idPrevoznik: number = this.authService.getIdPreduzeca();
        return this.http.post<Kamion>(environment.apiUrl + '/Transport/carr/createTruck/' + idPrevoznik, kam);
    }

    updateTruck(kam: Kamion): Observable<Kamion> {
        return this.http.put<Kamion>(environment.apiUrl + '/Transport/carr/updateTruck', kam);
    }

    deleteTruck(id: number): Observable<Boolean> {
        return this.http.delete<Boolean>(environment.apiUrl + '/Transport/carr/deleteTruck/' + id);
    }

    createTrailer(prik: Prikolica): Observable<Prikolica> {
        let idPrevoznik: number = this.authService.getIdPreduzeca();
        return this.http.post<Prikolica>(environment.apiUrl + '/Transport/carr/createTrailer/' + idPrevoznik, prik);
    }

    updateTrailer(prik: Prikolica): Observable<Prikolica> {
        return this.http.put<Prikolica>(environment.apiUrl + '/Transport/carr/updateTrailer', prik);
    }

    deleteTrailer(id: number): Observable<Boolean> {
        return this.http.delete<Boolean>(environment.apiUrl + '/Transport/carr/deleteTrailer/' + id);
    }

    createDriver(voz: Vozac): Observable<Vozac> {
        let idPrevoznik: number = this.authService.getIdPreduzeca();
        return this.http.post<Vozac>(environment.apiUrl + '/Transport/carr/createDriver/' + idPrevoznik, voz);
    }

    updateDriver(voz: Vozac): Observable<Vozac> {
        return this.http.put<Vozac>(environment.apiUrl + '/Transport/carr/updateDriver', voz);
    }

    deleteDriver(id: number): Observable<Boolean> {
        return this.http.delete<Boolean>(environment.apiUrl + '/Transport/carr/deleteDriver/' + id);
    }
}
