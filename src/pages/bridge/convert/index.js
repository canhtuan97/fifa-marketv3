import React, { useState } from "react";
import PartOne from "./part-1";
import PartTwo from "./part-2";
import SelectMode from "./SelectMode";

export const MODES = ["fifa_gold", "fifa_chip", "busd_chip"];

const Convert = (props) => {
  const [mode, setMode] = useState(MODES[0]);
  const handleChangeMode = (mode) => {
    setMode(mode);
    props.onMode(mode);
  };
  return (
    <div className="w-100">
      <div
        className="px-3 pb-mb-1 pb-3 mx-md-0 mx-auto"
        style={{ width: "fit-content" }}
      >
        <SelectMode onChange={handleChangeMode} value={mode} />
      </div>
      <div className="w-100 text-center">
        {mode === MODES[2] ? (
          <PartTwo {...props}/>
        ) : (
          <PartOne {...props} mode={mode} />
        )}
      </div>
    </div>
  );
};

export default Convert;
