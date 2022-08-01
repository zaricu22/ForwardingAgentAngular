import { Prevoznik } from './prevoznik';
export interface Kamion {
    idKamion: number;
    model: string;
    tip: string;
    godinaProizvodnje: number;
    nosivost: number;
    km: number;
    slika: string;
    prevoznik: Prevoznik;
}
