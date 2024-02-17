import { Prevoznik } from './prevoznik';
import { Kamion } from './kamion';
import { Prikolica } from './prikolica';

export interface Vozac {
    idVozac: number | null;
    ime: string;
    prezime: string;
    adresa: string;
    telefon: string;
    godineIskustva: number;
    datumPridruzivanja: Date;
    satiVoznje: number;
    km: number;
    slika: string;
    prevoznik: Prevoznik | null;
    kamion: Kamion | null;
    prikolica: Prikolica | null;
}
