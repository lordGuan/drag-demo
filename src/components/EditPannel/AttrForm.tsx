import React, { useEffect } from 'react';
import useConfigModel from "../../model/config";
import {Form, Input, InputNumber, Slider,} from 'antd'
import { withModel } from "hox";

interface Props {
  attr: DashBoard.Attr
}

function AttrForm(props: Props) {
  const {attr} = props
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(attr)
  }, [attr])

  return (
    <Form
    form={form}
    name="complex-form"
    labelCol={{ span: 6, offset: 2 }}
    initialValues={attr}
    wrapperCol={{ span: 16 }}
    labelAlign="left"
  >
    <Form.Item label="图表尺寸">
      <Input.Group compact>
        <Form.Item
          name="w"
          noStyle
          rules={[
            { required: true, message: "Province is required" },
          ]}
        >
          <InputNumber style={{ marginRight: "10px" }} />
        </Form.Item>
        <Form.Item
          name="h"
          noStyle
          rules={[{ required: true, message: "Street is required" }]}
        >
          <InputNumber />
        </Form.Item>
      </Input.Group>
    </Form.Item>
    <Form.Item label="图表位置">
      <Input.Group compact>
        <Form.Item
          name="x"
          noStyle
          rules={[
            { required: true, message: "Province is required" },
          ]}
        >
          <InputNumber style={{ marginRight: "10px" }} />
        </Form.Item>
        <Form.Item
          name="y"
          noStyle
          rules={[{ required: true, message: "Street is required" }]}
        >
          <InputNumber />
        </Form.Item>
      </Input.Group>
    </Form.Item>
    <Form.Item label="旋转角度" name="opacity">
      <InputNumber />
    </Form.Item>
    <Form.Item label="透明度" name="deg">
      <Slider min={0} max={1} step={0.01} />
    </Form.Item>
  </Form>
  );
}


const MemoLayerList = React.memo(AttrForm, (prev, next) => {
  const shouldUseMemo =
    prev.attr === next.attr ;
  return shouldUseMemo;
});

export default withModel(useConfigModel, (model) => ({
  attr: model.config.scenes[0].layers[model.config.edit.operateId].attr,
}))(MemoLayerList)