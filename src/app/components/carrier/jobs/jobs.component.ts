import { Isporuka } from '../../../interfaces/model/isporuka';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ManuService } from '../../../services/manu/manu.service';
import { Vozac } from '../../../interfaces/model/vozac';
import { __await } from 'tslib';
import { Subscription } from 'rxjs';
import {DataViewLazyLoadEvent} from "primeng/dataview/dataview.interface";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
    driverJobsArray: Array<Isporuka> = [];
    idCarrier: number = 0;

    totalRecords: number = 0;
    sortOptions: SelectItem[] = [];
    driverOptions: SelectItem[] = [];
    selectedSort: string = 'statusDostave';
    selectedDriverId: number = 0;

    page: number = 0;
    rowsPerPage: number = 0;

    subscription1: Subscription = new Subscription;
    subscription2: Subscription = new Subscription;
    subscription3: Subscription = new Subscription;
    subscription4: Subscription = new Subscription;
    subscription5: Subscription = new Subscription;
    subscription6: Subscription = new Subscription;
    subscription7: Subscription = new Subscription;

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

        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN') as string).idPreduzeca;

        this.subscription1 = this.manuService.driverAll().subscribe((res: Array<Vozac>) => {
            for (let i = 0; i < res.length; i++) {
                this.driverOptions.push({ label: res[i].ime + ' ' + res[i].prezime, value: res[i].idVozac });
            }
        });
    }

    ngOnDestroy(): void {
      this.subscription1!.unsubscribe();
      this.subscription2!.unsubscribe();
      this.subscription3!.unsubscribe();
      this.subscription4!.unsubscribe();
      this.subscription5!.unsubscribe();
      this.subscription6!.unsubscribe();
      this.subscription7!.unsubscribe();
    }

    onSortChange(event: DropdownChangeEvent): void {
        this.selectedSort = event.value;
        this.subscription2 = this.manuService.driverJobs(this.page, this.rowsPerPage, this.selectedSort, this.selectedDriverId).subscribe((res) => {
            this.driverJobsArray = res;
        });
    }

    onDriverChange(event: DropdownChangeEvent): void {
        this.selectedDriverId = event.value;
        this.subscription3 = this.manuService.driverJobsNum(this.selectedDriverId).subscribe((res: number) => {
            this.totalRecords = res;
        });
        this.subscription4 = this.manuService.driverJobs(this.page, this.rowsPerPage, this.selectedSort, this.selectedDriverId).subscribe((res) => {
            this.driverJobsArray = res;
        });
    }

    lazyData(event: DataViewLazyLoadEvent): void {
        this.page = event.first / this.rowsPerPage;
        this.subscription5 = this.manuService.driverAll().subscribe((res: Array<Vozac>) => {
            this.selectedDriverId = res[0].idVozac!;
            this.subscription6 = this.manuService.driverJobs(this.page, this.rowsPerPage, this.selectedSort, this.selectedDriverId).subscribe((res) => {
                this.driverJobsArray = res;
            });
            this.subscription7 = this.manuService.driverJobsNum(this.selectedDriverId).subscribe((res: number) => {
                this.totalRecords = res;
            });
        });
    }
}
