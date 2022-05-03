export enum RequestStatus{
    NO_REQUEST="NO REQUEST",
    IN_PROGRESS = "IN PROGRESS",
    DENIED = " DENIED",
    APPROVED = "APPROVED"
}

export class Teacher{
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get interest(): String {
        return this._interest;
    }

    set interest(value: String) {
        this._interest = value;
    }

    get enrolledStudents(): number {
        return this._enrolledStudents;
    }

    set enrolledStudents(value: number) {
        this._enrolledStudents = value;
    }

    get availablePlaces(): number {
        return this._availablePlaces;
    }

    set availablePlaces(value: number) {
        this._availablePlaces = value;
    }
    get name(): String {
        return this._name;
    }

    set name(value: String) {
        this._name = value;
    }
    private _id: number
    private _name: String
    private _interest: String
    private _enrolledStudents: number
    private _availablePlaces: number

    constructor(name: String, interest: String, enrolledStudents: number, availablePlaces: number) {
        this._id = -1;
        this._name = name;
        this._interest = interest;
        this._enrolledStudents = enrolledStudents;
        this._availablePlaces = availablePlaces;
    }
}