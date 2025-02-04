from flask import Flask
from flask_session import Session
from config.config import config
from routes.auth_routes import auth_bp

app = Flask(__name__)
app.config.from_object(config["developement"])
Session(app)

app.register_blueprint(auth_bp, url_prefix="/auth")


if __name__ == "__main__":
    app.run(debug=True)
