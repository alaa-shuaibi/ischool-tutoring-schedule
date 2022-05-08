from flask import Flask, render_template, jsonify
import json
from threading import Timer
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)

scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('../creds/ischool-tutoring-website-creds.json', scope)
client = gspread.authorize(creds)

# Retrieves data from the Google Sheets file:
def getData():
    schedule_sheet = client.open('iSchool Tutoring Website Data').get_worksheet(0)
    resources_sheet = client.open('iSchool Tutoring Website Data').get_worksheet(1)
    #tutors_sheet = client.open('iSchool Tutoring Website Data').get_worksheet(2)
    
    schedule_data = schedule_sheet.get_all_records()
    resources_data = resources_sheet.get_all_records()
    #tutors_data = tutors_sheet.get_all_records()

    with open('data/schedule.json', 'w') as schedule_file, \
    open('data/resources.json', 'w') as resources_file:
    #open('data/tutors.json', 'w') as tutors_file:
        json.dump(schedule_data, schedule_file)
        json.dump(resources_data, resources_file)
        #json.dump(tutors_data, tutors_file)
    
    timer = Timer(600, getData)
    timer.daemon = True
    timer.start()

try:
    getData()
except:
    print('Could not retrieve initial data upon server start.')

@app.route('/')
def index():
    return render_template('index.html'), 200

@app.route('/getSchedule')
def getSchedule():
    try:
        with open('data/schedule.json', 'r') as f:
            schedule_data = json.load(f)
    except:
        return {'error': 'Schedule data not available.'}, 404
    return jsonify(schedule_data), 200

@app.route('/getResources')
def getResources():
    try:
        with open('data/resources.json', 'r') as f:
            resources_data = json.load(f)
    except:
        return {'error': 'Resources data not available.'}, 404
    
    resources_data_by_topic = {}

    for r in resources_data:
        # Prevent resources that don't have a name or URL from being added:
        if r['name'] == '' and r['url'] == '':
            continue
        
        if r['subjects'] == '' and r['skills'] == '':
            continue
        elif r['subjects'] == '':
            topic_list = r['skills'].replace(' ', '').lower().split(',')
        elif r['skills'] == '':
            topic_list = r['subjects'].replace(' ', '').lower().split(',')
        else:
            topics = r['subjects'] + ',' + r['skills']
            topic_list = topics.replace(' ', "").lower().split(',')
        
        for t in topic_list:
            if t not in resources_data_by_topic:
                resources_data_by_topic[t] = []
            resources_data_by_topic[t].append({
                'name': r['name'],
                'url': r['url']
            })
    
    return jsonify(resources_data_by_topic), 200

#@app.route('/getTutors')
#def getTutors():
    #try:
        #with open('data/tutors.json', 'r') as f:
            #tutors_data = json.load(f)
    #except:
        #return {'error': 'Tutors data not available.'}, 404
    #return jsonify(tutors_data), 200

if __name__ == '__main__':
    app.run()