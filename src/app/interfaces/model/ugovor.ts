import { Vozac } from './vozac';
import { Isporuka } from './isporuka';
import { Kamion } from './kamion';
import { Prevoznik } from './prevoznik';
import { Prikolica } from './prikolica';
import { Proizvodjac } from './proizvodjac';

export interface Ugovor {
    idUgovor: number;
    prevoznik: Prevoznik;
    proizvodjac: Proizvodjac;
    isporuka: Isporuka;
    vozac: Vozac;
    kamion: Kamion;
    prikolica: Prikolica;
}
