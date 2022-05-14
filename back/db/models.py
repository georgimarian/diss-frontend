from db import DB
from enum import Enum

NAME_LENGTH = 100
PASS_LENGTH = 500
EMAIL_LENGTH = 500
DESCRIPTION_LENGTH = 500
PATH_LENGTH = 256


class RequestStatus(Enum):
    IN_PROGRESS = 0
    APPROVED = 1
    DENIED = 2


class UserType(Enum):
    STUDENT = 0
    TEACHER = 1
    ADMIN = 2


class ThesisRequest(DB.Model):
    __tablename__ = 'thesis_request'

    id = DB.Column(DB.Integer, primary_key=True)
    student_id = DB.Column(DB.Integer, DB.ForeignKey('student.id'))
    teacher_id = DB.Column(DB.Integer, DB.ForeignKey('teacher.id'))
    request_status = DB.Column(DB.Integer, default=RequestStatus.IN_PROGRESS.value)
    description = DB.Column(DB.String(DESCRIPTION_LENGTH))
    student = DB.relationship('Student', back_populates='thesis_requests', uselist=False, lazy='joined')
    teacher = DB.relationship('Teacher', back_populates='thesis_requests', uselist=False, lazy='joined')


class User(DB.Model):
    __tablename__ = 'user'
    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)
    first_name = DB.Column(DB.String(NAME_LENGTH))
    last_name = DB.Column(DB.String(NAME_LENGTH))
    password_hash = DB.Column(DB.String(PASS_LENGTH))
    username = DB.Column(DB.String(PASS_LENGTH), unique=True)
    email = DB.Column(DB.String(EMAIL_LENGTH), unique=True)
    type = DB.Column(DB.Integer)
    _student_id = DB.Column(DB.Integer, DB.ForeignKey('student.id'))
    _teacher_id = DB.Column(DB.Integer, DB.ForeignKey('teacher.id'))

    _student = DB.relationship('Student', back_populates='user', uselist=False)
    _teacher = DB.relationship('Teacher', back_populates='user', uselist=False)


class Student(DB.Model):
    __tablename__ = 'student'
    id = DB.Column(DB.Integer, primary_key=True, autoincrement=False)
    teacher_id = DB.Column(DB.Integer, DB.ForeignKey('teacher.id'))
    requests_left = DB.Column(DB.Integer, default=3)
    description = DB.Column(DB.String(DESCRIPTION_LENGTH))
    thesis_requests = DB.relationship('ThesisRequest', back_populates='student')
    profile_thesis_description = DB.Column(DB.String(DESCRIPTION_LENGTH))
    grades = DB.Column(DB.JSON())
    area_of_interest = DB.Column(DB.Integer)
    teacher = DB.relationship('Teacher', back_populates='enrolled_students', uselist=False, lazy='joined')

    user = DB.relationship('User', back_populates='_student')


class Teacher(DB.Model):
    __tablename__ = 'teacher'
    id = DB.Column(DB.Integer, primary_key=True, autoincrement=False)
    description = DB.Column(DB.String(DESCRIPTION_LENGTH))
    available_places = DB.Column(DB.Integer, default=30)
    area_of_interest = DB.Column(DB.Integer)
    enrolled_students = DB.relationship('Student', back_populates='teacher')
    thesis_requests = DB.relationship('ThesisRequest', back_populates='teacher')

    user = DB.relationship('User', back_populates='_teacher')
