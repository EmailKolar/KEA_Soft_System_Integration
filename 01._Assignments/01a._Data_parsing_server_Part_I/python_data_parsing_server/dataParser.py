import os
import json
import yaml
import csv
import xml.etree.ElementTree as ET

def parse_data_file(path):
    _, file_extension = os.path.splitext(path)
    file_extension = file_extension.lower()[1:]  # Remove the leading dot

    try:
        with open(path, 'r', encoding='utf-8') as file:
            data = file.read()
        
        if file_extension == 'txt':
            print(data)

        elif file_extension == 'xml':
            root = ET.fromstring(data)
            print(ET.tostring(root, encoding='utf-8').decode())

        elif file_extension == 'json':
            json_data = json.loads(data)
            print(json_data)
            print(json_data.get('people', [{}])[0].get('name', 'No name found'))

        elif file_extension in ['yaml', 'yml']:
            yaml_data = yaml.safe_load(data)
            print(yaml_data)

        elif file_extension == 'csv':
            reader = csv.DictReader(data.splitlines())
            for row in reader:
                print("CSV row:", row)

        else:
            print("File type not supported ;-)")

    except Exception as e:
        print(f"Error reading file: {e}")

parse_data_file('./data/data.yaml')
