import React, { useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Stepper from "react-stepper-horizontal";
import DocumentParameters from "./Functions/documentParameters";
import UploadFile from "./Functions/uploadFiles";
import SendInstructions from "./Functions/sendInstructions";
import RunScript from "./Functions/runScript";
import DownloadDocument from "./Functions/downloadDocument";
import { LabelContext } from "./labelDataContext";

const Tool = (props) => {
  const value = useContext(LabelContext);
  return (
    <Container
      fluid
      style={{
        fontFamily: "Poppins",
      }}
    >
      <Row className="justify-content-md-center">
        <Col md={8}>
          {value.page !== 5 && (
            <Stepper
              steps={value.steps}
              activeStep={value.page}
              circleFontSize="1"
              activeColor="#2BB9D9"
            />
          )}
          {value.page === 0 && <DocumentParameters />}
          {value.page === 1 && <UploadFile />}
          {value.page === 2 && <SendInstructions />}
          {value.page === 3 && <RunScript />}
          {value.page === 4 && <DownloadDocument />}
        </Col>
      </Row>
    </Container>
  );
};

export default Tool;
