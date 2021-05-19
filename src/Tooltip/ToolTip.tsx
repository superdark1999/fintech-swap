import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";
import IconInformation from '../assets/img/information-icon.svg'

interface ToolTip {
    item? : string,
    id? : number,
    text?: string,
    position?: string,
} 

const TooltipItem: React.FC<ToolTip> = (props) => {
  const { item, id, text, position }:any = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <img src={IconInformation} width={20} id={"Tooltip-" + id}/>
      <Tooltip
        placement = {position}
        isOpen={tooltipOpen}
        target={"Tooltip-" + id}
        toggle={toggle}
      >
        {text}
      </Tooltip>
    </span>
  );
};

export default TooltipItem;