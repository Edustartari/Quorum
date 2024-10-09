from django.shortcuts import render
import pandas as pd
import os

def index(request):

    # Get app main path
    main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Get list of csv files
    csv_folder = main_path + '/frontend/static/csv_files/'
    csv_files = os.listdir(csv_folder)

    # Read csv files, store them in a dictionary and add more default values for legislators and bills
    data = {}
    for e in csv_files:
        df = pd.read_csv(csv_folder + e)
        title = e.split('.')[0].replace('_(2)','')
        data[title] = df.to_dict('records')
        if title == 'legislators':
            for item in data[title]:
                item['supported_bills'] = 0
                item['opposed_bills'] = 0
        if title == 'bills':
            for item in data[title]:
                item['supporters'] = 0
                item['opposers'] = 0

    # Add sponsor and vote results to bills
    for item in data['bills']:
        bill_id = item['id']
        vote_id = 0
        for vote in data['votes']:
            if vote['bill_id'] == bill_id:
                vote_id = vote['id']
                break

        for vote in data['vote_results']:
            if vote['vote_id'] == vote_id:
                if vote['vote_type'] == 1:
                    item['supporters'] += 1
                if vote['vote_type'] == 2:
                    item['opposers'] += 1

        sponsor_id = item['sponsor_id']
        sponsor_name = 'Not Available'
        for legislator in data['legislators']:
            if legislator['id'] == sponsor_id:
                sponsor_name = legislator['name']
                break
        item['sponsor_name'] = sponsor_name

    # Add votes to legislators
    for item in data['legislators']:
        legislator_id = item['id']
        for vote in data['vote_results']:
            if vote['legislator_id'] == legislator_id:
                if vote['vote_type'] == 1:
                    item['supported_bills'] += 1
                if vote['vote_type'] == 2:
                    item['opposed_bills'] += 1

    context = {'content': data}
    return render(request, 'frontend/index.html', context)