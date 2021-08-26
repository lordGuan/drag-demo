import React from "react";
import {Tabs } from "antd";
import AttrForm from './AttrForm'
import "./index.css";

const { TabPane } = Tabs;
interface Props {
  config: any;
  operateId: string;
}

/** // 在改变operateId
 * ConfigForm
 *  - configForm
 *  - operateConfig  用作初始值
 */

function EditPannel(props: Props) {
  const { operateId } = props
  console.log("editpannel render");
  return (

      <div className="editPannel">
        {
          operateId && <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            <AttrForm />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
        }
        {
          !operateId && <div>ohter</div>
        }
      </div>
  );
}

export default React.memo(EditPannel, (prev, next) => {
  const shouldUseMemo = prev.operateId === next.operateId;
  return shouldUseMemo;
});
