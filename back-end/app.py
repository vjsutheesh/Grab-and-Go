from flask import Flask, request, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_details = []
feedback_data = []


@app.route('/getdata', methods=["GET", "POST"])
def get_data():
    if request.json:
        data = request.get_json()
        print(data)
        user_details.append(data)
        print(user_details)

        return redirect(url_for("home"))


@app.route('/data', methods=["GET", "POST"])
def home():
    return user_details


@app.route('/getfeedback', methods=["GET", "POST"])
def get_feedback():
    if request.json:
        data = request.get_json()
        print(data)
        feedback_data.append(data)
        print(feedback)

        return redirect(url_for("feedback"))


@app.route('/feedback', methods=["GET", "POST"])
def feedback():
    return feedback_data
