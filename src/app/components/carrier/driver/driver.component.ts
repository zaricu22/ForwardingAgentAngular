import { Component, OnInit, OnDestroy } from '@angular/core';
import { Vozac } from 'src/app/interfaces/model/vozac';
import { SelectItem, MessageService } from 'primeng/api';
import { CarrService } from 'src/app/services/carr/carr.service';
import { Kamion } from 'src/app/interfaces/model/kamion';
import { Prikolica } from 'src/app/interfaces/model/prikolica';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css'],
    providers: [MessageService]
})
export class DriverComponent implements OnInit, OnDestroy {
    driverArray: Array<Vozac> = [];
    idCarrier: number;

    truckArray: Array<Kamion> = [];
    trailerArray: Array<Prikolica> = [];
    displayTrailerList: boolean;
    displayTruckList: boolean;
    selectedTrucks: Array<Kamion> = [];
    selectedTrailers: Array<Prikolica> = [];

    totalRecords: number;
    sortOptions: SelectItem[];
    selectedSort: string;

    page: number;
    rowsPerPage: number;
    sortBy: string;

    selectedRow: number = 0;
    dialogFieldIme: string;
    dialogFieldPrezime: string;
    dialogFieldAdresa: string;
    dialogFieldTelefon: string;
    dialogFieldGodineIskustva: number;
    dialogFieldDatumPridruzivanja: Date;
    dialogFieldSatiVoznje: number;
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
    subscription7: Subscription;
    subscription8: Subscription;

