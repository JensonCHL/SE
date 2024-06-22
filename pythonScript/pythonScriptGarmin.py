import os
from datetime import date, timedelta
from pymongo import MongoClient
from flask import Flask, request, jsonify
import requests
import garminconnect
import time
import threading
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId

app = Flask(__name__)
mongo_uri = 'mongodb+srv://kenzieharsanto:tv5TQh4f9xLjH2PV@cluster0.ptdxnpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(mongo_uri)
db = client['test']
healthCollection = db['healths']
userCollection = db['registers']


cors = CORS(app, resources={
    r"/*":{
        "origins":"*"
    }
})

app.config['CORS_HEADERS'] = 'Content-Type'

def check(user_id):
    object_id = ObjectId(user_id)
    document = healthCollection.find_one({'user_id': user_id})
    document2 = userCollection.find_one({'_id': object_id})
    print(document2)
    if document:
        print(user_id)
        print(document['_id'])
        return True
    else:
        return False
    
def getEmail(user_id):
    object_id = ObjectId(user_id)
    document2 = userCollection.find_one({'_id': object_id})
    # print(document2)
    return (document2.get('garmin', None))

def getPassword(user_id):
    object_id = ObjectId(user_id)
    document2 = userCollection.find_one({'_id': object_id})
    # print(document2)
    return (document2.get('passwordGarmin', None))

def job1(user_id):
    try:
        
        email2 = getEmail(user_id)
        print("test11111: ", email2)
        password2 = getPassword(user_id)
        print("test 2222: ", password2)
        
        garmin = garminconnect.Garmin(email2, password2)
        garmin.login()

        GARTH_HOME = os.getenv("GARTH_HOME", "~/.garth")
        garmin.garth.dump(GARTH_HOME)

        today = date.today().isoformat()
        yesterday = date.today() - timedelta(days=1)

        activities = garmin.get_stats(today)

        heartRate = activities['restingHeartRate']
        stepsTaken = garmin.get_daily_steps(yesterday, today)[0]['totalSteps']
        sleepDuration = activities['measurableAsleepDuration'] / 60
        sleepDurationHour = round(sleepDuration // 60)
        sleepDurationMinutes = round(sleepDuration % 60)
        sleep_duration_str = f"{sleepDurationHour}:{sleepDurationMinutes:02d}"
        distance = activities['totalDistanceMeters'] / 1000
        calories = activities['activeKilocalories']
        stressLevel = activities['averageStressLevel']

        print('steps taken: ', stepsTaken)
        print('distance traveled: ', distance)
        print('heart rate: ', heartRate)
        print('calories burned: ', calories)
        print('sleep patterns: ', sleep_duration_str)
        print('stress level: ', stressLevel)
        
        print(check(user_id))

        document = {
            'user_id': user_id,
            'date': date.today().isoformat(),
            'steps_taken': stepsTaken,
            'distance_traveled_km': distance,
            'heart_rate': heartRate,
            'calories_burned': calories,
            'sleep_duration': sleep_duration_str,
            'stress_level': stressLevel
        }
        
        if(check(user_id)):
            healthCollection.update_one({'user_id': user_id}, {"$set": document})
            print("data updated into mongoDB")
        else:
            healthCollection.insert_one(document)
            print("Data inserted into MongoDB successfully.")
        
    except Exception as e:
        print(f"Error in job1: {str(e)}")

@app.route('/process_garmin_data/', methods=['POST', 'OPTIONS'])
@cross_origin()
def process_garmin_data():
    try:
        data = request.json
        user_id = data.get('user_id')
        
        if user_id:
            threading.Thread(target=job1, args=(user_id,), daemon=True).start()
            return jsonify({'message': 'Data processing started.', 'user_id': user_id}), 200
        else:
            return jsonify({'error': 'User ID not provided.'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def periodic_job(interval_seconds):
    print("Periodic job started.")
    while True:
        try:
            data = request.json
            user_id = data.get('user_id')
            response = requests.post('http://127.0.0.1:5000/process_garmin_data', json={'user_id': user_id})
            print(response.json())

            if response.status_code == 200:
                user_id = response.json().get('user_id')
                print(f"Received user_id from server: {user_id}")
            else:
                print(f"Error fetching user_id: {response.status_code}")

        except Exception as e:
            print(f"Error in periodic_job: {str(e)}")
        time.sleep(interval_seconds)

if __name__ == '__main__':
    interval_seconds = 900
    threading.Thread(target=periodic_job, args=(interval_seconds,), daemon=True).start()
    app.run(debug=True, use_reloader=False)