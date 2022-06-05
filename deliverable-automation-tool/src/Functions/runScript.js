import { Button } from "atomize";

import { Card } from "react-bootstrap";
import React, { Component } from "react";
import { LabelContext } from "../labelDataContext";

class RunScript extends Component {
  static contextType = LabelContext;
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file upload (click the upload button)
  runScript = () => {
    fetch("http://192.168.1.112:5000/runScript", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Card className="text-center">
          {/* <Card.Header>Instructions</Card.Header> */}
          <Card.Body>
            <Card.Title>Run Script</Card.Title>
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
              onClick={this.runScript}
              style={{ margin: 25 }}
            >
              Generate Document
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

export default RunScript;