    constructor(private carrService: CarrService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.page = 0;
        this.rowsPerPage = 5;
        this.sortBy = 'ime';

        this.sortOptions = [
            { label: 'Ime', value: 'ime' },
            { label: 'Prezime', value: 'prezime' },
            { label: 'Sati Voznje', value: 'satiVoznje' },
            { label: 'KM', value: 'km' }
        ];

        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN')).idPreduzeca;

        this.subscription1 = this.carrService.driverNum(this.idCarrier).subscribe((res) => {
            this.totalRecords = res;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription1 != null) this.subscription1.unsubscribe();
        if (this.subscription2 != null) this.subscription2.unsubscribe();
        if (this.subscription3 != null) this.subscription3.unsubscribe();
        if (this.subscription4 != null) this.subscription4.unsubscribe();
        if (this.subscription5 != null) this.subscription5.unsubscribe();
        if (this.subscription6 != null) this.subscription6.unsubscribe();
        if (this.subscription7 != null) this.subscription7.unsubscribe();
        if (this.subscription8 != null) this.subscription8.unsubscribe();
    }

    onSortChange(event): void {
        this.sortBy = event.value;

        this.subscription2 = this.carrService.driverPage(this.page, this.rowsPerPage, this.sortBy, this.idCarrier).subscribe((res) => {
            this.driverArray = res;
        });
    }

    lazyData(event): void {
        this.page = event.first / this.rowsPerPage;

        this.subscription3 = this.carrService.driverPage(this.page, this.rowsPerPage, this.sortBy, this.idCarrier).subscribe((res) => {
            this.driverArray = res;
        });
    }

    changeSelected(rowIndex: number): void {
        this.selectedRow = rowIndex;
    }

    truckList(): void {
        if (this.truckArray.length == 0) {
            this.subscription4 = this.carrService.truckAll(this.idCarrier).subscribe((res) => {
                this.truckArray = res;
                this.displayTruckList = true;
            });
        } else {
            this.displayTruckList = true;
        }
    }

    hideTruckList(): void {
        this.displayTruckList = false;
    }

    trailerList(): void {
        if (this.trailerArray.length == 0) {
            this.subscription5 = this.carrService.trailerAll(this.idCarrier).subscribe((res) => {
                this.trailerArray = res;
                this.displayTrailerList = true;
            });
        } else {
            this.displayTrailerList = true;
        }
    }

    hideTrailerList(): void {
        this.displayTrailerList = false;
    }

    displayCreate(): void {
        this.displayCreateDialog = true;
        this.dialogFieldIme = null;
        this.dialogFieldPrezime = null;
        this.dialogFieldAdresa = null;
        this.dialogFieldTelefon = null;
        this.dialogFieldDatumPridruzivanja = null;
        this.dialogFieldGodineIskustva = null;
        this.dialogFieldSatiVoznje = null;
        this.dialogFieldKm = null;
        this.dialogFieldSlika = null;
        this.selectedTrucks = null;
        this.selectedTrailers = null;
    }

    hideCreate(): void {
        this.displayCreateDialog = false;
    }

    displayEdit(rowIndex: number): void {
        this.selectedRow = rowIndex;
        this.displayEditDialog = true;
        this.dialogFieldIme = this.driverArray[rowIndex].ime;
        this.dialogFieldPrezime = this.driverArray[rowIndex].prezime;
        this.dialogFieldAdresa = this.driverArray[rowIndex].adresa;
        this.dialogFieldTelefon = this.driverArray[rowIndex].telefon;
        this.dialogFieldDatumPridruzivanja = this.driverArray[rowIndex].datumPridruzivanja;
        this.dialogFieldGodineIskustva = this.driverArray[rowIndex].godineIskustva;
        this.dialogFieldSatiVoznje = this.driverArray[rowIndex].satiVoznje;
        this.dialogFieldKm = this.driverArray[rowIndex].km;
        this.dialogFieldSlika = this.driverArray[rowIndex].slika;
        let karray: Array<Kamion> = [];
        karray[0] = this.driverArray[rowIndex].kamion;
        let parray: Array<Prikolica> = [];
        parray[0] = this.driverArray[rowIndex].prikolica;
        this.selectedTrucks = karray;
        this.selectedTrailers = parray;
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

    createDriver(): void {
        let kamion: Kamion;
        let prikolica: Prikolica;
        if (this.selectedTrucks != null) kamion = this.selectedTrucks[0];
        else kamion = null;
        if (this.selectedTrailers != null) prikolica = this.selectedTrailers[0];
        else prikolica = null;
        let driver: Vozac = {
            idVozac: null,
            ime: this.dialogFieldIme,
            prezime: this.dialogFieldPrezime,
            adresa: this.dialogFieldAdresa,
            telefon: this.dialogFieldTelefon,
            godineIskustva: this.dialogFieldGodineIskustva,
            datumPridruzivanja: this.dialogFieldDatumPridruzivanja,
            satiVoznje: this.dialogFieldSatiVoznje,
            km: this.dialogFieldKm,
            slika: this.dialogFieldSlika,
            kamion: kamion,
            prikolica: prikolica,
            prevoznik: null
        };
        this.subscription6 = this.carrService.createDriver(driver).subscribe(
            (res: Vozac) => {
                this.successMessage();
                this.hideCreate();
                this.driverArray.push(res);
                this.totalRecords++;
            },
            (err) => {
                this.warnMessage();
            }
        );
    }

    updateDriver(): void {
        let kamion: Kamion;
        let prikolica: Prikolica;
        if (this.selectedTrucks != null) kamion = this.selectedTrucks[0];
        else kamion = null;
        if (this.selectedTrailers != null) prikolica = this.selectedTrailers[0];
        else prikolica = null;
        let driver: Vozac = {
            idVozac: this.driverArray[this.selectedRow].idVozac,
            ime: this.dialogFieldIme,
            prezime: this.dialogFieldPrezime,
            adresa: this.dialogFieldAdresa,
            telefon: this.dialogFieldTelefon,
            godineIskustva: this.dialogFieldGodineIskustva,
            datumPridruzivanja: this.dialogFieldDatumPridruzivanja,
            satiVoznje: this.dialogFieldSatiVoznje,
            km: this.dialogFieldKm,
            slika: this.dialogFieldSlika,
            kamion: kamion,
            prikolica: prikolica,
            prevoznik: this.driverArray[this.selectedRow].prevoznik
        };
        this.subscription7 = this.carrService.updateDriver(driver).subscribe(
            (res: Vozac) => {
                this.successMessage();
                this.hideEdit();
                this.driverArray[this.selectedRow].ime = res.ime;
                this.driverArray[this.selectedRow].prezime = res.prezime;
                this.driverArray[this.selectedRow].adresa = res.adresa;
                this.driverArray[this.selectedRow].telefon = res.telefon;
                this.driverArray[this.selectedRow].godineIskustva = res.godineIskustva;
                this.driverArray[this.selectedRow].datumPridruzivanja = res.datumPridruzivanja;
                this.driverArray[this.selectedRow].satiVoznje = res.satiVoznje;
                this.driverArray[this.selectedRow].km = res.km;
                this.driverArray[this.selectedRow].slika = res.slika;
                this.driverArray[this.selectedRow].kamion = res.kamion;
                this.driverArray[this.selectedRow].prikolica = res.prikolica;
            },
            (err) => {
                this.warnMessage();
            }
        );
    }

    deleteDriver(): void {
        this.subscription8 = this.carrService.deleteDriver(this.driverArray[this.selectedRow].idVozac).subscribe(
            (res: Boolean) => {
                this.successMessage();
                this.hideRemove();
                this.driverArray.splice(this.selectedRow, 1);
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
