import React, { useContext } from "react";
import { LabelContext } from "../labelDataContext";
import { Button, Text } from "atomize";
//import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Container, Card, Form } from "react-bootstrap";
import { InputLabel, TextField } from "@mui/material";

const DocumentParameters = (props) => {
  const value = useContext(LabelContext);
  console.log(value);
  const documentParameters = value.labelInfo.documentParameters;
  const labelInfo = value.labelInfo;
  console.log(labelInfo);
  const jsonVar = JSON.stringify(labelInfo);
  console.log(jsonVar);
  const btnDisbaled =
    documentParameters.documentName.length > 0 &&
    documentParameters.author.length > 0;

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("http://192.168.1.112:5000/uploadParameters", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: jsonVar,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <Card className="text-center" style={{ marginTop: "5rem" }}>
        {/* <Card.Header>Instructions</Card.Header> */}
        <Card.Body>
          <Form>
            <Text textSize="heading" m={{ y: "2rem" }}>
              Set Document Parameters
            </Text>
            <TextField
              label="Enter Document Name"
              style={{ margin: 8, width: "45%" }}
              fullWidth
              margin="normal"
              required
              onChange={value.setDocumentParameters("documentName")}
              value={documentParameters.documentName}
            />
            <TextField
              label="Enter Author's Name"
              style={{ margin: 8, width: "45%" }}
              fullWidth
              margin="normal"
              required
              onChange={value.setDocumentParameters("author")}
              value={documentParameters.author}
            />
            <InputLabel>Page number location</InputLabel>
            <ToggleButtonGroup
              label="Page Number Location"
              color="primary"
              style={{ margin: 8, width: "91%" }}
              fullWidth
              margin="normal"
              required
              value={documentParameters.pageNum}
              exclusive
              onChange={value.setDocumentParameters("pageNum")}
            >
              <ToggleButton value="Left">Left</ToggleButton>
              <ToggleButton value="Center">Center</ToggleButton>
              <ToggleButton value="Right">Right</ToggleButton>
              <ToggleButton value="None">None</ToggleButton>
            </ToggleButtonGroup>
            <InputLabel>Document Margins (in cm)</InputLabel>
            <TextField
              label="Top Margin"
              style={{ margin: 8, width: "22%" }}
              fullWidth
              margin="normal"
              required
              onChange={value.setDocumentParameters("marginTop")}
              value={documentParameters.marginTop}
              type="number"
            />
            <TextField
              label="Bottom Margin"
              style={{ margin: 8, width: "22%" }}
              fullWidth
              margin="normal"
              required
              onChange={value.setDocumentParameters("marginBottom")}
              value={documentParameters.marginBottom}
              type="number"
            />
            <TextField
              label="Left Margin"
              style={{ margin: 8, width: "22%" }}
              fullWidth
              margin="normal"
              required
              onChange={value.setDocumentParameters("marginLeft")}
              value={documentParameters.marginLeft}
              type="number"
            />
            <TextField
              label="Right Margin"
              style={{ margin: 8, width: "22%" }}
              fullWidth
              margin="normal"
              required
              onChange={value.setDocumentParameters("marginRight")}
              value={documentParameters.marginRight}
              type="number"
            />
          </Form>
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
            onClick={onSubmit}
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
            disabled={!btnDisbaled}
            onClick={() => value.nextPage()}
            style={{ margin: 25 }}
          >
            Next
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
export default DocumentParameters;
