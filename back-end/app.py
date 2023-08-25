import ast
import datetime
from flask import Flask, request, redirect, url_for, Response, jsonify
import json, os

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_cors import CORS

from dotenv import load_dotenv 
from pymongo import MongoClient

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

select_item = []
selected_Item = []
details = []
delivery = []
delivery_item = []


current_user = ''
hotel_name = ''

############## database connection ##########################

mongo = MongoClient(os.getenv("MONGODB_URI"))
db = mongo["Main_Database"]

############# Store user details #############################

@app.route('/postdata', methods=["POST"])
def get_data():
    users = db["users"]
    if request.json:
        data = request.get_json()
        users.insert_one(data)
        return redirect(url_for("home"))

################## Retrive user details ########################

@app.route('/getdata', methods=["GET"])
def home():
    user_details = list(db.users.find({}))
    for user in user_details:
        user["_id"] = str(user["_id"])
    return Response(
        response=json.dumps(user_details, default=str),
        status=200,
        mimetype="application/json"
    )


################# Store feedback ans send email ###################

@app.route('/getfeedback', methods=["POST"])
def get_feedback():
    feedbacks = db["feedback"]
    if request.json:
        data = request.get_json()
        feedbacks.insert_one(data)

        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        sender_email = 'kanishsk43@gmail.com'
        sender_password = 'xnamtykabriusfkw'
        recipient_email = 'kanishsk43@gmail.com'
        subject = f'Feedback from {data["name"]}'
        message = f'Emial : {data["email"]} \n Address : {data["address"]} \n Message : {data["message"]}'

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Enable TLS
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, recipient_email, msg.as_string())
        server.quit()

        return Response(
            response=True,
            status=200,
            mimetype="application/json"
        )
    

##################### Get current user #########################


@app.route('/currentuser', methods=["POST"])
def current():
    global current_user
    if request.json and 'user' in request.json:
        current_user = request.json['user']

    return jsonify({"response": True})

############## hotel details in home(card) page ###############

@app.route('/hotel_data', methods=["GET"])
def hotels():
    hotel_details = list(db.hotels.find({}))
    for hotel in hotel_details:
        hotel['_id'] = str(hotel['_id'])

    return Response(
        response=json.dumps(hotel_details),
        status=200,
        mimetype="application/json"
    )

##################### Menu list for product page ######################

@app.route('/MenuList/<string:hotelName>', methods=["GET", "POST"])
def hotel_menu(hotelName: str):
    Menu_List = []

    global hotel_name
    hotel_name = hotelName

    hotel_details = list(db.hotels.find({}))
    for hotel in hotel_details:
        hotel['_id'] = str(hotel['_id'])
        if (hotelName == hotel["hotelName"]):
            Menu_List.append(hotel['menu'])
        elif (hotelName == hotel["hotelName"]):
            Menu_List.append(hotel['menu'])
        elif (hotelName == hotel["hotelName"]):
            Menu_List.append(hotel['menu'])
        elif (hotelName == hotel["hotelName"]):
            Menu_List.append(hotel['menu'])

    data_string = Menu_List[0]
    data_string = data_string[1:-1]
    data_string = data_string.replace("'", '"')
    parsed_data = ast.literal_eval(data_string)
    
    return Response(
        response=json.dumps(parsed_data),
        status=200,
        mimetype="application/json"
    )


##################### hotel details in product page ################################

@app.route('/HotelDesc/<string:hotelName>', methods=['GET'])
def hotel_desc(hotelName: str):
    hotel_desc = []
    hotel_details = list(db.hotels.find({}))
    for hotel in hotel_details:
        hotel['_id'] = str(hotel['_id'])
        if (hotelName == hotel["hotelName"]):
            hotel_desc.append(hotel)
        elif (hotelName == hotel["hotelName"]):
            hotel_desc.append(hotel)
        elif (hotelName == hotel["hotelName"]):
            hotel_desc.append(hotel)
        elif (hotelName == hotel["hotelName"]):
            hotel_desc.append(hotel)
        
    return Response(
        response=json.dumps(hotel_desc),
        status=200,
        mimetype="application/json"
    )

############## selected item #########################

@app.route('/selectedItem', methods=['POST', 'GET'])
def get_Items():
    get_item = request.get_json()
    select_item.clear()
    select_item.append(get_item)
    return select_item

######################## cart item ############################

@app.route('/cartItems', methods=['GET', 'POST'])
def get_Cart():
    cart_item = []
    cart_item.clear()
    for data in select_item:
        for i in data:
            if i['quantity'] > 0:
                cart_item.append(i)
                selected_Item.append(cart_item)

    print(current_user, cart_item)

    if cart_item:
        user_details = list(db.users.find({}))
        for user in user_details:
            user["_id"] = str(user["_id"])
            if(user["email"] == current_user):
                order_entry = {
                        "hotel": hotel_name,
                        "date": datetime.datetime.now().isoformat(),
                        "items": cart_item
                    }
                db.users.update_one({"email": current_user},  {"$push": {"order_history": order_entry}})
        
    
    return cart_item
    
#################### admin pages #################################

@app.route('/postadmin', methods=['POST'])
def post_Admin():
    get_item = request.get_json()
    details.clear()
    details.append(get_item)
    return details


@app.route('/getadmin', methods=['GET'])
def get_Admin():
    return details


@app.route('/inadmin', methods=['POST'])
def in_delivery():
    get_item = request.get_json()
    delivery.clear()
    delivery_item.clear()
    delivery.append(get_item)
    return delivery


@app.route('/outadmin', methods=['GET'])
def out_delivery():
    delivery_item.clear()
    for i in delivery:
        delivery_item.append(i)
    print(delivery_item)
    return delivery_item

################### history item ###################

@app.route('/history', methods=["GET"])
def history():
    user_details = list(db.users.find({}))

    for user in user_details:
        user["_id"] = str(user["_id"])
        if(user['email'] == current_user):
            return Response(
                response=json.dumps(user),
                status=200,
                mimetype="appliaction/json"
            )
        
    return Response(
        response=None,
        status=200,
        mimetype="application.json"
    )
