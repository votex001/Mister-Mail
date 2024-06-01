import React from "react";
import { utilService } from "../services/util.service";



export function LetteredAvatar ({ name,size="50px"}) {


  let initials = name.split(' ')[0][0].toUpperCase();
  let color = utilService.getRandomColor(name);
  const customStyle = {
    display: "flex",
    height:size,
    width:size,
    borderRadius: "calc(100px)",
    color: "white",
    background: color,
    margin: "auto"
  };
  return (
    <div style={customStyle}>
      <span style={{margin: 'auto'}}>{initials}</span>
    </div>
  );
}