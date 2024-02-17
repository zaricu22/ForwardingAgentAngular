import { Prevoznik } from './prevoznik';
export interface Prikolica {
    idPrikolica: number | null;
    model: string;
    tip: string;
    godinaProizvodnje: number;
    nosivost: number;
    km: number;
    slika: string | null;
    prevoznik: Prevoznik | null;
}
