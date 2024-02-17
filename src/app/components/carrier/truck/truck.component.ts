import { CarrService } from './../../../services/carr/carr.service';
import { SelectItem, MessageService } from 'primeng/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Kamion } from './../../../interfaces/model/kamion';
import { Subscription } from 'rxjs';
import {DataViewLazyLoadEvent} from "primeng/dataview/dataview.interface";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
    selector: 'app-truck',
    templateUrl: './truck.component.html',
    styleUrls: ['./truck.component.css'],
    providers: [MessageService]
})
export class TruckComponent implements OnInit, OnDestroy {
    truckArray: Array<Kamion> = [];
    idCarrier: number = 0;

    truckCategories: SelectItem[] = [];

    totalRecords: number = 0;
    sortOptions: SelectItem[] = [];
    selectedSort: string = '';

    page: number = 0;
    rowsPerPage: number = 0;
    sortBy: string = '';

    selectedRow: number = 0;
    dialogFieldModel: string = '';
    dialogFieldTip: string = '';
    dialogFieldGodiste: number = 0;
    dialogFieldNosivost: number = 0;
    dialogFieldKm: number = 0;
    dialogFieldSlika: string = '';
    displayCreateDialog: boolean = false;
    displayEditDialog: boolean = false;
    displayRemoveDialog: boolean = false;

    subscription1: Subscription = new Subscription;
    subscription2: Subscription = new Subscription;
    subscription3: Subscription = new Subscription;
    subscription4: Subscription = new Subscription;
    subscription5: Subscription = new Subscription;
    subscription6: Subscription = new Subscription;

    constructor(private carrService: CarrService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.page = 0;
        this.rowsPerPage = 5;
        this.sortBy = 'tip';

        this.truckCategories = [
            { label: 'Hladnjaca', value: 'Hladnjaca' },
            { label: 'Tanker', value: 'Tanker' },
            { label: 'Mesalica', value: 'Mesalica' },
            { label: 'Kiper', value: 'Kiper' },
            { label: 'Tegljac', value: 'Tegljac' },
            { label: 'Sanduk', value: 'Sanduk' },
            { label: 'Utovarna Ruka', value: 'Utovarna Ruka' },
            { label: 'Standardni', value: 'Standardni' }
        ];

        this.sortOptions = [
            { label: 'Tip', value: 'tip' },
            { label: 'Nosivost', value: 'nosivost' },
            { label: 'KM', value: 'km' }
        ];

        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN') as string).idPreduzeca;

        this.subscription1 = this.carrService.truckNum(this.idCarrier).subscribe((res) => {
            this.totalRecords = res;
        });
    }

    ngOnDestroy(): void {
      this.subscription1!.unsubscribe();
      this.subscription2!.unsubscribe();
      this.subscription3!.unsubscribe();
      this.subscription4!.unsubscribe();
      this.subscription5!.unsubscribe();
      this.subscription6!.unsubscribe();
    }

    onSortChange(event: DropdownChangeEvent): void {
        this.sortBy = event.value;
        this.subscription2 = this.carrService.truckPage(this.page, this.rowsPerPage, this.sortBy, this.idCarrier).subscribe((res) => {
            this.truckArray = res;
        });
    }

    lazyData(event: DataViewLazyLoadEvent): void {
        this.page = event.first / this.rowsPerPage;
        this.subscription3 = this.carrService.truckPage(this.page, this.rowsPerPage, this.sortBy, this.idCarrier).subscribe((res) => {
            this.truckArray = res;
        });
    }

    displayCreate(): void {
        this.displayCreateDialog = true;
        this.dialogFieldModel = '';
        this.dialogFieldTip = '';
        this.dialogFieldGodiste = 0;
        this.dialogFieldNosivost = 0;
        this.dialogFieldKm = 0;
        this.dialogFieldSlika = '';
    }

    hideCreate(): void {
        this.displayCreateDialog = false;
    }

    displayEdit(rowIndex: number): void {
        this.selectedRow = rowIndex;
        this.displayEditDialog = true;
        this.dialogFieldModel = this.truckArray[rowIndex].model;
        this.dialogFieldTip = this.truckArray[rowIndex].tip;
        this.dialogFieldGodiste = this.truckArray[rowIndex].godinaProizvodnje;
        this.dialogFieldNosivost = this.truckArray[rowIndex].nosivost;
        this.dialogFieldKm = this.truckArray[rowIndex].km;
        this.dialogFieldSlika = this.truckArray[rowIndex].slika!;
    }

    hideEdit(): void {
        this.displayEditDialog = false;
    }

    displayRemove(rowIndex: number): void {
        this.selectedRow = rowIndex;
        this.displayRemoveDialog = true;
    }

    hideRemove(): void {
        this.displayRemoveDialog = false;
    }

    createTruck(): void {
        let truck: Kamion = {
            idKamion: null,
            model: this.dialogFieldModel,
            tip: this.dialogFieldTip,
            godinaProizvodnje: this.dialogFieldGodiste,
            nosivost: this.dialogFieldNosivost,
            km: this.dialogFieldKm,
            slika: this.dialogFieldSlika != '' ? this.dialogFieldSlika : null,
            prevoznik: null
        };
        this.subscription4 = this.carrService.createTruck(truck).subscribe(
            (res: Kamion) => {
                this.successMessage();
                this.hideCreate();
                this.truckArray.push(res);
                this.totalRecords++;
            },
            (err) => {
                this.warnMessage();
            }
        );
    }

    updateTruck(): void {
        let truck: Kamion = {
            idKamion: this.truckArray[this.selectedRow].idKamion,
            model: this.dialogFieldModel,
            tip: this.dialogFieldTip,
            godinaProizvodnje: this.dialogFieldGodiste,
            nosivost: this.dialogFieldNosivost,
            km: this.dialogFieldKm,
            slika: this.dialogFieldSlika != '' ? this.dialogFieldSlika : null,
            prevoznik: this.truckArray[this.selectedRow].prevoznik
        };
        this.subscription5 = this.carrService.updateTruck(truck).subscribe(
            (res: Kamion) => {
                this.successMessage();
                this.hideEdit();
                this.truckArray[this.selectedRow].model = res.model;
                this.truckArray[this.selectedRow].tip = res.tip;
                this.truckArray[this.selectedRow].km = res.km;
                this.truckArray[this.selectedRow].godinaProizvodnje = res.godinaProizvodnje;
                this.truckArray[this.selectedRow].nosivost = res.nosivost;
                this.truckArray[this.selectedRow].slika = res.slika;
            },
            (err) => {
                this.warnMessage();
            }
        );
    }

    deleteTruck(): void {
        this.subscription6 = this.carrService.deleteTruck(this.truckArray[this.selectedRow].idKamion!).subscribe(
            (res: Boolean) => {
                this.successMessage();
                this.hideRemove();
                this.truckArray.splice(this.selectedRow, 1);
                this.totalRecords--;
            },
            (err) => {
                this.warnMessage();
            }
        );
    }

    successMessage() {
        this.messageService.add({
            severity: 'success',
            summary: 'Uspešno',
            detail: 'Operacija izvršena!'
        });
    }
    warnMessage() {
        this.messageService.add({
            severity: 'warn',
            summary: 'Upozorenje',
            detail: 'Operacija nije uspela!'
        });
    }

    clear() {
        this.messageService.clear();
    }
}
