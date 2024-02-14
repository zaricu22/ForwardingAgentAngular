import { Isporuka } from '../../../interfaces/model/isporuka';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ManuService } from '../../../services/manu/manu.service';
import { Vozac } from '../../../interfaces/model/vozac';
import { __await } from 'tslib';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
    driverJobsArray: Array<Isporuka> = [];
    idCarrier: number;

    totalRecords: number;
    sortOptions: SelectItem[];
    driverOptions: SelectItem[] = [];
    selectedSort: string = 'statusDostave';
    selectedDriverId: number;

    page: number;
    rowsPerPage: number;

    subscription1: Subscription;
    subscription2: Subscription;
    subscription3: Subscription;
    subscription4: Subscription;
    subscription5: Subscription;
    subscription6: Subscription;
    subscription7: Subscription;

    constructor(private manuService: ManuService) {}

    ngOnInit(): void {
        this.page = 0;
        this.rowsPerPage = 5;

        this.sortOptions = [
            { label: 'Status Dostave', value: 'statusDostave' },
            { label: 'Status Placanja', value: 'statusPlacanja' },
            { label: 'Tip', value: 'tip' },
            { label: 'Cena', value: 'cena' },
            { label: 'Km', value: 'km' },
            { label: 'Vreme polaska', value: 'vremePolaska' },
            { label: 'Vreme dolaska', value: 'vremeDolaska' },
            { label: 'Mesto polaska', value: 'mestoPolaska' },
            { label: 'Mesto dolaska', value: 'mestoDolaska' }
        ];

        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN')).idPreduzeca;

        this.subscription1 = this.manuService.driverAll().subscribe((res: Array<Vozac>) => {
            for (let i = 0; i < res.length; i++) {
                this.driverOptions.push({ label: res[i].ime + ' ' + res[i].prezime, value: res[i].idVozac });
            }
        });
    }

    ngOnDestroy(): void {
      if(this.subscription1 != null) this.subscription1.unsubscribe();
      if(this.subscription2 != null) this.subscription2.unsubscribe();
      if(this.subscription3 != null) this.subscription3.unsubscribe();
      if(this.subscription4 != null) this.subscription4.unsubscribe();
      if(this.subscription5 != null) this.subscription5.unsubscribe();
      if(this.subscription6 != null) this.subscription6.unsubscribe();
      if(this.subscription7 != null)  this.subscription7.unsubscribe();
    }

    onSortChange(event): void {
        this.selectedSort = event.value;
        this.subscription2 = this.manuService.driverJobs(this.page, this.rowsPerPage, this.selectedSort, this.selectedDriverId).subscribe((res) => {
            this.driverJobsArray = res;
        });
    }

    onDriverChange(event): void {
        this.selectedDriverId = event.value;
        this.subscription3 = this.manuService.driverJobsNum(this.selectedDriverId).subscribe((res: number) => {
            this.totalRecords = res;
        });
        this.subscription4 = this.manuService.driverJobs(this.page, this.rowsPerPage, this.selectedSort, this.selectedDriverId).subscribe((res) => {
            this.driverJobsArray = res;
        });
    }

    lazyData(event): void {
        this.page = event.first / this.rowsPerPage;
        this.subscription5 = this.manuService.driverAll().subscribe((res: Array<Vozac>) => {
            this.selectedDriverId = res[0].idVozac;
            this.subscription6 = this.manuService.driverJobs(this.page, this.rowsPerPage, this.selectedSort, this.selectedDriverId).subscribe((res) => {
                this.driverJobsArray = res;
            });
            this.subscription7 = this.manuService.driverJobsNum(this.selectedDriverId).subscribe((res: number) => {
                this.totalRecords = res;
            });
        });
    }
}
