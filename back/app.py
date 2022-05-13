from flask import Flask, request, jsonify
import json
import os
from config.config import FlaskConfig

from controller.controller import UserController

app = Flask(__name__)

controller = UserController()


@app.route('/')
def hello_world():  # put application's code here
    controller.test()
    return 'Hello World!'


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
    return jsonify(controller.add_user(json.loads(request.data)))


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
    return jsonify(controller.update_user(json.loads(request.data)))


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
    return jsonify(controller.register(json.loads(request.data)))


@app.route('/delete/<id>', methods=['DELETE'])
def delete_user(id):
    return jsonify(controller.delete_user(id))


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
    return jsonify(controller.request_thesis(json.loads(request.data)))


@app.route('/login', methods=['POST'])
def login():
    return jsonify(controller.login(json.loads(request.data)))


@app.route('/get_students', methods=['GET'])
def get_students():
    return jsonify(controller.get_students())


@app.route('/get_teachers', methods=['GET'])
def get_teachers():
    return jsonify(controller.get_teachers())


if __name__ == '__main__':
    app.run()
