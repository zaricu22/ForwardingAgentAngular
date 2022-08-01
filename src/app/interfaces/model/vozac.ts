import { Prevoznik } from './prevoznik';
import { Kamion } from './kamion';
import { Prikolica } from './prikolica';

export interface Vozac {
    idVozac: number;
    ime: string;
    prezime: string;
    adresa: string;
    telefon: string;
    godineIskustva: number;
    datumPridruzivanja: Date;
    satiVoznje: number;
    km: number;
    slika: string;
    prevoznik: Prevoznik;
    kamion: Kamion;
    prikolica: Prikolica;
}
