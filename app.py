from flask import Flask, render_template, jsonify
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)

scope = ['https://spreadsheets.google.com/feeds','https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name("creds.json", scope)
client = gspread.authorize(creds)

@app.route('/')
def index():
    return render_template('index.html'), 200

@app.route('/getSchedule')
def getSchedule():
    schedule_sheet = client.open('iSchool Tutoring Schedule').get_worksheet(0)
    schedule_data = schedule_sheet.get_all_records()
    #print(schedule_data)
    return jsonify(schedule_data), 200

@app.route('/getResources')
def getResources():
    resources_sheet = client.open('iSchool Tutoring Schedule').get_worksheet(1)
    resources_data = resources_sheet.get_all_records()
    print(resources_data)
    
    resources_data_by_topic = {}

    for r in resources_data:
        # Prevent resources that don't have a name or URL from being added:
        if r['name'] == '' & r['url'] == '':
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

@app.route('/getTutors')
def getTutors():
    tutors_sheet = client.open('iSchool Tutoring Schedule').get_worksheet(2)
    tutors_data = tutors_sheet.get_all_records()
    #print(tutors_data)
    return jsonify(tutors_data), 200

if __name__ == '__main__':
    app.run()