import React, { useEffect, useRef } from "react";
import useConfigModel from "../../../model/config";
import classNames from "classnames";
import {withModel} from 'hox'

import "./DragContainer.css";

function DragContainer(props: any) {
  const { children, attr, id, isEdit = true, isOperated, styles, setOpearateId, setAttr  } = props;
  const mouseHandler = useRef(null);

  const OPERATE_TYPE = {
    DRAG: "drag",
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { operateType, startAttr, startPos } = mouseHandler.current;
    const offsetY = clientY - startPos.y;
    const offsetX = clientX - startPos.x;
    let newAttr: any = {};
    switch (operateType) {
      case OPERATE_TYPE.DRAG: {
        const x = startAttr.x + offsetX;
        const y = startAttr.y + offsetY;
        newAttr = {
          ...startAttr,
          x,
          y,
        };
        break;
      }
    }
    
    setAttr(newAttr);
  };

  const onMouseDown = (e, operateType) => {
    mouseHandler.current.startPos = { x: e.clientX, y: e.clientY };
    mouseHandler.current.startAttr = { ...attr };
    mouseHandler.current.operateType = operateType;
    bindEvents();
  };

  const handleDragMouseDown = (e) => {
    setOpearateId(id);
    e.stopPropagation();
    onMouseDown(e, OPERATE_TYPE.DRAG);
  };

  const unbindEvents = () => {
    window.removeEventListener(
      "mousemove",
      mouseHandler.current.handleMouseMove
    );
    window.removeEventListener("mouseup", mouseHandler.current.handleMouseUp);
  };

  const bindEvents = () => {
    window.addEventListener("mousemove", mouseHandler.current.handleMouseMove);
    window.addEventListener("mouseup", mouseHandler.current.handleMouseUp);
  };

  const handleMouseUp = () => {
    unbindEvents();
  };

  useEffect(() => {
    mouseHandler.current.handleMouseMove = handleMouseMove;
    mouseHandler.current.handleMouseUp = handleMouseUp;
    mouseHandler.current.unbindEvents = unbindEvents;
    mouseHandler.current.operateType = null;
  }, []);

  console.log(id, 'render time ', new Date().getTime())

  return (
      <div
      style={styles}
      className={classNames({
        dashboardContainer: isOperated,
        hoverBorderLine: isEdit,
      })}
      data-id={id}
      onMouseDown={handleDragMouseDown}
      key={id}
    >
      {children}  
      <div ref={mouseHandler} />    
    </div>
  );
}

const MemoC = React.memo(DragContainer, (prev, next) => {
  const shouldMemo = prev.attr === next.attr && prev.isOperated === next.isOperated
  return shouldMemo
}) ;

export default withModel(useConfigModel, (modal) => ({
  setAttr: modal.setAttr,
  setOpearateId: modal.setOpearateId
}))(MemoC)

