#!/usr/bin/env python
# encoding: utf-8
import json
import io
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from skpy import Skype

app = Flask(__name__)

CORS(app)

@app.route('/')
def index():
    return jsonify("Hello world!")


@app.route('/api/skype-message', methods=['POST'])
def send_skype_message():
    slogin = Skype("", "")

    # Define the table data
    table_data = [
        {
            "label": "Event Name",
            "value": request.form["event_name"]
        },
        {
            "label": "Description",
            "value": request.form["description"]
        },
        {
            "label": "Date",
            "value": request.form["from_date"] + " ~ " + request.form["to_date"]
        },
        {
            "label": "Time",
            "value": request.form["from_time"] + " ~ " + request.form["to_time"]
        },
        {
            "label": "Address",
            "value": request.form["address"]
        }
    ]

    table_str = ''
    for dic in table_data:
        for key in dic:
            table_str += dic[key] + "\n"
            if key == "value" and table_data[-1][key] != dic[key]:
                table_str += "\n"

    image_content = requests.get(request.form["image"]).content
    image_file = io.BytesIO(image_content)

    channel = slogin.chats["19:a77d5a5724ce461bb9ca0180bdac1dcf@thread.skype"]
    channel.sendFile(image_file, "event.jpg", image=True)
    channel.sendMsg(table_str)

    # to send message to spcific user.
    # contact = slogin.contacts["live:.cid.47b93bdf06673b7b"]
    # contact.chat.sendMsg('Testing')

    return jsonify({'name': 'alice',
                    'email': 'alice@outlook.com'})


app.run(debug=True, port=6034)
