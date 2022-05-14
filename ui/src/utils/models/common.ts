import {AreaOfInterest, RequestStatus, Roles} from './common.enums';
import {studentList, teacherList} from "../../mock_data/users";

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    type: Roles;
}

export interface Student extends User {
    areaOfInterest: AreaOfInterest;
    description: string;
    requestsLeft: number;
    requests: ThesisRequest[];
    thesisDescription: string;
    grades: Grade[];
}

export interface Admin extends User {
}

export interface Teacher extends User {
    areaOfInterest: AreaOfInterest;
    enrolledStudents: Student[];
    totalPlaces: number;
    requests: ThesisRequest[];
}

export interface Credentials {
    email: string,
    password: string
}

export type ThesisRequest = {
    id: number;
    status: RequestStatus;
    description: string;
    teacherId: number;
    studentId: number;
};

export type Grade = { criteria: string; value: number };



export function getEmptyStudent(): Student {
    return {
        username: '',
        firstName: '',
        lastName: '',
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        id: -1,
        description: '',
        thesisDescription: '',
        email: '',
        password: '',
        requestsLeft: 0,
        type: Roles.STUDENT,
        requests: [],
        grades: [],
    };
}


export function getEmptyTeacher(): Teacher {
    return {
        username: '',
        firstName: '',
        lastName: '',
        areaOfInterest: AreaOfInterest.PSYCHOLOGY,
        id: -1,
        email: '',
        password: '',
        totalPlaces: 0,
        type: Roles.TEACHER,
        requests: [],
        enrolledStudents: [],
    };
}

export function getEmptyUser(): User {
    return {
        username: '',
        firstName: '',
        lastName: '',
        id: -1,
        email: '',
        password: '',
        type: Roles.ADMIN,
    };
}


export function parseUser() {
    try {
        let user = localStorage.getItem('user')
        if (user) {
            return JSON.parse(user);
        }
        return undefined;
    } catch (err) {
        return undefined;
    }
}

export function storeUser(user: User | Student | Teacher) {
    let userVar: Admin | Teacher | Student;
    if (user.type === Roles.STUDENT) {
        userVar = user as Student;
    } else if (user.type === Roles.TEACHER) {
        userVar = user as Teacher;
    } else {
        userVar = user as Admin;
    }
    console.log(userVar)
    localStorage.setItem('user', JSON.stringify(userVar));
}

export function createThesisRequest(s: Student, t: Teacher) {
    return {
        id: 1,
        teacherId: t.id,
        studentId: s.id,
        description: s.thesisDescription,
        status: RequestStatus.IN_PROGRESS,
    }
}