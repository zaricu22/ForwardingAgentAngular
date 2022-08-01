import { CarrService } from 'src/app/services/carr/carr.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Isporuka } from 'src/app/interfaces/model/isporuka';

@Component({
    selector: 'app-show-delivery',
    templateUrl: './show-delivery.component.html',
    styleUrls: ['./show-delivery.component.css']
})
export class ShowDeliveryComponent implements OnInit, OnDestroy {
    idCarrier: number;

    deliveries: Array<Isporuka>;

    subscription1: Subscription;

    constructor(private carrService: CarrService) {}

    ngOnInit(): void {
        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN')).idPreduzeca;

        this.subscription1 = this.carrService.deliveryAll(this.idCarrier).subscribe((res: Array<Isporuka>) => {
            this.deliveries = res;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription1 != null) this.subscription1.unsubscribe();
    }
}
