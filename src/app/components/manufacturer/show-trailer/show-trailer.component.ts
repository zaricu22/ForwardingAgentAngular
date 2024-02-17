import { ManuService } from './../../../services/manu/manu.service';
import { CarrService } from './../../../services/carr/carr.service';
import { SelectItem } from 'primeng/api';
import { Prikolica } from './../../../interfaces/model/prikolica';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {DataViewLazyLoadEvent} from "primeng/dataview/dataview.interface";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
    selector: 'app-show-trailer',
    templateUrl: './show-trailer.component.html',
    styleUrls: ['./show-trailer.component.css']
})
export class ShowTrailerComponent implements OnInit, OnDestroy {
    trailers: Prikolica[] = [];

    totalRecords: number = 0;
    sortOptions: SelectItem[] = [];
    selectedSort: string = '';

    page: number = 0;
    rowsPerPage: number = 0;
    sortBy: string = '';

    selectedRow: number = 0;

    carrierStars: number = 0;

    subscription1: Subscription = new Subscription;
    subscription2: Subscription = new Subscription;
    subscription3: Subscription = new Subscription;

    constructor(private manuService: ManuService) {}

    ngOnInit(): void {
        this.page = 0;
        this.rowsPerPage = 5;
        this.sortBy = 'tip';

        this.sortOptions = [
            { label: 'Tip', value: 'tip' },
            { label: 'Nosivost', value: 'nosivost' },
            { label: 'KM', value: 'km' },
            { label: 'Prevoznik', value: 'prevoznik' }
        ];

        this.subscription1 = this.manuService.trailerNum().subscribe((res) => {
            this.totalRecords = res;
        });
    }

    ngOnDestroy(): void {
      this.subscription1!.unsubscribe();
      this.subscription2!.unsubscribe();
      this.subscription3!.unsubscribe();
    }

    onSortChange(event: DropdownChangeEvent): void {
        this.sortBy = event.value;
        this.subscription2 = this.manuService.trailerPage(this.page, this.rowsPerPage, this.sortBy).subscribe((res) => {
            this.trailers = res;
        });
    }

    lazyData(event: DataViewLazyLoadEvent): void {
        this.page = event.first / this.rowsPerPage;
        this.subscription3 = this.manuService.trailerPage(this.page, this.rowsPerPage, this.sortBy).subscribe((res) => {
            this.trailers = res;
        });
    }

    showDialog(rowIndexValue: number) {
        this.selectedRow = rowIndexValue;
        this.carrierStars =
            (this.trailers[this.selectedRow].prevoznik!.uspesneIsporuke /
                (this.trailers[this.selectedRow].prevoznik!.uspesneIsporuke + this.trailers[this.selectedRow].prevoznik!.neuspesneIsporuke)) *
            5;
    }
}
