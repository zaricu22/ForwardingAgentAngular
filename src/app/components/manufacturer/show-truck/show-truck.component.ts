import { ManuService } from './../../../services/manu/manu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Kamion } from './../../../interfaces/model/kamion';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import {DataViewLazyLoadEvent} from "primeng/dataview/dataview.interface";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
    selector: 'app-show-truck',
    templateUrl: './show-truck.component.html',
    styleUrls: ['./show-truck.component.css']
})
export class ShowTruckComponent implements OnInit, OnDestroy {
    trucks: Kamion[] = [];

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

        this.subscription1 = this.manuService.truckNum().subscribe((res) => {
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
        this.subscription2 = this.manuService.truckPage(this.page, this.rowsPerPage, this.sortBy).subscribe((res) => {
            this.trucks = res;
        });
    }

    lazyData(event: DataViewLazyLoadEvent): void {
        this.page = event.first / this.rowsPerPage;
        this.subscription3 = this.manuService.truckPage(this.page, this.rowsPerPage, this.sortBy).subscribe((res) => {
            this.trucks = res;
        });
    }

    showDialog(rowIndexValue: number) {
        this.selectedRow = rowIndexValue;
        this.carrierStars =
            (this.trucks[this.selectedRow].prevoznik!.uspesneIsporuke /
                (this.trucks[this.selectedRow].prevoznik!.uspesneIsporuke +
                  this.trucks[this.selectedRow].prevoznik!.neuspesneIsporuke)) * 5;
    }
}
