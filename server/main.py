import os
from flask import Flask, request, jsonify
import bcrypt
from flask_pymongo import PyMongo
import stripe
from dotenv import load_dotenv
from bson import ObjectId
load_dotenv()


app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@app.get("/")
def home():
    return "Hello World"


@app.post("/api/signup")
def signup():
    try:
        email: str = request.get_json()["email"]
        phone: str = request.get_json()["phone"]
        password: str = request.get_json()["password"]
        confirmpassword: str = request.get_json()["confirmPassword"]

        if (password != confirmpassword):
            return jsonify({"error": "Passwords do not match"}), 422

        hashedpassword = bcrypt.hashpw(
            password.encode(), os.getenv("SALT").encode())

        mongo.db.users.insert_one(
            {"email": email, "phone": phone, "password": hashedpassword})

        return jsonify({"message": "Account created successfully"}), 201
    except:
        return jsonify({"error": "Some error occurred. Please try again later!"}), 500


@app.post("/api/login")
def login():
    try:
        email: str = request.get_json()["email"]
        password: str = request.get_json()["password"]

        user = mongo.db.users.find_one({"email": email})

        if (not user):
            return jsonify({"error": "User does not exist"}), 403

        doesPasswordMatch = bcrypt.checkpw(password.encode(), user["password"])

        if (not doesPasswordMatch):
            return jsonify({"error": "Incorrect password"}), 403

        user = {"_id": str(user["_id"]),
                "email": user["email"], "phone": user["phone"]}

        return jsonify({"message": "Logged in successfully", "user": user}), 200

    except:
        return jsonify({"error": "Some error occured. Please try again later!"}), 500


@app.post("/api/create-order")
def create_order():
    try:
        name = request.get_json()["name"]
        email = request.get_json()["email"]
        address = request.get_json()["address"]
        pincode = request.get_json()["pincode"]
        city = request.get_json()["city"]
        state = request.get_json()["state"]
        cart = request.get_json()["cart"]
        total_amount = request.get_json()["totalAmount"]

        user = mongo.db.users.find_one({"email": email})

        if (not user):
            return jsonify({"error": "Unauthorized"}), 403

        order = mongo.db.orders.insert_one(
            {"name": name, "email": email, "address": address, "pincode": pincode, "city": city, "state": state, "amount": total_amount, "paymentStatus": "pending", "products": cart})

        return jsonify({"message": "Order created successfully", "orderId": str(order.inserted_id)}), 201
    except:
        return jsonify({"error": "Some error occured. Please try again later!"}), 500


@app.post("/api/update-payment-status")
def update_payment_status():
    try:
        orderid = request.get_json()['orderId']
        mongo.db.orders.update_one(
            {"_id": ObjectId((orderid))}, {"$set": {"paymentStatus": "paid"}})

        return jsonify({"message": "Payment successful"}), 200
    except:
        return jsonify({"error": "Some error occured. Please try again later!"}), 500


@app.post("/api/get-orders")
def get_orders():
    try:
        email = request.get_json()['email']

        orders = mongo.db.orders.find({"email": email})
        listOrders = list(orders)

        for order in listOrders:
            order['_id'] = str(order['_id'])

        return jsonify({"orders": listOrders}), 200
    except:
        return jsonify({"error": "Some error occured. Please try again later"}), 500


@app.post("/api/create-payment-intent")
def create_payment_intent():
    try:
        total_amount = request.get_json()["totalAmount"]
        intent = stripe.PaymentIntent().create(
            amount=total_amount, currency="inr", payment_method_types=["card"])

        return jsonify({"clientSecret": intent.client_secret}), 200
    except:
        return jsonify({"error": "Some error occured. Please try again later!"}), 500


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
