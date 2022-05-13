from db.models import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import or_
import hashlib

engine = create_engine('mysql+mysqlconnector://lorena:root@localhost:3306/psiho_db')

db_session = sessionmaker(autocommit=False,
                          autoflush=False,
                          bind=engine)


class UserController:
    def add_user(self, user: dict):
        with db_session() as session:
            requests = []
            password_hash = hashlib.sha512(user['password'].encode('utf-8')).hexdigest()

            user_obj = User(first_name=user['firstName'], last_name=user['lastName'],
                            password_hash=password_hash, username=user['username'], email=user['email'],
                            type=UserType.TEACHER.value if user['type'] == 'TEACHER' else UserType.STUDENT.value if user['type'] == 'STUDENT' else UserType.ADMIN.value)
            session.add(user_obj)
            session.commit()

            if user_obj.type == UserType.STUDENT.value:
                stud_obj = Student(id=user_obj.id, description=user['description'],
                                   profile_thesis_description=user['thesisDescription'],
                                   grades=user['grades'],
                                   area_of_interest=user['areaOfInterest'])
                session.add(stud_obj)
                session.commit()
                user_obj._student_id = stud_obj.id
                session.commit()

            elif user_obj.type == UserType.TEACHER.value:
                teacher_obj = Teacher(id=user_obj.id, description=user['description'],
                                      available_places=user['totalPlaces'],
                                      area_of_interest=user['areaOfInterest'])
                session.add(teacher_obj)
                session.commit()
                user_obj._teacher_id = teacher_obj.id
                session.commit()

            if len(user['thesisRequests']) > 0:
                for req in user['thesisRequests']:
                    requests.append(session.add(
                        ThesisRequest(student_id=req['studentId'], teacher_id=req['teacherId'],
                                      description=req['description'], request_status=req['requestStatus'])))
                session.commit()

            if user_obj.type == UserType.STUDENT.value:
                return UserController.Student2JSON(user_obj)
            elif user_obj.type == UserType.TEACHER.value:
                return UserController.Teacher2JSON(user_obj)
            return UserController.User2JSON(user_obj)

    def update_user(self, user: dict):
        with db_session() as session:
            user_obj: User = session.query(User).get(user['id'])
            user_obj.last_name = user['lastName']
            user_obj.first_name = user['firstName']
            if user_obj.type == UserType.STUDENT.value:
                user_obj._student.requests_left = user['requestsLeft']
                user_obj._student.description = user['description']
                user_obj._student.area_of_interest = user['areaOfInterest']
                user_obj._student.profile_thesis_description = user['thesisDescription']
                user_obj._student.grades = user['grades']
            elif user_obj.type == UserType.TEACHER.value:
                user_obj._teacher.available_places = user['totalPlaces']
                user_obj._teacher.description = user['description']
                user_obj._teacher.area_of_interest = user['areaOfInterest']
                for stud in user['enrolledStudents']:
                    s: Student = session.query(Student).get(stud['id'])
                    s.teacher = user_obj._teacher
                session.commit()
            for tr in user['thesisRequests']:
                tr_obj = ThesisRequest.query.get(tr['id'])
                tr_obj.status = tr['request_status']
            session.commit()

            return UserController.stringifyUser(user_obj)

    def delete_user(self, student_id):
        with db_session() as session:
            u: User = session.query(User).get(student_id)
            thesis = session.query(ThesisRequest).filter_by(student_id=student_id).all()
            for th in thesis:
                session.delete(th)
            session.commit()
            if u.type == UserType.STUDENT.value:
                session.delete(u._student)
                session.commit()
            elif u.type == UserType.TEACHER.value:
                session.delete(u._teacher)
                session.commit()
            session.delete(u)
            session.commit()

            return u.id

    def request_thesis(self, request_thesis: dict):
        with db_session() as session:
            th = ThesisRequest(student_id=request_thesis['student_id'], teacher_id=request_thesis['teacher_id'],
                              description=request_thesis['description'])
            session.add(th)
            session.commit()
            student = session.query(Student).get(request_thesis['student_id'])
            student.requests_left -= 1
            session.commit()

            return th.id

    def get_students(self):
        with db_session() as session:
            return [self.Student2JSON(s) for s in session.query(User).filter_by(type=UserType.STUDENT.value).all()]

    def get_teachers(self):
        with db_session() as session:
            return [self.Teacher2JSON(s) for s in session.query(User).filter_by(type=UserType.TEACHER.value).all()]

    def login(self, credentials: dict):
        password = hashlib.sha512(credentials['password'].encode('utf-8')).hexdigest()
        email = credentials['email']
        with db_session() as session:
            return UserController.stringifyUser(
                session.query(User).filter(or_(User.email == email, User.username == email),
                                           User.password_hash == password).first())

    def test(self):
        with db_session() as session:
            for es in session.query(Teacher).get(1).enrolled_students:
                print(es.id)
                print(es)

        return "abc"

    def register(self, user: dict):
        password = hashlib.sha512(user['password'].encode('utf-8')).hexdigest()
        with db_session() as session:
            user_obj = User(email=user["email"], password_hash=password, last_name=user["lastName"],
                            first_name=user["firstName"], username=user["username"], type=UserType.TEACHER.value if user['type'] == 'TEACHER' else UserType.STUDENT.value if user['type'] == 'STUDENT' else UserType.ADMIN.value)
            session.add(user_obj)
            session.commit()
            if user_obj.type == UserType.STUDENT.value:
                session.add(Student(id=user_obj.id, description="", profile_thesis_description="", area_of_interest=""))
                session.commit()
                user_obj._student_id = user_obj.id
                session.commit()
            elif user_obj.type == UserType.TEACHER.value:
                session.add(Teacher(id=user_obj.id, description="", area_of_interest=""))
                session.commit()
                user_obj._teacher_id = user_obj.id
                session.commit()

            return UserController.stringifyUser(user_obj)

    @staticmethod
    def Teacher2JSON(user: User):

        with db_session() as session:
            return {
                'id': user.id,
                'firstName': user.first_name,
                'lastName': user.last_name,
                'username': user.username,
                'password': '',
                'email': user.email,
                'type': UserType(user.type).name,
                'description': user._teacher.description,
                'totalPlaces': user._teacher.available_places,
                'areaOfInterest': user._teacher.area_of_interest,
                'enrolledStudents': [UserController.Student2JSON(session.query(User).get(student.id)) for student in
                                     user._teacher.enrolled_students],
                'requests': [
                    {
                        'id': r.id,
                        'studentId': r.student_id,
                        'teacherId': r.teacher_id,
                        'description': r.description,
                        'status': RequestStatus(r.request_status).name
                    } for r in user._teacher.thesis_requests
                ]
            }

    @staticmethod
    def Student2JSON(user: User):
        return {
            'id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'username': user.username,
            'password': '',
            'email': user.email,
            'type': UserType(user.type).name,
            'description': user._student.description,
            'thesisDescription': user._student.profile_thesis_description,
            'requestsLeft': user._student.requests_left,
            'areaOfInterest': user._student.area_of_interest,
            'grades': user._student.grades,
            'requests': [
                {
                    'id': r.id,
                    'studentId': r.student_id,
                    'teacherId': r.teacher_id,
                    'description': r.description,
                    'status': RequestStatus(r.request_status).name
                } for r in user._student.thesis_requests
            ]
        }

    @staticmethod
    def User2JSON(user: User):
        return {
            'id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'username': user.username,
            'password': '',
            'email': user.email,
            'type': UserType(user.type).name
        }

    @staticmethod
    def stringifyUser(user_obj: User):
        if not user_obj:
            return None

        if user_obj.type == UserType.STUDENT.value:
            return UserController.Student2JSON(user_obj)
        elif user_obj.type == UserType.TEACHER.value:
            return UserController.Teacher2JSON(user_obj)
        return UserController.User2JSON(user_obj)
