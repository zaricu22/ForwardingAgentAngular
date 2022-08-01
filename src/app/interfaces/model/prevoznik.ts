export interface Prevoznik {
    idPrevoznik: number;
    naziv: string;
    sediste: string;
    datumOsnivanja: Date;
    prihod: number;
    uspesneIsporuke: number;
    neuspesneIsporuke: number;
    slika: string;
    email: string;
    telefon: string;
}
