// @ts-nocheck
import React from "react";
import DashBoard from "../../components/DashBoard";
import EditPannel from "../../components/EditPannel";
import useConfigModel from "../../model/config";
import "./index.css";

function Editor() {
  const { config, addComponent } = useConfigModel();

  const componentInfo = {
    cn_name: "标题",
    init: { config: {}, data: { source: "标题" } },
    name: "title",
    type: "Title"
  };

  return (
    <div className="editor">
      <button onClick={addComponent.bind(null, componentInfo)}>
        点击增加50个标题组件
      </button>
      <h1>目前共{config.config.zIndexList.length}个组件</h1>
      <div className="dashboardWraper">
        <DashBoard config={config} isEdit={true} />
      </div>

      <EditPannel operateId={config.edit.operateId} />
    </div>
  );
}

export default Editor;
