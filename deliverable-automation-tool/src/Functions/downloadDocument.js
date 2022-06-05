import { Button } from "atomize";

import { saveAs } from "file-saver";
import { Card } from "react-bootstrap";
import { LabelContext } from "../labelDataContext";

import React, { Component } from "react";

class DownloadDocument extends Component {
  static contextType = LabelContext;
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file upload (click the upload button)
  downloadFile = () => {
    console.log(this.context.labelInfo.documentParameters.documentName);
    saveAs(
      "http://192.168.1.112:5000/download",
      this.context.labelInfo.documentParameters.documentName
    );
  };

  render() {
    return (
      <div>
        <Card className="text-center">
          {/* <Card.Header>Instructions</Card.Header> */}
          <Card.Body>
            <Card.Title>Download File</Card.Title>
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
              m={{ l: "1rem", r: "1rem", y: "3rem" }}
              onClick={this.downloadFile}
              style={{ margin: 25 }}
            >
              Download Document
            </Button>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}

export default DownloadDocument;
