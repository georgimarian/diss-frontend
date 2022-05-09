from flask import Flask, request, jsonify
import json
import os
from config.config import FlaskConfig

from controller.student_controller import StudentController
from controller.teacher_controller import TeacherController
from controller.auth_controller import  AuthController

app = Flask(__name__)

student_controller = StudentController()
teacher_controller = TeacherController()
auth_controller = AuthController()


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/add_student', methods=['POST'])
def add_student():
    """
        {
            first_name: str,
            last_name: str,
            password: str,
            email: str,
            description: str
        }
    """
    student = json.loads(request.data)
    student_controller.add_student(student)
    return "Add done"


@app.route('/add_teacher', methods=['POST'])
def add_teacher():
    """
    request_body:
    {
        first_name: str,
        last_name: str,
        password: str,
        email: str,
        description: str
    }
    """
    teacher = json.loads(request.data)
    teacher_controller.add_teacher(teacher)
    return "Add done"


@app.route('/delete_teacher/<id>', methods=['DELETE'])
def delete_teacher(id):
    teacher_controller.delete_teacher(id)
    return {'id': id}


@app.route('/delete_student/<id>', methods=['DELETE'])
def delete_student(id):
    student_controller.delete_student(id)
    return {'id': id}


@app.route('/request_thesis', methods=['POST'])
def request_thesis():
    """
    request body:
    {
        student_id: int,
        teacher_id: int,
        description: str
    }
    """
    thesis_request = json.loads(request.data)
    if not student_controller.check_if_attempts_left(thesis_request['student_id']):
        return "You have no attempts left"

    student_controller.request_thesis(thesis_request)
    return "Request Done"


@app.route('/login', methods=['POST'])
def login():
    credentials = json.loads(request.data)
    user_type = auth_controller.check_credentials(credentials)
    if user_type != 'Unknown':
        return user_type
    return 'Invalid login credentials'


@app.route('/update_student_request', methods=['POST'])
def update_student_request():
    """
        request body:
        {
            student_id: int,
            teacher_id: int,
            description: str
        }
        """
    body = json.loads(request.data)
    teacher_controller.update_student_request(body)
    return body['status']


@app.route('/get_students', methods=['GET'])
def get_students():
    return jsonify(student_controller.get_students())


@app.route('/get_teachers', methods=['GET'])
def get_teachers():
    return jsonify(teacher_controller.get_teachers())


if __name__ == '__main__':
    app.run()
