import { teacherList } from 'mock_data/users';
import { Teacher } from 'models/common';
import { Roles } from 'utils/roles';
import { AreaOfInterest } from '../models/common.enums';

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
    type: Roles.Teacher,
    requests: [],
    enrolledStudents: [],
  };
}
