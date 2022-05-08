import { Student } from 'models/common';
import { studentList } from 'mock_data/users';
import { Roles } from 'utils/roles';
import { AreaOfInterest } from '../models/common.enums';

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
    type: Roles.Student,
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
