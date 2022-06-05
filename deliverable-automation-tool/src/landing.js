import { Div, Row, Col, Text, ThemeProvider, Button } from "atomize";
import React from "react";
import landing_background from "./landing_background.jpg";
import "./landing.css";

const Landing = (props) => {
  const theme = {
    fontFamily: {
      primary: "Poppins",
    },
  };

  return (
    <Div flexDir="row" m="0rem" p="0rem">
      <Row m="0rem" p="0rem">
        <Col size="6" align="center">
          <Row justify="center">
            <ThemeProvider theme={theme}>
              <Text
                tag="h1"
                textSize="display3"
                m={{ b: "5vh", t: "30vh", l: "5rem", r: "5rem" }}
                textColor="#011C40"
                fontFamily="primary"
                textWeight="700"
                textAlign="center"
              >
                Generate your deliverables with us.
              </Text>
            </ThemeProvider>
          </Row>
          <Row justify="center">
            <ThemeProvider theme={theme}>
              <Text
                tag="h1"
                textSize="heading"
                m={{ b: "3vh", t: "0rem", l: "5rem", r: "5rem" }}
                textColor="#011C40"
                fontFamily="primary"
                textWeight="300"
                textAlign="center"
              >
                Access easily to your Excel Files' content, as well as any other
                artifact from your business
              </Text>
            </ThemeProvider>
          </Row>
          <Row justify="center">
            <ThemeProvider theme={theme}>
              <Text
                tag="h1"
                textSize="display1"
                m={{ b: "3vh", t: "0rem", l: "5rem", r: "5rem" }}
                textColor="#0367A6"
                fontFamily="primary"
                textWeight="600"
                textAlign="center"
              >
                Just in five steps!
              </Text>
            </ThemeProvider>
          </Row>
          <Row justify="center">
            <Button
              bg="#2DB6E6"
              textSize="heading"
              hoverBg="#0367A6"
              rounded="circle"
              shadow="2"
              hoverShadow="1"
              w="20vh"
              h="6vh"
              align="center"
              m={{ l: "1rem", r: "1rem", t: "0vh", b: "30vh" }}
              onClick={props.begin}
              style={{ margin: 25 }}
            >
              Let's begin!
            </Button>
          </Row>
        </Col>
        <Col size="6" m="0rem" p="0rem" h="92vh">
          <div className="landingImage">
            <img className="image" alt="" src={landing_background} />
          </div>
        </Col>
      </Row>
    </Div>
  );
};

export default Landing;
