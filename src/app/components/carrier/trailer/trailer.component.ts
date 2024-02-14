import { CarrService } from './../../../services/carr/carr.service';
import { SelectItem, MessageService } from 'primeng/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Prikolica } from './../../../interfaces/model/prikolica';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-trailer',
    templateUrl: './trailer.component.html',
    styleUrls: ['./trailer.component.css'],
    providers: [MessageService]
})
export class TrailerComponent implements OnInit, OnDestroy {
    trailerArray: Array<Prikolica> = [];
    idCarrier: number;

    trailerCategories: SelectItem[];

    totalRecords: number;
    sortOptions: SelectItem[];
    selectedSort: string;

    page: number;
    rowsPerPage: number;
    sortBy: string;

    selectedRow: number = 0;
    dialogFieldModel: string;
    dialogFieldTip: string;
    dialogFieldGodiste: number;
    dialogFieldNosivost: number;
    dialogFieldKm: number;
    dialogFieldSlika: string;
    displayCreateDialog: boolean;
    displayEditDialog: boolean;
    displayRemoveDialog: boolean;

    subscription1: Subscription;
    subscription2: Subscription;
    subscription3: Subscription;
    subscription4: Subscription;
    subscription5: Subscription;
    subscription6: Subscription;

    constructor(private carrService: CarrService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.page = 0;
        this.rowsPerPage = 5;
        this.sortBy = 'tip';

        this.trailerCategories = [
            { label: 'Zatvorena Suva', value: 'Zatvorena Suva' },
            { label: 'Hladnjaca', value: 'Hladnjaca' },
            { label: 'Cisterna', value: 'Cisterna' },
            { label: 'Automobili', value: 'Automobili' },
            { label: 'Masine', value: 'Masine' },
            { label: 'Drva', value: 'Drva' },
            { label: 'Otvorena Ravna', value: 'Otvorena Ravna' }
        ];

        this.sortOptions = [
            { label: 'Tip', value: 'tip' },
            { label: 'Nosivost', value: 'nosivost' },
            { label: 'KM', value: 'km' }
        ];

        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN')).idPreduzeca;

        this.subscription1 = this.carrService.trailerNum(this.idCarrier).subscribe((res) => {
            this.totalRecords = res;
        });
    }

    ngOnDestroy(): void {
      if(this.subscription1 != null) this.subscription1.unsubscribe();
      if(this.subscription2 != null) this.subscription2.unsubscribe();
      if(this.subscription3 != null) this.subscription3.unsubscribe();
      if(this.subscription4 != null) this.subscription4.unsubscribe();
      if(this.subscription5 != null) this.subscription5.unsubscribe();
      if(this.subscription6 != null) this.subscription6.unsubscribe();
    }

    onSortChange(event): void {
        this.sortBy = event.value;
        this.subscription2 = this.carrService.trailerPage(this.page, this.rowsPerPage, this.sortBy, this.idCarrier).subscribe((res) => {
            this.trailerArray = res;
        });
    }

    lazyData(event): void {
        this.page = event.first / this.rowsPerPage;

        this.subscription3 = this.carrService.trailerPage(this.page, this.rowsPerPage, this.sortBy, this.idCarrier).subscribe((res) => {
            this.trailerArray = res;
        });
    }

    displayCreate(): void {
        this.displayCreateDialog = true;
        this.dialogFieldModel = null;
        this.dialogFieldTip = null;
        this.dialogFieldGodiste = null;
        this.dialogFieldNosivost = null;
        this.dialogFieldKm = null;
        this.dialogFieldSlika = null;
    }

    hideCreate(): void {
        this.displayCreateDialog = false;
    }

    displayEdit(rowIndex: number): void {
        this.selectedRow = rowIndex;
        this.displayEditDialog = true;
        this.dialogFieldModel = this.trailerArray[rowIndex].model;
        this.dialogFieldTip = this.trailerArray[rowIndex].tip;
        this.dialogFieldGodiste = this.trailerArray[rowIndex].godinaProizvodnje;
        this.dialogFieldNosivost = this.trailerArray[rowIndex].nosivost;
        this.dialogFieldKm = this.trailerArray[rowIndex].km;
        this.dialogFieldSlika = this.trailerArray[rowIndex].slika;
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

    createTrailer(): void {
        let trailer: Prikolica = {
            idPrikolica: null,
            model: this.dialogFieldModel,
            tip: this.dialogFieldTip,
            godinaProizvodnje: this.dialogFieldGodiste,
            nosivost: this.dialogFieldNosivost,
            km: this.dialogFieldKm,
            slika: this.dialogFieldSlika != '' ? this.dialogFieldSlika : null,
            prevoznik: null
        };
        this.subscription4 = this.carrService.createTrailer(trailer).subscribe(
            (res: Prikolica) => {
                this.successMessage();
                this.hideCreate();
                this.trailerArray.push(res);
                this.totalRecords++;
            },
            (err) => {
                this.warnMessage();
            }
        );
    }

    updateTrailer(): void {
        let trailer: Prikolica = {
            idPrikolica: this.trailerArray[this.selectedRow].idPrikolica,
            model: this.dialogFieldModel,
            tip: this.dialogFieldTip,
            godinaProizvodnje: this.dialogFieldGodiste,
            nosivost: this.dialogFieldNosivost,
            km: this.dialogFieldKm,
            slika: this.dialogFieldSlika != '' ? this.dialogFieldSlika : null,
            prevoznik: this.trailerArray[this.selectedRow].prevoznik
        };
        this.subscription5 = this.carrService.updateTrailer(trailer).subscribe(
            (res: Prikolica) => {
                this.successMessage();
                this.hideEdit();
                this.trailerArray[this.selectedRow].model = res.model;
                this.trailerArray[this.selectedRow].tip = res.tip;
                this.trailerArray[this.selectedRow].km = res.km;
                this.trailerArray[this.selectedRow].godinaProizvodnje = res.godinaProizvodnje;
                this.trailerArray[this.selectedRow].nosivost = res.nosivost;
                this.trailerArray[this.selectedRow].slika = res.slika;
            },
            (err) => {
                this.warnMessage();
            }
        );
    }

    deleteTrailer(): void {
        this.subscription6 = this.carrService.deleteTrailer(this.trailerArray[this.selectedRow].idPrikolica).subscribe(
            (res: Boolean) => {
                this.successMessage();
                this.hideRemove();
                this.trailerArray.splice(this.selectedRow, 1);
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
