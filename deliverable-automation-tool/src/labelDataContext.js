import React, { useState, createContext } from "react";

export const LabelContext = createContext();

export const LabelProvider = (props) => {
  const [page, setPage] = useState(0);
  const [labelInfo, setlabelInfo] = useState({
    documentParameters: {
      documentName: "",
      author: "",
      pageNum: "",
      marginTop: "",
      marginBottom: "",
      marginLeft: "",
      marginRight: "",
    },
  });

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };
  console.log(page, "page");
  const handleChange = (prop) => (event) => {
    setlabelInfo({ ...labelInfo, [prop]: event.target.value });
  };

  const setDocumentParameters = (prop) => (event) => {
    setlabelInfo({
      ...labelInfo,
      documentParameters: {
        ...labelInfo.documentParameters,
        [prop]: event.target.value,
      },
    });
  };

  const steps = [
    { title: "Get Document Parameters" },
    { title: "Get Files" },
    { title: "Send Instructions" },
    { title: "Run Script" },
    { title: "Get Final Document" },
  ];

  return (
    <LabelContext.Provider
      value={{
        page,
        steps,
        labelInfo,
        nextPage,
        prevPage,
        handleChange,
        setDocumentParameters,
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};

export const LabelConsumer = LabelContext.Consumer;
