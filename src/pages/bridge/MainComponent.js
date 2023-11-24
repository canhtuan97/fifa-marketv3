import React, { useState } from "react";
import Convert from "./convert";
import History from "./history";
import styled from "styled-components";
import { MODES } from "./convert";

const Wrapper = styled.div``;

export const MainComponent = () => {
  const [isLoadPage, setIsLoadPage] = useState(false);
  const [isLoadPage1, setIsLoadPage1] = useState(false);
  const [isLoadPage2, setIsLoadPage2] = useState(false);
  const [isLoadPage3, setIsLoadPage3] = useState(false);
  const [isLoadPage4, setIsLoadPage4] = useState(false);
  const [isLoadPage5, setIsLoadPage5] = useState(false);
  const [mode, setMode] = useState(MODES[0]);

  const handleLoadPage = (value) => {
    setIsLoadPage(value);
  };

  const handleLoadPage1 = (value) => {
    setIsLoadPage1(value);
  };
  const handleLoadPage2 = (value) => {
    setIsLoadPage2(value);
  };
  const handleLoadPage3 = (value) => {
    setIsLoadPage3(value);
  };
  const handleLoadPage4 = (value) => {
    setIsLoadPage4(value);
  };
  const handleLoadPage5 = (value) => {
    setIsLoadPage5(value);
  };

  const handleMode = (mode) => {
    setMode(mode);
  };

  return (
    <Wrapper>
      <div
        className="d-flex justify-content-center justify-content-sm-start py-3"
        style={{ borderRadius: 10, backgroundColor: "rgba(11, 31, 79, 1)" }}
      >
        <Convert
          onMode={handleMode}
          onLoadPage={handleLoadPage}
          onLoadPage1={handleLoadPage1}
          onLoadPage2={handleLoadPage2}
          onLoadPage3={handleLoadPage3}
          onLoadPage4={handleLoadPage4}
          onLoadPage5={handleLoadPage5}
        />
      </div>
      <div className="mt-3">
        <History
          mode={mode}
          isLoadPage={isLoadPage}
          isLoadPage1={isLoadPage1}
          isLoadPage2={isLoadPage2}
          isLoadPage3={isLoadPage3}
          isLoadPage4={isLoadPage4}
          isLoadPage5={isLoadPage5}
        />
      </div>
    </Wrapper>
  );
};
