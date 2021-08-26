// @ts-nocheck
import { useState } from "react";
import { createModel } from "hox";
import { cloneDeep } from "lodash";
import produce from "immer";
const homeConfig = {
  scenes: [
    {
      name: "场景17",
      layers: {
        title_todyInsurance: {
          id: "title_todyInsurance",
          attr: {
            x: 52,
            y: 145,
            w: 153,
            h: 29,
            deg: 0,
            opacity: 1,
            sizeLock: false,
            flipH: false,
            flipV: false,
          },
          requirePath: "Title",
          config: {
            textAlign: "left",
          },
          data: {
            source: 1234,
            api: {},
            dcConfig: {},
          },
        }
      },
    },
  ],
  config: {
    width: 1920,
    height: 1080,
    display: 2,
    backgroundColor: "#021237",
    backgroundImage: "",
    // backgroundImage:
    //   "https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/51182f91cfa0fd0b3c8754d7ca23e877.png",
    // title 组件顺序，从左至右 从上至下
    zIndexList: [
      { id: "title_todyInsurance" },
    ],
  },
  edit: {
    operateId: null,
  },
  name: "测试",
};

function useCounter() {
  const [config, setConfig] = useState(homeConfig);

  const addComponent = (componentInfo: Component.Item) => {
    class BaseConfig {
      constructor(props) {
        const { id, requirePath, data, config } = props;
        this.id = id;
        this.requirePath = requirePath;
        this.config = config;
        this.data = data;
        this.attr = {
          x: 300,
          y: 300,
          w: 400,
          h: 400,
          deg: 0,
          opacity: 1,
          sizeLock: false,
          flipH: false,
          flipV: false,
        };
      }
    }
    let zindexArr = []
    let addLayers = {}
    for (let i = 0; i < 50; i++) {
      const { type, name, init } = componentInfo;
      const id = `${name}_${Math.random()}`;
      const newComponetInfo = new BaseConfig({
        id,
        requirePath: type,
        data: init.data,
        config: init.config,
      });
      addLayers[id] = newComponetInfo
      zindexArr.push({id})
    }

    setConfig(
      produce((draft) => {
        draft.scenes[0].layers= {...draft.scenes[0].layers, ...addLayers};
        draft.config.zIndexList = draft.config.zIndexList.concat(zindexArr);
        console.log("add component");
      })
    );
  };

  const setOpearateId = (id) => {
    console.log("setOpearateId", id);
    if (id === config.edit.operateId) {
      return
    }
    setConfig(
      produce((draft) => {
        draft.edit.operateId = id;
      })
    );
  };

  const setAttr = (attr) => {
    // console.log('setAttr', new Date().getTime())
    setTimeout(() => {
      console.log('actual setConfig', new Date().getTime());
      const copy = produce((draft) => {
        const { operateId } = draft.edit;
        // console.log('attr', attr.x, 'time', new Date().getTime());
        
        if (operateId && draft.scenes[0].layers[operateId]) {
          const layer = cloneDeep(draft.scenes[0].layers[operateId]);
          layer.attr = attr;
          draft.scenes[0].layers[operateId] = layer;
        }
        console.log('produce excute', new Date().getTime())
      })
      
      setConfig(
        copy
      );
      console.log('setConfigend', new Date().getTime())
    })

  };


  return {
    config,
    addComponent,
    setOpearateId,
    setAttr,
  };
}

export default createModel(useCounter);
