import os
from pydoc import importfile
import sys
from flask import Flask, flash, request, redirect, send_file
from sqlalchemy import true
from werkzeug.utils import secure_filename
from flask_cors import CORS
import json

file_dir = os.path.dirname(__file__)
sys.path.append(file_dir)

importfile('generate_doc.py') 

UPLOAD_FOLDER = '/Artifacts'
DOWNLOAD_FOLDER = '/'
ALLOWED_EXTENSIONS = {'txt', 'json', 'png', 'jpg', 'jpeg', 'xlsx'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy dog'
# app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={"*": {"origins": "*"}})

doc_name = ""

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return 'Hello world'

@app.route('/uploadArtifact', methods = ['GET', 'POST'])
def add_artifact():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        print(request.files)
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
                        
            folder = app.root_path + '/Artifacts'
            
            print(folder)
            os.makedirs(folder, exist_ok=true)
            
            file.save(os.path.join(folder, filename))
            return "The file has been uploaded succesfully"
        
    print(request.files)
    return "request"

@app.route('/uploadInstructions', methods = ['GET', 'POST'])
def add_instructions():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        print(request.files)
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
                        
            folder = app.root_path
            
            print(folder)
            os.makedirs(folder, exist_ok=true)
            
            file.save(os.path.join(folder, filename))
            return "The instructions have been uploaded succesfully"
        
    print(request.files)
    return "request"

@app.route('/uploadParameters', methods = ['GET', 'POST'])
def add_parameters():
    print(vars(request))
    global doc_name
    
    if request.method == 'POST':
        content = request.json
        
        with open('.\Parameters\doc_params.json', 'w') as outfile:
            json.dump(content, outfile)

        doc_name = content["documentParameters"]["documentName"]
        print(doc_name)
        
        return "The parameters have been uploaded succesfully"
        
    return "request"

@app.route('/runScript', methods = ['GET'])
def dynamic_page():
    #file = open(app.root_path + "/generate-doc.py", 'r').read()
    os.system("generate_doc.py")
    return 'The file has been generated in the server' #exec(file)

@app.route('/download',methods = ['GET'])
def downloadFile ():
    print(doc_name)
    #For windows you need to use drive name [ex: F:/Example.pdf]
    path = app.root_path + "/" + doc_name
    return send_file(path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')