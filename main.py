from flask import Flask, render_template, jsonify
from flask import request

from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VoiceGrant
from twilio.twiml.voice_response import VoiceResponse, Dial

from dotenv import load_dotenv
import os
import pprint as p

load_dotenv()

app = Flask(__name__)


@app.route('/')
def home():
    return render_template(
        'home.html',
        title="In browser calls",
    )

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
