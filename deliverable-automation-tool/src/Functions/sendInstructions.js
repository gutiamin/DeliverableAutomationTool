import { Button, Textarea } from "atomize";
import { Card } from "react-bootstrap";
import { LabelContext } from "../labelDataContext";

import React, { Component } from "react";

class SendInstructions extends Component {
  static contextType = LabelContext;

  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  saveFileAs() {
    /* const blob = new Blob([document.getElementById("instructions").value], {
      type: "text/plain",
    }); */

    const file = new File(
      [document.getElementById("instructions").value],
      "instructions.txt",
      { type: "text/plain", lastModified: new Date().getTime() }
    );

    //this.setState({ selectedFile: file });

    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);

    fetch("http://192.168.1.112:5000/uploadInstructions", {
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
  }

  render() {
    return (
      <div>
        <Card className="text-center">
          {/* <Card.Header>Instructions</Card.Header> */}
          <Card.Body>
            <Card.Title>Instructions</Card.Title>
            <Textarea placeholder="Write down your code..." id="instructions" />
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
              onClick={this.saveFileAs}
              style={{ margin: 25 }}
            >
              Send Instructions
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

export default SendInstructions;
