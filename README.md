<h1> Deliverable Automation Tool (DAT) </h1>
<p> DAT is a tool whose intention is to reduce the time it takes to generate deliverables. Bearing this in mind, the architect initially goes through a stage of creating meta-models, which in the case of this project, they will be used to create business models in Microsoft Excel or Google Sheets' files, which are represented in catalogs, matrices, diagrams, text or images. Up to this point, the process continues to be the same as the standard and just at this moment the user uses DAT to generate the deliverable with the aforementioned artifacts as input. </p>
<h2> Instalation and Setup </h2>
<p> In order to function, the tool has 2 main components, the python server and the user interface. First please clone the repository into your device and then install all the libraries needed for the purposes of both components. </p>
<h3> Python Server </h3>
<p> First of all, as the server name mentions, Python is required to be installed in order to work properly. It is recommended to install the latest version available. </p>
<p> Then, having installed python, via pip or yarn commands, it is necessary to install the following libraries. Next to them, the pip command can be copied and then ran it into the console for the installation. </p>
<ul>
 <li> Flask
  <p> pip install Flask </p>
 <li> SqlAlchemy
  <p> pip install SQLAlchemy </p>
 <li> Pandas
  <p> pip install Pandas </p>
 <li> OpenPyxl
  <p> pip install openpyxl </p>
 <li> Matplotlib
  <p> pip install matplotlib </p>
 <li> ReportLab
  <p> pip install reportlab </p>
</ul>
<p> After installing everything, open the flask-backend folder and run the command python app.py in the console.</p>

<h3> User Interface </h3>
<p> As the user insterface has been developed with React, it is necessary to have that framework installed. Then, install the following libraries via NPM: </p>
<ul>
 <li> MUI
  <p> npm install @mui/material @emotion/react @emotion/styled </p>
 <li> Atomize
  <p> npm install atomize react-transition-group </p>
 <li> Axios
  <p> npm install pandas </p>
 <li> Bootstrap
  <p> npm install Bootstrap </p>
 <li> React-Bootstrap
  <p> npm install react-bootstrap </p>
 <li> File Saver
  <p> npm install file-saver --save </p>
 <li> react-stepper-horizontal
  <p> npm install react-stepper-horizontal --save </p>
 <li> Redux
  <p> npm install redux </p>
 <li> Redux-Form
  <p> npm install --save redux-form </p>
 <li> styletron-engine-atomic
  <p> npm install styletron-engine-atomic </p>
 <li> styletron-react
  <p> npm install styletron-react </p>
</ul>

<p> After installing everything, open the deliverable-automation-tool folder and run the command npm start in the console.</p>
<p> Verify in every file in the folder Functions that the URL where the REST petitions are made, is the one in which the Python Server is running. For example, in the case of "downloadDocument.js" in line 20, it is set by default the path "http://192.168.1.112:5000/download". The IP address and the port could change once the Python Server is running locally in your device. </p>

