from db.models import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import hashlib

engine = create_engine('mysql+mysqlconnector://lorena:root@localhost:3306/psiho_db')

db_session = sessionmaker(autocommit=False,
                          autoflush=False,
                          bind=engine)


class TeacherController:
    def add_teacher(self, teacher: dict):
        with db_session() as session:
            password_hash = hashlib.sha512(teacher['password'].encode('utf-8')).hexdigest()
            session.add(Teacher(first_name=teacher['first_name'], last_name=teacher['last_name'],
                                password_hash=password_hash, email=teacher['email'], description=teacher['description']))
            session.commit()

    def check_credentials(self, credentials: dict):
        password = hashlib.sha512(credentials['password'].encode('utf-8')).hexdigest()
        email = credentials['email']
        with db_session() as session:
            stud = session.query(Teacher).filter(Teacher.email == email, Teacher.password_hash == password).first()
            if stud:
                return True
        return False

    def get_teachers(self):
        with db_session() as session:
            res = [
                {
                    'Id': t.id,
                    'FirstName': t.first_name,
                    'LastName': t.last_name,
                    'Email': t.email,
                    'Description': t.description
                }
                for t in session.query(Teacher).all()
            ]
            return res
