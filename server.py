import win32com.client
import pythoncom
from flask_cors import CORS

from datetime import datetime, timedelta
from flask import Flask

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes


def get_events():

    # Connect to Outlook
    outlook = win32com.client.Dispatch('Outlook.Application')
    namespace = outlook.GetNamespace('MAPI')

    # Access the calendar
    calendar = namespace.GetDefaultFolder(9).Items
    calendar.IncludeRecurrences = True
    calendar.Sort('[Start]')

    # Define the date range you're interested in
    begin = datetime.now()
    end = begin + timedelta(days=1)
    restriction = "[Start] >= '" + begin.strftime(
        "%Y-%d-%m") + "' AND [End] <= '" + end.strftime("%Y-%d-%m") + "'"
    calendar = calendar.Restrict(restriction)

    # Loop through the calendar events
    json_data_list = []
    for appointment in calendar:
        # Extract information from the appointment
        subject = appointment.Subject
        start = appointment.Start.Format('%Y-%m-%d %H:%M')
        end = appointment.End.Format('%Y-%m-%d %H:%M')
        duration = appointment.Duration

        json_data = {
            "subject": subject,
            "start": start,
            "end": end,
            "duration": duration
        }

        json_data_list.append(json_data)

    return json_data_list

@app.route("/")
def hello_world():
    print("========START========")
    pythoncom.CoInitialize()
    events = get_events()
    print(events)
    pythoncom.CoUninitialize()
    print("========END========")
    return events

# resp = get_events()
# print(resp)