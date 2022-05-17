import {AreaOfInterest, RequestStatus, Roles} from './common.enums';

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    type: Roles;
    description: string;
}

export interface Student extends User {
    areaOfInterest: AreaOfInterest;
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
        description: '',
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
        description: '',
    };
}


export function parseUser() {
    const user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user);
    }
    return undefined;
}
export function parseCriterias():Criterion[] | undefined {
    const criterias = localStorage.getItem('criterias')
    if (criterias) {
        return JSON.parse(criterias);
    }
    return undefined;
}
export type Criterion =  {
    name: string;
    value: number;
};
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
export function storeCriterias(criterias: Criterion[]) {
    localStorage.setItem('criterias', JSON.stringify(criterias));
}

export function createThesisRequest(s: Student, t_id: number) {
    return {
        id: 1,
        teacherId: t_id,
        studentId: s.id,
        description: s.thesisDescription,
        status: RequestStatus.IN_PROGRESS,
    }
}

export function castTeacher(user : User): Teacher {
    return user as Teacher;
}

export function castStudent(user : User): Student | undefined{
    return user as Student;
}

export function findStudent(studs: Student[] | undefined, id_: number){
    return studs?.find(student => student.id === id_)
}
export function findTeacher(techs: Teacher[] | undefined, id_: number){
    return techs?.find(tech => tech.id === id_)
}

// thesis description --done
// ia profesorul pt student si afiseaza-l --done
// grading + criteria -- denis
// published papers
// profile completion -> description + thesisDescription
// testing overall
// description la save sa nu se faca request numai daca nu ii empty si daca nu ii same as before
// verificat si request-urile + add && save student