from flask_cors import CORS
from flask import Flask, request, jsonify
import json
import os
from config.config import FlaskConfig

from controller.controller import UserController

app = Flask(__name__)
CORS(app)
controller = UserController()


@app.route('/')
def hello_world():  # put application's code here
    controller.test()
    return with_headers("helloWorld")


@app.route('/add', methods=['POST'])
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
    return with_headers(controller.add_user(json.loads(request.data)))


@app.route('/update', methods=['POST'])
def update():
    """
        {
            first_name: str,
            last_name: str,
            password: str,
            email: str,
            description: str
        }
    """
    return with_headers(controller.update_user(json.loads(request.data)))


@app.route('/register', methods=['POST'])
def register():
    """
        {
            first_name: str,
            last_name: str,
            password: str,
            email: str,
            description: str
        }
    """
    return with_headers(controller.register(json.loads(request.data)))


@app.route('/delete/<id>', methods=['DELETE'])
def delete_user(id):
    return with_headers(controller.delete_user(id))


@app.route('/request_thesis', methods=['POST'])
def request_thesis():
    """
    request body:
    {
        id: int,
        id: int,
        description: str
    }
    """
    return with_headers(controller.request_thesis(json.loads(request.data)))


@app.route('/login', methods=['POST'])
def login():
    return with_headers(controller.login(json.loads(request.data)))


@app.route('/get_students', methods=['GET'])
def get_students():
    return with_headers(controller.get_students())


@app.route('/get_teachers', methods=['GET'])
def get_teachers():
    return with_headers(controller.get_teachers())


def with_headers(response):
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run()
