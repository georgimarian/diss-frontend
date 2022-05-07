from models import DB
from flask.app import Flask

APP = Flask(__name__)
APP.config.from_object('config.config.FlaskConfig')
DB.init_app(APP)

with APP.app_context():
    DB.create_all()
