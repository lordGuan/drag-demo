//@ts-nocheck
import React, { useEffect, useState, Suspense } from "react";
import ContainerFC from "./ContainerFC";
import "./index.css";

const importView = async (path: string): Promise<any> =>
  React.lazy(() => import(`../${path}`));

interface Props {
  config: DashBoard.Config;
}

const DashBoard = (props: Props) => {
  const {
    config,
    isEdit = false ,
  } = props;
  const [views, setViews] = useState<any[]>([]);

  // 动态加载组件
  async function loadViews(fConfig: DashBoard.Config) {
    const zIndexList = fConfig.config.zIndexList;
    const {
      scenes: [{ layers }],
    } = fConfig;
    const componentPromises = zIndexList.map(async (zIndexItem) => {
      const layer = layers[zIndexItem.id];
      if (!layer) return;
      const View = await importView(layer.requirePath);
      return (<ContainerFC
        key={layer.id}
        config={layer}
        operateId={config.edit.operateId}
        isEdit={isEdit}
      >
        <View key={layer.id} />
      </ContainerFC>

      );
    });
    Promise.all(componentPromises).then((views) => {
      setViews(views);
    });
  }

  useEffect(() => {
    loadViews(config)
  }, [config])


  return (
    <Suspense fallback={<h1>loading</h1>}>
        {views}
    </Suspense>
  );
};

export default React.memo(DashBoard, (prev, next) => prev.config === next.config );
