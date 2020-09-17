import React from "react";
import "./Buildcontrol.scss";

const buildControl = props => (
  <div className="BuildControl">
    <label className="Label">{props.label}</label>
    <button
      className="Less"
      onClick={props.removed}
      disabled={props.disableRemove}
    >
      Less
    </button>
    <button className="More" onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
