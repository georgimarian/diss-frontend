import {AreaOfInterest} from "./common.enums";

export interface User {
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string
}

// ==== TODO decide on models ====
export interface Student extends User {
    areaOfInterest: AreaOfInterest
}

export interface Admin extends User {
}

export interface Teacher extends User {
}
