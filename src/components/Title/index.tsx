import React, { useEffect } from "react";

const DEFAULTSTYLE = {
  fontSize: 30,
  color: "#000",
  fontWeight: "normal",
};

const Title: React.FC = (props: any) => {
  useEffect(() => {
    console.log('title mounted')
  }, [])
  const { data = "标题11", textAlign = "center", textStyle = DEFAULTSTYLE } = props;
  return <div  style={{ ...textStyle, textAlign: textAlign }}>{data}</div>;
};

export default Title;
