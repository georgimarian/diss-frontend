from db.models import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib

engine = create_engine('mysql+mysqlconnector://lorena:root@localhost:3306/psiho_db')

db_session = sessionmaker(autocommit=False,
                          autoflush=False,
                          bind=engine)


class AuthController:
    def check_credentials(self, credentials: dict):
        password = hashlib.sha512(credentials['password'].encode('utf-8')).hexdigest()
        email = credentials['email']
        with db_session() as session:
            teacher = session.query(Teacher).filter(Teacher.email == email, Teacher.password_hash == password).first()
            if teacher:
                return "Teacher"
            student = session.query(Student).filter(Student.email == email, Student.password_hash == password).first()
            if student:
                return "Student"
        return "Unknown"