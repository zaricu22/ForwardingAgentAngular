import { CarrService } from './../../services/carr/carr.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prevoznik } from './../../interfaces/model/prevoznik';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-carrier',
    templateUrl: './carrier.component.html',
    styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit, OnDestroy {
    carrier: Prevoznik | null = null;
    idCarrier: number = 0;

    data: any;
    data2: any;
    data3: any;
    data4: any;

    subscription1: Subscription = new Subscription;
    subscription2: Subscription = new Subscription;
    subscription3: Subscription = new Subscription;
    subscription4: Subscription = new Subscription;
    subscription5: Subscription = new Subscription;

    constructor(private carrService: CarrService) {}

    ngOnInit(): void {
        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN') as string).idPreduzeca;

        this.subscription1 = this.carrService.getCarrier(this.idCarrier).subscribe((res: Prevoznik) => {
            this.carrier = res;
        });

        let monthNames: Array<string> = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
        let currMonthNames: Array<string> = [];
        let currMonth: number = new Date().getMonth() + 1;
        let currYear: number = new Date().getFullYear();
        for (let i = 0; i < currMonth; i++) {
            currMonthNames[i] = monthNames[i];
        }

        this.subscription2 = this.carrService.salaryByMonth(this.idCarrier).subscribe((res: Array<number>) => {
            this.data = {
                labels: currMonthNames,
                datasets: [
                    {
                        label: currYear,
                        data: res,
                        fill: true,
                        borderColor: '#4bc0c0'
                    }
                ]
            };
        });

        this.subscription3 = this.carrService.jobsByMonth(this.idCarrier).subscribe((res: Array<number>) => {
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

        this.subscription4 = this.carrService.deliverySuccess(this.idCarrier).subscribe((res: Array<number>) => {
            this.data3 = {
                labels: ['završene', 'zakasnele', 'otkazane'],
                datasets: [
                    {
                        data: [res[0], res[1], res[2]],
                        backgroundColor: ['#27ba29', '#fffb00', '#de1212'],
                        hoverBackgroundColor: ['#38ff3b', '#ccc900', '#ff2424']
                    }
                ]
            };
        });

        this.subscription5 = this.carrService.truckAges(this.idCarrier).subscribe((res: Array<number>) => {
            this.data4 = {
                labels: ['<2', '<5', '<10', '<15', '<20'],
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
      this.subscription1!.unsubscribe();
      this.subscription2!.unsubscribe();
      this.subscription3!.unsubscribe();
      this.subscription4!.unsubscribe();
      this.subscription5!.unsubscribe();
    }
}
