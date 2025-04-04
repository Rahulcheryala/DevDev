import React from "react";
import { KeyControllerEvent } from "keycon";
import { prefixNames } from "framework-utils";
import domtoimage from "dom-to-image";
import {
  ScenaFunctionComponent,
  ScenaProps,
  ScenaComponent,
  ScenaJSXElement,
  ScenaFunctionJSXElement,
  ScenaElementLayerGroup,
  ScenaElementLayer,
  SavedLayerJson,
  EditorManagerInstance,
} from "../types";
import {
  IObject,
  splitComma,
  isArray,
  isFunction,
  isObject,
  splitUnit,
} from "@daybrush/utils";
import { Frame } from "scenejs";
import { getElementInfo } from "react-moveable";
import { fromTranslation, matrix3d } from "@scena/matrix";
import { DATA_SCENA_ELEMENT_ID, PREFIX, platformKeys } from "../consts";

export function prefix(...classNames: Array<string | undefined | false>) {
  return prefixNames(PREFIX, ...(classNames as string[]));
}

export function getContentElement(el: HTMLElement): HTMLElement | null {
  if (el.contentEditable === "inherit") {
    return getContentElement(el.parentElement!);
  }
  if (el.contentEditable === "true") {
    return el;
  }
  return null;
}

export function parseCssText(cssText: string) {
  const cssArray = cssText.split(";").filter(Boolean);
  const cssObject: any = {};
  let widthValue = ""; // Variable for width
  let heightValue = ""; // Variable for height

  for (const pair of cssArray) {
    const [property, value] = pair.trim().split(":");
    if (property === "width") {
      widthValue = value.trim(); // Fetch width
    } else if (property === "height") {
      heightValue = value.trim(); // Fetch height
    } else {
      cssObject[property.trim()] = value.trim();
    }
  }

  return { cssObject, widthValue, heightValue };
}
export function between(val: number, min: number, max: number) {
  return Math.min(Math.max(min, val), max);
}

export function getId(el: HTMLElement | SVGElement) {
  return el.getAttribute(DATA_SCENA_ELEMENT_ID)!;
}
export function getIds(els: Array<HTMLElement | SVGElement>): string[] {
  return els.map((el) => getId(el));
}

export function checkInput(target: HTMLElement | SVGElement) {
  const tagName = target.tagName.toLowerCase();

  return (
    (target as HTMLElement).isContentEditable ||
    tagName === "input" ||
    tagName === "textarea"
  );
}

export function inputChecker(e: KeyControllerEvent) {
  const inputEvent = e.inputEvent;
  const target = inputEvent.target as HTMLElement;

  if (!target || checkInput(target)) {
    return false;
  }
  return true;
}
export function keyChecker(e: KeyControllerEvent) {
  if (inputChecker(e)) {
    e.inputEvent.preventDefault();
  }
}

export const getPlatformSpecificKeys = (keys: string[]) => {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  return isMac
    ? keys.map((k) => (k === platformKeys.CONTROL ? platformKeys.META : k))
    : keys;
};

export function checkImageLoaded(el: HTMLElement | SVGElement): Promise<any> {
  if (el.tagName.toLowerCase() !== "img") {
    return Promise.all(
      [].slice
        .call(el.querySelectorAll("img"))
        .map((el) => checkImageLoaded(el)),
    );
  }
  return new Promise<void>((resolve) => {
    if ((el as HTMLImageElement).complete) {
      resolve();
    } else {
      el.addEventListener("load", function loaded() {
        resolve();

        el.removeEventListener("load", loaded);
      });
    }
  });
}

export function getParnetScenaElement(
  el: HTMLElement | SVGElement,
): HTMLElement | SVGElement | null {
  if (!el) {
    return null;
  }
  if (el.hasAttribute(DATA_SCENA_ELEMENT_ID)) {
    return el;
  }
  return getParnetScenaElement(el.parentElement as HTMLElement | SVGElement);
}

export function makeScenaFunctionComponent<T = IObject<any>>(
  id: string,
  component: (props: ScenaProps & T) => React.ReactElement<any, any>,
): ScenaFunctionComponent<T> {
  (component as ScenaFunctionComponent<T>).scenaComponentId = id;

  return component as ScenaFunctionComponent<T>;
}

export function getScenaAttrs(el: HTMLElement | SVGElement) {
  const attributes = el.attributes;
  const length = attributes.length;
  const attrs: IObject<any> = {};

  for (let i = 0; i < length; ++i) {
    const { name, value } = attributes[i];

    if (name === DATA_SCENA_ELEMENT_ID || name === "style") {
      continue;
    }
    attrs[name] = value;
  }

  return attrs;
}

export function isScenaFunction(value: any): value is ScenaComponent {
  return isFunction(value) && "scenaComponentId" in value;
}

export function isScenaElement(value: any): value is ScenaJSXElement {
  return isObject(value) && !isScenaFunction(value);
}

export function isScenaFunctionElement(
  value: any,
): value is ScenaFunctionJSXElement {
  return isScenaElement(value) && isFunction(value.type);
}

export function setMoveMatrix(frame: Frame, moveMatrix: number[]) {
  const transformOrders = [...(frame.getOrders(["transform"]) || [])];

  if (`${transformOrders[0]}`.indexOf("matrix3d") > -1) {
    const matrix = frame.get("transform", transformOrders[0]);
    const prevMatrix = isArray(matrix)
      ? matrix
      : splitComma(matrix).map((v) => parseFloat(v));

    frame.set(
      "transform",
      transformOrders[0],
      matrix3d(moveMatrix, prevMatrix),
    );
  } else if (frame.has("transform", "matrix3d")) {
    let num = 1;
    while (frame.has("transform", `matrix3d${++num}`)) {}

    frame.set("transform", `matrix3d${num}`, [...moveMatrix]);
    frame.setOrders(["transform"], [`matrix3d${num}`, ...transformOrders]);
  } else {
    frame.set("transform", "matrix3d", [...moveMatrix]);
    frame.setOrders(["transform"], ["matrix3d", ...transformOrders]);
  }
}

