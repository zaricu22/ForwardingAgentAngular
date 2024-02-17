import { Prevoznik } from './prevoznik';
export interface Kamion {
    idKamion: number | null;
    model: string;
    tip: string;
    godinaProizvodnje: number;
    nosivost: number;
    km: number;
    slika: string | null;
    prevoznik: Prevoznik | null;
}
