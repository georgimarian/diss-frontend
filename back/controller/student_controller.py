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

    def request_thesis(self, request_thesis: dict):
        with db_session() as session:
            session.add(ThesisRequest(student_id=request_thesis['student_id'], teacher_id=request_thesis['teacher_id'],
                                      description=request_thesis['description']))
            session.commit()

    def check_credentials(self, credentials: dict):
        password = hashlib.sha512(credentials['password'].encode('utf-8')).hexdigest()
        email = credentials['email']
        with db_session() as session:
            stud = session.query(Student).filter(Student.email == email, Student.password_hash == password).first()
            if stud:
                return True
        return False

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
