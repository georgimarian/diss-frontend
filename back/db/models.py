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


class ThesisRequest(DB.Model):
    __tablename__ = 'thesis_request'

    id = DB.Column(DB.Integer, primary_key=True)
    student_id = DB.Column(DB.Integer, DB.ForeignKey('student.id'))
    teacher_id = DB.Column(DB.Integer, DB.ForeignKey('teacher.id'))
    request_status = DB.Column(DB.Integer, default=RequestStatus.IN_PROGRESS.value)
    description = DB.Column(DB.String(DESCRIPTION_LENGTH))


class Student(DB.Model):
    __tablename__ = 'student'

    id = DB.Column(DB.Integer, primary_key=True)
    first_name = DB.Column(DB.String(NAME_LENGTH))
    last_name = DB.Column(DB.String(NAME_LENGTH))
    password_hash = DB.Column(DB.String(PASS_LENGTH))
    email = DB.Column(DB.String(EMAIL_LENGTH), unique=True)
    description = DB.Column(DB.String(DESCRIPTION_LENGTH))
    requests_left = DB.Column(DB.Integer, default=3)


class Teacher(DB.Model):
    __tablename__ = 'teacher'

    id = DB.Column(DB.Integer, primary_key=True)
    first_name = DB.Column(DB.String(NAME_LENGTH))
    last_name = DB.Column(DB.String(NAME_LENGTH))
    password_hash = DB.Column(DB.String(PASS_LENGTH))
    email = DB.Column(DB.String(EMAIL_LENGTH), unique=True)
    description = DB.Column(DB.String(DESCRIPTION_LENGTH))
    available_places = DB.Column(DB.Integer, default=30)


class Admin(DB.Model):
    __tablename__ = 'admin'

    id = DB.Column(DB.Integer, primary_key=True)
    first_name = DB.Column(DB.String(NAME_LENGTH))
    last_name = DB.Column(DB.String(NAME_LENGTH))
    password_hash = DB.Column(DB.String(PASS_LENGTH))
    email = DB.Column(DB.String(EMAIL_LENGTH))
