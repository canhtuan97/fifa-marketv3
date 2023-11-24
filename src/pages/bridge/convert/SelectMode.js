import { Select } from "antd";
import React from "react";
import { MODES } from "./index";
import styled from "styled-components";
import "./index.css";

const Wrapper = styled.div`
  .ant-select-selector {
    background-color: #303d67 !important;
    border-style: none !important;
  }
  .ant-select-arrow {
    color: white !important;
  }
`;

const WrapperOption = styled.div`
  // &:hover {
  //   .hover-arrow {
  //     color: black;
  //   }
  // }
`;

const Arrow = styled.span`
  color: red;
`;

const { Option } = Select;

const App = ({ onChange, value }) => {
  return (
    <Wrapper>
      <Select
        defaultValue={MODES[0]}
        style={{
          width: 130,
        }}
        onChange={onChange}
        value={value}
      >
        <Option value={MODES[0]}>
          {
            <WrapperOption>
              <span style={{ color: "rgb(141, 198, 63)", fontWeight: "bold" }}>
                FIFAC
              </span>
              <Arrow className="hover-arrow">{` > `}</Arrow>
              <span style={{ color: "rgb(243, 186, 47", fontWeight: "bold" }}>
                GOLD
              </span>
            </WrapperOption>
          }
        </Option>
        <Option value={MODES[1]}>
          {
            <WrapperOption>
              <span style={{ color: "rgb(141, 198, 63)", fontWeight: "bold" }}>
                FIFAC
              </span>
              <Arrow className="hover-arrow">{` > `}</Arrow>
              <span style={{ color: "rgb(243, 186, 47", fontWeight: "bold" }}>
                CHIP
              </span>
            </WrapperOption>
          }
        </Option>
        <Option value={MODES[2]}>
          {
            <WrapperOption>
              <span style={{ color: "rgb(141, 198, 63)", fontWeight: "bold" }}>
                BUSD
              </span>
              <Arrow className="hover-arrow">{` > `}</Arrow>
              <span style={{ color: "rgb(243, 186, 47", fontWeight: "bold" }}>
                CHIP
              </span>
            </WrapperOption>
          }
        </Option>
      </Select>
    </Wrapper>
  );
};

export default App;
