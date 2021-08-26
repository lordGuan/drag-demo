declare namespace DashBoard {
  interface Config {
    scenes: Scene[];
    config: PageConfig;
    name: string;
    edit: Edit;
  }

  interface Edit {
    operateId: any
  }

  interface PageConfig {
    width: number;
    height: number;
    display: number;
    backgroundColor: string;
    backgroundImage: string;
    zIndexList: ZIndexListItem[];
    cacheRepeatRequest?: boolean
  }

  interface ZIndexListItem {
    id: string;
    type: string;
  }

  interface Scene {
    name: string;
    layers: Layers;
  }

  interface Layers {
    [index: string]: Layer;
  }

  interface Layer {
    id: string;
    type: string;
    attr: Attr;
    comName: string;
    requirePath: string;
    config: LayerConfig;
    data: Data;
    version: string;
    alias: string;
  }

  interface LayerConfig {
    [index: string]: any;
  }

  interface Data {
    api: Api;
    source?: any;
    autoUpdate: number;
    dcConfig: {};
  }

  type Method = 'get' | 'post'

  interface Api {
    url: string;
    method: Method;
    handleRes: () => any | undefined;
    staleTime: number
  }

  interface Attr {
    x: number;
    y: number;
    w: number;
    h: number;
    deg: number;
    opacity: number;
    // sizeLock: boolean;
    // flipH: boolean;
    // flipV: boolean;
  }
}
