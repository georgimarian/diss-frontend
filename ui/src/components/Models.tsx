export enum RequestStatus {
    NO_REQUEST = "FARĂ CERERE",
    IN_PROGRESS = "ÎN AȘTEPTARE",
    DENIED = "RESPINS",
    APPROVED = "ACCEPTAT"
}

export type Teacher =
    User
    & { name: string, interest: string, enrolledStudents: Student[], totalPlaces: number, requests: ThesisRequest[] }

export type Student =
    User
    & { name: string, description: string, requestsLeft: number, requests: ThesisRequest[], thesisDescription: string }

export type Admin = User

export type User = { id: number, email: string, password: string }

export type ThesisRequest = { id: number, status: RequestStatus, description: string, teacherId: number, studentId: number }