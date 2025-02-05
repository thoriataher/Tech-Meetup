from flask import Flask
from flask_session import Session
from config.config import config
from routes.auth_routes import auth_bp
from routes.company_routes import company_bp
from routes.event_routes import event_bp

app = Flask(__name__)
app.config.from_object(config["developement"])
Session(app)

app.register_blueprint(auth_bp, url_prefix="/api/v1/companies")
app.register_blueprint(company_bp, url_prefix="/api/v1/company")
app.register_blueprint(event_bp, url_prefix="/api/v1/events")



if __name__ == "__main__":
    app.run(debug=True)
