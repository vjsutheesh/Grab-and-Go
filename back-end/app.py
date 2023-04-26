from flask import Flask, request, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_details = []


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
