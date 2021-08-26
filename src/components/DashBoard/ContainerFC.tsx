// @ts-nocheck
import React from "react";
import Container from "./Container/index";

interface Props {
  config: DashBoard.Layer;
  operateId: any;
}

const MemoC = ({ children }) => <>{children}</>;

const MemoConponent = React.memo(MemoC, (prev, next) => {
  return prev.data === next.data;
});

const ContainerFC: React.FC<Props> = (props) => {
  const { config, children, operateId, isEdit } = props;
  const {
    config: ComponentConfig,
    attr,
    data: { source },
    id,
  } = config;

  const renderChilden = (children_) => {
    const Childs = React.Children.map(children_, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      // 这里我们通常还会判断 child 的类型来确定是不是要传递相应的数据，这里我就不做了
      const childProps = {
        ...ComponentConfig,
        data: source,
        attr,
      };
      return React.cloneElement(child, childProps);
    });
    return Childs;
  };

  return (
    <Container attr={attr} id={id} operateId={operateId} isEdit={isEdit}>
      <MemoConponent data={source}>
        {
          // children 不是数组我们需要用 React.Children.map 来遍历或者把它转成数组
          renderChilden(children)
        }
      </MemoConponent>
    </Container>
  );
};

export default React.memo(ContainerFC, (prev, next) => {
  const shouldUseMemo =
    prev.config === next.config && prev.operateId === next.operateId;
  return shouldUseMemo;
});
