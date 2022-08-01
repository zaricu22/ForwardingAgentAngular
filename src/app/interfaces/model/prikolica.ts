import { Prevoznik } from './prevoznik';
export interface Prikolica {
    idPrikolica: number;
    model: string;
    tip: string;
    godinaProizvodnje: number;
    nosivost: number;
    km: number;
    slika: string;
    prevoznik: Prevoznik;
}
