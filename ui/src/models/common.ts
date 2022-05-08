import { AreaOfInterest, RequestStatus } from './common.enums';
import { Roles } from '../utils/roles';

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

export interface Admin extends User {}

export interface Teacher extends User {
  areaOfInterest: AreaOfInterest;
  enrolledStudents: Student[];
  totalPlaces: number;
  requests: ThesisRequest[];
}

export type ThesisRequest = {
  id: number;
  status: RequestStatus;
  description: string;
  teacherId: number;
  studentId: number;
};

export type Grade = { criteria: string; value: number };
