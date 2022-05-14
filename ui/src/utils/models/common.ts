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

// ==== TODO decide on models ====
export interface Student extends User {
    areaOfInterest: AreaOfInterest;
    description: string;
    requestsLeft: number;
    requests: ThesisRequest[];
    thesisDescription: string;
    grades: Grade[];
}

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

export function parseStudents(): Student[] {
    try {
        return JSON.parse(localStorage.getItem('students') || '');
    } catch (err) {
        return studentList;
    }
}

export function storeStudents(students: Student[]) {
    return localStorage.setItem('students', JSON.stringify(students));
}

export interface Admin extends User {
}

export interface Teacher extends User {
    areaOfInterest: AreaOfInterest;
    enrolledStudents: Student[];
    totalPlaces: number;
    requests: ThesisRequest[];
}


export function parseTeachers(): Teacher[] {
    try {
        return JSON.parse(localStorage.getItem('teachers') || '');
    } catch (err) {
        return teacherList;
    }
}

export function storeTeachers(teachers: Teacher[]) {
    return localStorage.setItem('teachers', JSON.stringify(teachers));
}

export interface Credentials {
    email: string,
    password: string
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


export type ThesisRequest = {
    id: number;
    status: RequestStatus;
    description: string;
    teacherId: number;
    studentId: number;
};

export type Grade = { criteria: string; value: number };
