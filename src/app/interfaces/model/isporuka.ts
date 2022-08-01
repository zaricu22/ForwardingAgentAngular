import { Teret } from './teret';
export interface Isporuka {
    idIsporuka: number;
    statusDostave: string;
    statusPlacanja: string;
    tip: string;
    cena: number;
    vremeDolaska: Date;
    vremePolaska: Date;
    mestoDolaska: string;
    mestoPolaska: string;
    km: number;
    predjeno: number;
    teret: Teret;
}
