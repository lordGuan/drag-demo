import React from "react";
import DragContainer from "./DragContainer";
import "./index.css";

interface Attr {
  x: number;
  y: number;
  w: number;
  h: number;
  deg: number;
  opacity: number;
}

interface Props {
  attr: Attr;
  id: string;
  operateId: any;
}

const Container: React.FC<Props> = (props) => {
  const { children, attr, id, operateId } = props;
  const { x, y, w, h, deg, opacity } = attr;

  const styles: React.CSSProperties = {
    width: w || 0,
    height: h || 0,
    left: x || 0,
    top: y || 0,
    transform: `rotate(${deg || 0}deg)`,
    opacity: opacity || 1,
    position: "absolute",
  };

  const isOperated = id === operateId;

  return (
    <DragContainer {...props} isOperated={isOperated} styles={styles}>
      {children}
    </DragContainer>
  );
};

export default Container;
