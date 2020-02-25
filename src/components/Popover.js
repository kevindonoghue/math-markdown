import React, { useState } from "react";
import MUIPopover from "@material-ui/core/Popover";
import MUIPopper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { $, $$ } from "../components/KatexComponents";
import Axes from "../components/Axes";
import ZeroSet from "../components/ZeroSet";
import { makeStyles } from "@material-ui/core/styles";


function Popover(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <span>
      <sup>
        <span
          style={props.linkStyle}
          onClick={handleClick}
        >
          {props.text}
        </span>
      </sup>
      <MUIPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        PaperProps={{style: props.paperStyle}}
      >
        {props.children}
      </MUIPopover>
    </span>
  );
}

Popover.defaultProps = {
  linkStyle: { color: "blue", textDecoration: "underline" },
  paperStyle: {maxWidth: '75%'},
}

export default Popover;
