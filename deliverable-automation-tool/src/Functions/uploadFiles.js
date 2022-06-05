import React, { Component } from "react";
import { Button, Text } from "atomize";
import { Card, Form } from "react-bootstrap";
import { LabelContext } from "../labelDataContext";

const FormData = require("form-data");

class UploadFile extends Component {
  static contextType = LabelContext;

  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
    //console.log(event.target.files[0]);
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("file", this.state.selectedFile);

    // Details of the uploaded file
    console.log(this.state.selectedFile);
    console.log(formData.read);

    fetch("http://192.168.1.112:5000/uploadArtifact", {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    /* APIService.uploadArtifacts({ formData })
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error)); */
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <Text tag="h1" textSize="paragraph">
            File selected:
          </Text>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <Text tag="h1" textSize="paragraph">
            Choose before pressing the upload button
          </Text>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Card className="text-center">
          {/* <Card.Header>Instructions</Card.Header> */}
          <Card.Body>
            <Card.Title>Upload your Artifacts</Card.Title>
            <Form.Control
              type="file"
              onChange={this.onFileChange}
              name="file"
            />
            {this.fileData()}
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Button
              bg="black600"
              hoverBg="black700"
              rounded="circle"
              shadow="2"
              hoverShadow="1"
              w="auto"
              align="center"
              m={{ l: "1rem", r: "1rem", y: "0rem" }}
              onClick={() => this.context.prevPage()}
              style={{ margin: 25 }}
            >
              Previous
            </Button>
            <Button
              bg="black600"
              hoverBg="black700"
              rounded="circle"
              shadow="2"
              hoverShadow="1"
              w="auto"
              align="center"
              m={{ l: "1rem", r: "1rem", y: "0rem" }}
              onClick={this.onFileUpload}
              style={{ margin: 25 }}
            >
              Upload
            </Button>
            <Button
              bg="black600"
              hoverBg="black700"
              rounded="circle"
              shadow="2"
              hoverShadow="1"
              w="auto"
              align="center"
              m={{ l: "1rem", r: "1rem", y: "0rem" }}
              onClick={() => this.context.nextPage()}
              style={{ margin: 25 }}
            >
              Next
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default UploadFile;
