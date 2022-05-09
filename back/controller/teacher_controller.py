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

    def delete_teacher(self, teacher_id):
        with db_session() as session:
            t = session.query(Teacher).get(teacher_id)
            thesis = session.query(ThesisRequest).filter_by(teacher_id=teacher_id).first()
            if thesis:
                session.delete(thesis)
                session.commit()
            session.delete(t)
            session.commit()

    def update_student_request(self, body: dict):
        with db_session() as session:
            request_thesis = session.query(ThesisRequest).filter(ThesisRequest.student_id == body['student_id'],
                    ThesisRequest.teacher_id == body['teacher_id']).first()
            if body['status'] == 'ACCEPTED':
                request_thesis.request_status = RequestStatus.APPROVED.value
                teacher = session.query(Teacher).get(body['teacher_id'])
                teacher.available_places -= 1
            else:
                request_thesis.request_status = RequestStatus.DENIED.value
            session.commit()

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