export function getOffsetOriginMatrix(
  el: HTMLElement | SVGElement,
  container: HTMLElement,
) {
  const stack = getElementInfo(el, container);
  const origin = stack.targetOrigin;
  const translation = fromTranslation(
    [origin[0], origin[1], origin[2] || 0],
    4,
  );

  return matrix3d(stack.offsetMatrix as any, translation);
}

export function flattenLayerGroup(
  group: ScenaElementLayerGroup,
): ScenaElementLayer[] {
  const layers: ScenaElementLayer[] = [];

  group.children.forEach((child) => {
    if (child.type === "group") {
      layers.push(...flattenLayerGroup(child));
    } else {
      layers.push(child);
    }
  });
  return layers;
}

export function isArrayEquals(arr1: any[], arr2: any[]) {
  return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i]);
}

export function isDeepArrayEquals(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.every((value1, i) => {
      const value2 = arr2[i];
      const isArray1 = isArray(value1);
      const isArray2 = isArray(value2);
      if (isArray1 && isArray2) {
        return isDeepArrayEquals(value1, value2);
      } else if (!isArray1 && !isArray2) {
        return value1 === value2;
      }
      return false;
    })
  );
}

export function isArrayContains(arr1: any[], arr2: any[]) {
  return arr1.every((el, i) => el === arr2[i]);
}

export function getPureValue(value?: string | number | null) {
  return splitUnit(`${value || 0}`).value;
}

export function debounce(func: any, wait: number) {
  let timeout: any;

  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
export function rgbToHex(rgb: string): string {
  if (rgb.startsWith("#")) {
    return rgb;
  }
  // Find the numbers in the input string, including decimals for alpha
  const result = rgb.match(/\d+(\.\d+)?/g);
  if (!result || (result.length !== 3 && result.length !== 4)) {
    throw new Error("Invalid RGB/RGBA color format");
  }

  // Parse the red, green, and blue values
  const r = parseInt(result[0]).toString(16).padStart(2, "0");
  const g = parseInt(result[1]).toString(16).padStart(2, "0");
  const b = parseInt(result[2]).toString(16).padStart(2, "0");

  // If an alpha value is provided, parse it and convert to HEX
  let a = "FF"; // Default to full opacity if alpha is not provided
  if (result.length === 4) {
    a = Math.round(parseFloat(result[3]) * 255)
      .toString(16)
      .padStart(2, "0");
  }
  // Return the HEX color value

  return `#${r}${g}${b}${a}`.toUpperCase();
}

export const getNormalizedRotationAngle = (
  transform: string,
): string | null => {
  const rotationMatch = transform.match(/rotate\(([^deg]+)deg\)/);
  if (rotationMatch && rotationMatch[1]) {
    let angle = parseFloat(rotationMatch[1]);
    // Wrap the angle between 0 and 359 degrees
    angle = ((angle % 360) + 360) % 360;
    // Handle the case where angle is exactly 360 degrees
    if (angle === 360) {
      angle = 0;
    }
    return angle.toFixed(1);
  }
  return null;
};

export function capitalizeFirstLetter(stringVal: string) {
  return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
}

export const convertHtmlToImage = async (
  targetClass: string,
): Promise<string | null> => {
  try {
    const targetElement = document.getElementsByClassName(
      targetClass,
    )[0] as HTMLElement;

    const image = await domtoimage.toPng(targetElement, {
      filter: (node: Node) => {
        return node === targetElement || targetElement.contains(node);
      },
      width: targetElement.offsetWidth,
      height: targetElement.offsetHeight,
    });

    return image;
  } catch (err) {
    console.error("Error generating image:", err);
    return null;
  }
};

// this function sets the rotational and positional values of the layer within the editor
export const setLayerProperties = (layer: SavedLayerJson) => {
  const rotation = layer?.rotation;
  const layerProperties: any = {};

  //setting the layer position
  layerProperties.transform = {
    translate: [
      `${layer.transformOrigin[0]}px`,
      `${layer.transformOrigin[1]}px`,
    ],
  };

  // setting the rotational and scale values
  if (rotation) {
    layerProperties.transform.rotate = rotation;
  }
  if (layer?.format?.scale) {
    layerProperties.transform.scale = layer?.format?.scale;
  }
  return layerProperties;
};

export const setLayerPosition = (
  layer: ScenaElementLayer | ScenaElementLayerGroup,
) => {
  const frame = new Frame();
  frame.set("transform", "translate", "50px");
  (layer as ScenaElementLayer).item.items[0] = frame;
};
export const getLayerProperties = (
  editorRef: React.MutableRefObject<EditorManagerInstance | undefined>,
  layer: ScenaElementLayer,
) => {
  const layerPosition = editorRef.current?.layerManager
    .getFrame(layer)
    .get("transform", "translate");
  const rotation =
    editorRef.current?.layerManager
      .getFrame(layer)
      .get("transform", "rotate") || "0deg";
  return {
    layerPosition,
    rotation,
  };
};

export const getOpacityHex = (opacity: number) => {
  const hex = Math.round((opacity / 100) * 255)
    .toString(16)
    .toUpperCase();
  return hex.length === 1 ? `0${hex}` : hex;
};
