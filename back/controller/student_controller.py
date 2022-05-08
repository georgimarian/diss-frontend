from db.models import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib

engine = create_engine('mysql+mysqlconnector://lorena:root@localhost:3306/psiho_db')

db_session = sessionmaker(autocommit=False,
                          autoflush=False,
                          bind=engine)


class StudentController:
    def add_student(self, student: dict):
        with db_session() as session:
            password_hash = hashlib.sha512(student['password'].encode('utf-8')).hexdigest()
            session.add(Student(first_name=student['first_name'], last_name=student['last_name'],
                                password_hash=password_hash, email=student['email'], description=student['description']))
            session.commit()

    def check_if_attempts_left(self, student_id):
        with db_session() as session:
            if session.query(Student).get(student_id).requests_left > 0:
                return True
        return False

    def request_thesis(self, request_thesis: dict):
        with db_session() as session:
            session.add(ThesisRequest(student_id=request_thesis['student_id'], teacher_id=request_thesis['teacher_id'],
                                      description=request_thesis['description']))
            student = session.query(Student).get(request_thesis['student_id'])
            student.requests_left -= 1
            session.commit()

    def get_students(self):
        with db_session() as session:
            res = [
                {
                    'Id': s.id,
                    'FirstName': s.first_name,
                    'LastName': s.last_name,
                    'Email': s.email,
                    'Description': s.description
                }
                for s in session.query(Student).all()
            ]
            return res
