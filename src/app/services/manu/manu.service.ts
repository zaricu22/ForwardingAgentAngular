import { Teret } from './../../interfaces/model/teret';
import { Proizvodjac } from './../../interfaces/model/proizvodjac';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kamion } from 'src/app/interfaces/model/kamion';
import { Prikolica } from 'src/app/interfaces/model/prikolica';
import { Isporuka } from 'src/app/interfaces/model/isporuka';
import { Vozac } from 'src/app/interfaces/model/vozac';

@Injectable({
    providedIn: 'root'
})
export class ManuService {
    constructor(private http: HttpClient) {}

    getManufacturer(idProizvodjac: number): Observable<Proizvodjac> {
        return this.http.get<Proizvodjac>(environment.apiUrl + '/Transport/manu/getManufacturer/' + idProizvodjac);
    }

    cargoAll(idProizvodjac: number): Observable<Array<Teret>> {
        return this.http.get<Array<Teret>>(environment.apiUrl + '/Transport/manu/cargoAll/' + idProizvodjac);
    }

    deliveryAll(idProizvodjac: number): Observable<Array<Isporuka>> {
        return this.http.get<Array<Isporuka>>(environment.apiUrl + '/Transport/manu/deliveryAll/' + idProizvodjac);
    }

    goodsQuantityByMonth(idProizvodjac: number): Observable<Array<number>> {
        return this.http.get<Array<number>>(environment.apiUrl + '/Transport/manu/goodsQuantityByMonth/' + idProizvodjac);
    }

    deliveryCostsByMonth(idProizvodjac: number): Observable<Array<number>> {
        return this.http.get<Array<number>>(environment.apiUrl + '/Transport/manu/deliveryCostsByMonth/' + idProizvodjac);
    }

    cargoByType(idProizvodjac: number): Observable<Array<number>> {
        return this.http.get<Array<number>>(environment.apiUrl + '/Transport/manu/cargoByType/' + idProizvodjac);
    }

    truckNum(): Observable<number> {
        return this.http.get<number>(environment.apiUrl + '/Transport/manu/truckNum');
    }

    truckPage(page: number, perPage: number, sortBy: string): Observable<Kamion[]> {
        let prms = new HttpParams();
        prms = prms.append('page', page.toString());
        prms = prms.append('perPage', perPage.toString());
        prms = prms.append('sortBy', sortBy);
        return this.http.get<Kamion[]>(environment.apiUrl + '/Transport/manu/truckPage', { params: prms });
    }

    trailerNum(): Observable<number> {
        return this.http.get<number>(environment.apiUrl + '/Transport/manu/trailerNum');
    }

    trailerPage(page: number, perPage: number, sortBy: string): Observable<Prikolica[]> {
        let prms = new HttpParams();
        prms = prms.append('page', page.toString());
        prms = prms.append('perPage', perPage.toString());
        prms = prms.append('sortBy', sortBy);
        return this.http.get<Prikolica[]>(environment.apiUrl + '/Transport/manu/trailerPage', {
            params: prms
        });
    }

    driverAll(): Observable<Vozac[]> {
        return this.http.get<Vozac[]>(environment.apiUrl + '/Transport/manu/driverAll');
    }

    driverJobsNum(idDriver: number): Observable<Number> {
        return this.http.get<Number>(environment.apiUrl + '/Transport/manu/driverJobsNum/' + idDriver);
    }

    driverJobs(page: number, perPage: number, sortBy: string, idDriver: number): Observable<Isporuka[]> {
        let prms = new HttpParams();
        prms = prms.append('page', page.toString());
        prms = prms.append('perPage', perPage.toString());
        prms = prms.append('sortBy', sortBy);
        prms = prms.append('id', idDriver.toString());
        return this.http.get<Isporuka[]>(environment.apiUrl + '/Transport/manu/driverJobs', {
            params: prms
        });
    }
}
