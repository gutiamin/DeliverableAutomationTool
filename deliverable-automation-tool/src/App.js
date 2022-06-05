import "./App.css";
import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
/* import UploadFile from "./Functions/uploadFiles";
import SendInstructions from "./Functions/sendInstructions";
import RunScript from "./Functions/runScript";
import DownloadDocument from "./Functions/downloadDocument";
import Stepper from "react-stepper-horizontal";
import DocumentParameters from "./Functions/documentParameters"; */
import { LabelContext } from "./labelDataContext";
import logo from "./logo.png";
import Tool from "./tool";
import Landing from "./landing";

const App = (props) => {
  const value = useContext(LabelContext);
  const [state, setState] = useState("start");
  console.log(value.steps);
  return (
    <Container
      fluid
      style={{
        fontFamily: "Poppins",
      }}
    >
      <Row>
        <Col md={12}>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
              <Navbar.Brand href="#home">
                <img alt="" src={logo} height="30" />{" "}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Nav.Link
                    href="#documentation"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      fontSize: "1.2rem",
                      textDecorationColor: "#011C40",
                    }}
                  >
                    Documentation
                  </Nav.Link>
                  <hr></hr>
                  <Nav.Link
                    style={{
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      fontSize: "1.2rem",
                      fontColor: "#011C40",
                    }}
                    href="#aboutUs"
                  >
                    About Us
                  </Nav.Link>
                  <Nav.Link
                    href="#help"
                    style={{
                      paddingLeft: "30px",
                      paddingRight: "30px",
                      fontSize: "1.2rem",
                      fontColor: "#011C40",
                    }}
                  >
                    Help
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <br />
        </Col>
      </Row>
      <div>
        {state === "start" && <Landing begin={() => setState("begin")} />}

        {state === "begin" && <Tool />}
      </div>
      {/* <Landing />
      <Tool /> */}
    </Container>
  );
};
export default App;
