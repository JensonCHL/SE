// di sini buat interface (bisa ga dipake/optional, tapi ini yang jadi poin + dari typescript)
// interface buat ditaro di parameter supaya data yang di-pass sesuai dengan tipenya

export interface IProfile {
    name: string,
    email: string,
    gender: Number
}

const getProfile = (data: IProfile) => {
    const API = fetch("url backend")
}