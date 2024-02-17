import {Component, OnInit, OnDestroy, AfterViewChecked, AfterContentChecked} from '@angular/core';
import { Vozac } from './../../../interfaces/model/vozac';
import { SelectItem, MessageService } from 'primeng/api';
import { CarrService } from './../../../services/carr/carr.service';
import { Kamion } from './../../../interfaces/model/kamion';
import { Prikolica } from './../../../interfaces/model/prikolica';
import { Subscription } from 'rxjs';
import {DataViewLazyLoadEvent} from "primeng/dataview/dataview.interface";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
    selector: 'app-driver',
    templateUrl: './driver.component.html',
    styleUrls: ['./driver.component.css'],
    providers: [MessageService]
})
export class DriverComponent implements OnInit, OnDestroy {
    driverArray: Array<Vozac> = [];
    idCarrier: number = 0;

    truckArray: Array<Kamion> = [];
    trailerArray: Array<Prikolica> = [];
    displayTrailerList: boolean = false;
    displayTruckList: boolean = false;
    selectedTrucks: Array<Kamion> = [];
    selectedTrailers: Array<Prikolica> = [];

    totalRecords: number = 0;
    sortOptions: SelectItem[] = [];
    selectedSort: string = '';

    page: number = 0;
    rowsPerPage: number = 0;
    sortBy: string = '';

    selectedRow: number = 0;
    dialogFieldIme: string = '';
    dialogFieldPrezime: string = '';
    dialogFieldAdresa: string = '';
    dialogFieldTelefon: string = '';
    dialogFieldGodineIskustva: number = 0;
    dialogFieldDatumPridruzivanja: Date = new Date();
    dialogFieldSatiVoznje: number = 0;
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
    subscription7: Subscription = new Subscription;
    subscription8: Subscription = new Subscription;

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

        this.idCarrier = JSON.parse(localStorage.getItem('TOKEN') as string).idPreduzeca;

        this.subscription1 = this.carrService.driverNum(this.idCarrier).subscribe((res) => {
            this.totalRecords = res;
        });

      if (this.truckArray.length == 0) {
        this.subscription4 = this.carrService.truckAll(this.idCarrier).subscribe((res) => {
          this.truckArray = res;
        });
      }
      if (this.trailerArray.length == 0) {
        this.subscription5 = this.carrService.trailerAll(this.idCarrier).subscribe((res) => {
          this.trailerArray = res;
        });
      }
    }

    ngOnDestroy(): void {
      this.subscription1!.unsubscribe();
      this.subscription2!.unsubscribe();
      this.subscription3!.unsubscribe();
      this.subscription4!.unsubscribe();
      this.subscription5!.unsubscribe();
      this.subscription6!.unsubscribe();
      this.subscription7!.unsubscribe();
      this.subscription8!.unsubscribe();
    }

    onSortChange(event: DropdownChangeEvent): void {
        this.sortBy = event.value;
        this.subscription2 = this.carrService.driverPage(this.page, this.rowsPerPage, this.sortBy, this.idCarrier).subscribe((res) => {
            this.driverArray = res;
        });
    }

    lazyData(event: DataViewLazyLoadEvent): void {
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
            this.displayTruckList = true;
        } else {
            this.displayTruckList = true;
        }
    }

    hideTruckList(): void {
        this.displayTruckList = false;
    }

    trailerList(): void {
        if (this.trailerArray.length == 0) {
                this.displayTrailerList = true;
        } else {
            this.displayTrailerList = true;
        }
    }

    hideTrailerList(): void {
        this.displayTrailerList = false;
    }

    displayCreate(): void {
        this.displayCreateDialog = true;
        this.dialogFieldIme = '';
        this.dialogFieldPrezime = '';
        this.dialogFieldAdresa = '';
        this.dialogFieldTelefon = '';
        this.dialogFieldDatumPridruzivanja = new Date();
        this.dialogFieldGodineIskustva = 0;
        this.dialogFieldSatiVoznje = 0;
        this.dialogFieldKm = 0;
        this.dialogFieldSlika = '';
        this.selectedTrucks = [];
        this.selectedTrailers = [];
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
        karray[0] = this.driverArray[rowIndex].kamion!;
        let parray: Array<Prikolica> = [];
        parray[0] = this.driverArray[rowIndex].prikolica!;
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
        let kamion: Kamion | null;
        let prikolica: Prikolica | null;
        if (this.selectedTrucks.length > 0) kamion = this.selectedTrucks[0];
        else kamion = null!;
        if (this.selectedTrailers.length > 0) prikolica = this.selectedTrailers[0];
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
        let kamion: Kamion | null;
        let prikolica: Prikolica | null;
        if (this.selectedTrucks.length > 0) kamion = this.selectedTrucks[0];
        else kamion = null;
        if (this.selectedTrailers.length > 0) prikolica = this.selectedTrailers[0];
        else prikolica = null;
        let driver: Vozac = {
            idVozac: this.driverArray[this.selectedRow].idVozac!,
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
        this.subscription8 = this.carrService.deleteDriver(this.driverArray[this.selectedRow].idVozac!).subscribe(
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
