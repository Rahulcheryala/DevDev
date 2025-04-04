import { SceneItem } from "scenejs";

export type SavedScenaData = {
  name: string;
  jsxId: string;
  componentId: string;
  tagName: string;
  innerHTML?: string;
  innerText?: string;
  attrs: Record<string, any>;
  frame: Record<string, any>;
  children: SavedScenaData[];
};
export type ScenaProps = {
  scenaElementId?: string;
  scenaAttrs?: Record<string, any>;
  scenaText?: string;
  scenaHTML?: string;
};

export type ScenaFunctionComponent<T> = ((
  props: T & ScenaProps,
) => React.ReactElement<any, any>) & { scenaComponentId: string };
export type ScenaComponent = React.JSXElementConstructor<ScenaProps> & {
  scenaComponentId: string;
};
export type ScenaJSXElement =
  | React.ReactElement<any, string>
  | ScenaFunctionJSXElement;
export type ScenaFunctionJSXElement = React.ReactElement<any, ScenaComponent>;
export type ScenaJSXType = ScenaJSXElement | string | ScenaComponent;

export type FrameInfo = {
  frame: Record<string, any>;
  order: Record<string, any>;
};

export type ScenaTargetGroupsType = Array<
  | React.MutableRefObject<HTMLElement | SVGElement | null>
  | ScenaTargetGroupsType
>;

export type ScenaElementLayer = {
  type?:
    | "page"
    | "layer"
    | "image"
    | "qrcode"
    | "barcode"
    | "table"
    | "shape"
    | "text"
    | "line";
  id: string;
  title: string;
  scope: string[];
  jsx: React.ReactElement<any, any>;
  item: SceneItem;
  ref: React.MutableRefObject<SVGElement | HTMLElement | null>;
  style: Record<string, any>;
  metaData?: any;
};

export type ScenaElementLayerGroup = {
  type: "group";
  id: string;
  title: string;
  scope: string[];
  children: Array<ScenaElementLayerGroup | ScenaElementLayer>;
  opacity: number;
  display: string;
  metaData?: { [key: string]: any };
};
