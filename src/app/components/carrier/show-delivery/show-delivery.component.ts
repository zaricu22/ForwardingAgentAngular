import { CarrService } from './../../../services/carr/carr.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Isporuka } from './../../../interfaces/model/isporuka';

@Component({
    selector: 'app-show-delivery',
    templateUrl: './show-delivery.component.html',
    styleUrls: ['./show-delivery.component.css']
})
export class ShowDeliveryComponent implements OnInit, OnDestroy {
    idCarrier: number = 0;

    deliveries: Array<Isporuka> = [];

    subscription1: Subscription = new Subscription;

    constructor(private carrService: CarrService) {}

    ngOnInit(): void {
        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN') as string).idPreduzeca;

        this.subscription1 = this.carrService.deliveryAll(this.idCarrier).subscribe((res: Array<Isporuka>) => {
            this.deliveries = res;
        });
    }

    ngOnDestroy(): void {
      this.subscription1!.unsubscribe();
    }
}
