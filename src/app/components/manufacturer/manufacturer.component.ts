import { ManuService } from 'src/app/services/manu/manu.service';
import { Proizvodjac } from './../../interfaces/model/proizvodjac';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-manufacturer',
    templateUrl: './manufacturer.component.html',
    styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit, OnDestroy {
    manufacturer: Proizvodjac;
    idManufacturer: number;

    data: any;
    data2: any;
    data3: any;

    subscription1: Subscription;
    subscription2: Subscription;
    subscription3: Subscription;
    subscription4: Subscription;

    constructor(private manuService: ManuService) {}

    ngOnInit(): void {
        let monthNames: Array<string> = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
        let currMonthNames: Array<string> = [];
        let currMonth: number = new Date().getMonth() + 1;
        let currYear: number = new Date().getFullYear();
        for (let i = 0; i < currMonth; i++) {
            currMonthNames[i] = monthNames[i];
        }

        this.idManufacturer = JSON.parse(localStorage.getItem('TOKEN')).idPreduzeca;

        this.subscription1 = this.manuService.getManufacturer(this.idManufacturer).subscribe((res: Proizvodjac) => {
            this.manufacturer = res;
        });

        this.subscription2 = this.manuService.goodsQuantityByMonth(this.idManufacturer).subscribe((res: Array<number>) => {
            this.data = {
                labels: currMonthNames,
                datasets: [
                    {
                        label: currYear,
                        data: res,
                        fill: true,
                        backgroundColor: '#4bc0c0',
                        borderColor: '#5feded'
                    }
                ]
            };
        });

        this.subscription3 = this.manuService.deliveryCostsByMonth(this.idManufacturer).subscribe((res: Array<number>) => {
            this.data2 = {
                labels: currMonthNames,
                datasets: [
                    {
                        label: currYear,
                        data: res,
                        fill: true,
                        borderColor: '#565656'
                    }
                ]
            };
        });

        this.subscription4 = this.manuService.cargoByType(this.idManufacturer).subscribe((res: Array<number>) => {
            this.data3 = {
                labels: ['običan', 'težak', 'lomljiv', 'vredan', 'opasan'],
                datasets: [
                    {
                        data: [res[0], res[1], res[2], res[3], res[4]],
                        backgroundColor: ['#42f551', '#459cff', '#f5ff3b', '#ffb133', '#ff2e2e'],
                        hoverBackgroundColor: ['#61ff6e', '#69afff', '#f8ff75', '#ffbb4d', '#ff4747']
                    }
                ]
            };
        });
    }

    ngOnDestroy(): void {
        if (this.subscription1 != null) this.subscription1.unsubscribe();
        if (this.subscription2 != null) this.subscription2.unsubscribe();
        if (this.subscription3 != null) this.subscription3.unsubscribe();
        if (this.subscription4 != null) this.subscription4.unsubscribe();
    }
}
