export enum AreaOfInterest {
    PSYCHOLOGY = 0,
    APPLIED_PSYCHOLOGY = 1
}

export enum RequestStatus {
    IN_PROGRESS = 0,
    APPROVED = 1,
    DENIED = 2,
    NO_REQUEST = 3,
}

export enum Roles {
    STUDENT = 0,
    TEACHER = 1,
    ADMIN = 2,
}

export function rolesToString(enumValue: Roles) {
    switch (enumValue) {
        case Roles.ADMIN :
            return "ADMIN"
        case Roles.STUDENT :
            return "STUDENT"
        case Roles.TEACHER :
            return "PROFESOR"
    }
}

export function statusesToString(enumValue: RequestStatus) {
    switch (enumValue) {
        case RequestStatus.IN_PROGRESS :
            return "ÎN AȘTEPTARE"
        case RequestStatus.APPROVED :
            return "ACCEPTAT"
        case RequestStatus.DENIED :
            return "RESPINS"
        case RequestStatus.NO_REQUEST :
            return "FARĂ CERERE"
    }
}

export function areasToString(enumValue: AreaOfInterest) {
    switch (enumValue) {
        case AreaOfInterest.PSYCHOLOGY:
            return "Psihologie"
        case AreaOfInterest.APPLIED_PSYCHOLOGY:
            return "Psihologie Aplicata"
    }
}
