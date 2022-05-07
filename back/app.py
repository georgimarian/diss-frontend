from flask import Flask, request, jsonify
import json
import os
from config.config import FlaskConfig

from controller.student_controller import StudentController
from controller.teacher_controller import TeacherController

app = Flask(__name__)

student_controller = StudentController()
teacher_controller = TeacherController()


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/add_student', methods=['POST'])
def add_student():
    student = json.loads(request.data)
    student_controller.add_student(student)
    return "Add done"


@app.route('/add_teacher', methods=['POST'])
def add_teacher():
    teacher = json.loads(request.data)
    teacher_controller.add_teacher(teacher)
    return "Add done"


@app.route('/request_thesis', methods=['POST'])
def request_thesis():
    thesis_request = json.loads(request.data)
    student_controller.request_thesis(thesis_request)
    return "Request Done"


@app.route('/login_student', methods=['POST'])
def login_student():
    credentials = json.loads(request.data)
    if student_controller.check_credentials(credentials):
        return "Welcome student"
    return "Invalid student credentials"


@app.route('/login_teacher', methods=['POST'])
def login_teacher():
    credentials = json.loads(request.data)
    if teacher_controller.check_credentials(credentials):
        return "Welcome teacher"
    return "Invalid teacher credentials"


@app.route('/get_students', methods=['GET'])
def get_students():
    return jsonify(student_controller.get_students())


@app.route('/get_teachers', methods=['GET'])
def get_teachers():
    return jsonify(teacher_controller.get_teachers())


if __name__ == '__main__':
    app.run()
