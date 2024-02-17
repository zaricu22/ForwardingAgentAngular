import { ManuService } from './../../../services/manu/manu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Teret } from './../../../interfaces/model/teret';
import { Isporuka } from './../../../interfaces/model/isporuka';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-create-delivery',
    templateUrl: './create-delivery.component.html',
    styleUrls: ['./create-delivery.component.css']
})
export class CreateDeliveryComponent implements OnInit, OnDestroy {
    idManufacturer: number = 0;

    cargos: Array<Teret> = [];
    deliveries: Array<Isporuka> = [];

    subscription1: Subscription = new Subscription;
    subscription2: Subscription = new Subscription;

    constructor(private manuService: ManuService) {}

    ngOnInit(): void {
        this.idManufacturer = JSON.parse(localStorage.getItem('TOKEN') as string).idPreduzeca;

        this.subscription1 = this.manuService.cargoAll(this.idManufacturer).subscribe((res: Array<Teret>) => {
            this.cargos = res;
        });
        this.subscription2 = this.manuService.deliveryAll(this.idManufacturer).subscribe((res: Array<Isporuka>) => {
            this.deliveries = res;
        });
    }

    ngOnDestroy(): void {
      this.subscription1!.unsubscribe();
      this.subscription2!.unsubscribe();
    }
}
