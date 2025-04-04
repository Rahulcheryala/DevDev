/* eslint-disable max-len */
import * as React from "react";
import { RightSideBarImages } from "../../types";
import { defaultIconValues } from "../../consts";

export const DefaultSVG = React.forwardRef<SVGSVGElement, Record<string, any>>(
  (props: any, ref) => {
    return (
      <svg
        ref={ref}
        fill="var(--scena-editor-color-icon)"
        stroke="var(--scena-editor-color-icon)"
        {...props}
      />
    );
  },
);

DefaultSVG.displayName = "DefaultSVG";

export function MoveToolIcon() {
  return (
    <DefaultSVG viewBox="0 0 80 80" fill="none">
      <path
        d="M 21,21 L 35,60 L 40,44 L 54,58 A 3,3 0,0,0, 58,54 L 44,40 L 60,35 L 21,21Z"
        strokeLinejoin="round"
        strokeWidth="3"
        style={{ transformOrigin: "42px 42px", transform: "rotate(10deg)" }}
      />
    </DefaultSVG>
  );
}

export function FontIcon() {
  return (
    <DefaultSVG viewBox="0 0 80 80">
      <path d="M64.286,17.81L20.714,17.81L20.714,29.56L29.214,23L39.262,23L39.262,55.476L27.77,61.262L27.77,62.071L57.23,62.071L57.23,61.262L45.738,55.476L45.738,23L55.786,23L64.286,29.56L64.286,17.81Z" />
    </DefaultSVG>
  );
}

export function CropIcon() {
  return (
    <svg viewBox="0 0 80 80">
      <path
        d="M25,10L25,50L65,50   M10,25L50,25L50,65"
        style={{
          stroke: "var(--scena-editor-color-icon)",
          strokeWidth: 5,
          fill: "none",
        }}
      />
    </svg>
  );
}
export function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

export const ScenaIcon = React.forwardRef<SVGSVGElement, Record<string, any>>(
  (props, ref) => {
    return (
      <DefaultSVG
        ref={ref}
        width="100%"
        height="100%"
        viewBox="0 0 256 256"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        {...props}
      >
        <rect x="32" y="80" width="192" height="96" />
        <path d="M224,176l-96,-0l-32,48l128,-0l0,-48Z" />
        <path d="M160,32l-128,0l-0,48l96,0l32,-48Z" />
        <path d="M88,176l-56,0l0,48l24,-0l32,-48Z" />
        <path d="M224,32l-24,-0l-32,48l56,0l0,-48Z" />
      </DefaultSVG>
    );
  },
);

ScenaIcon.displayName = "ScenaIcon";

export function RectIcon() {
  return (
    <svg viewBox="0 0 73 73">
      <path
        d="M16.5,21.5 h40 a0,0 0 0 1 0,0 v30 a0,0 0 0 1 -0,0 h-40 a0,0 0 0 1 -0,-0 v-30 a0,0 0 0 1 0,-0 z"
        fill="#555"
        strokeLinejoin="round"
        strokeWidth="3"
        stroke="#fff"
      ></path>
    </svg>
  );
}
export function CanvasIcon() {
  return (
    <svg
      fill="#ffffff"
      height="20px"
      width="50px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 297 297"
      xmlSpace="preserve"
    >
      <path
        d="M247.5,188H241V43h6.5c5.523,0,10-4.478,10-10s-4.477-10-10-10h-89V10c0-5.523-4.477-10-10-10s-10,4.477-10,10v13h-89
   c-5.522,0-10,4.478-10,10s4.478,10,10,10H56v145h-6.5c-5.522,0-10,4.477-10,10s4.478,10,10,10h53.829l-30.114,75.283
   c-2.051,5.128,0.443,10.947,5.571,12.999c1.218,0.487,2.475,0.718,3.711,0.718c3.969,0,7.724-2.379,9.288-6.289l33.001-82.5
   c0.027-0.07,0.046-0.141,0.072-0.211H138.5v78.997c0,5.522,4.477,10,10,10s10-4.478,10-10V208h13.642
   c0.026,0.07,0.045,0.141,0.072,0.211l33.001,82.5c1.564,3.91,5.319,6.289,9.288,6.289c1.236,0,2.493-0.231,3.711-0.718
   c5.128-2.052,7.622-7.871,5.571-12.999L193.671,208H247.5c5.523,0,10-4.477,10-10S253.023,188,247.5,188z M76,43h145v145H76V43z"
      />
    </svg>
  );
}

export function LeftAlignIcon() {
  return (
    <svg
      width="20px"
      height="25px"
      viewBox="0 0 24 24"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 10H16M3 14H21M3 18H16M3 6H21"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function RightAlignIcon() {
  return (
    <svg
      width="20px"
      height="25px"
      viewBox="0 0 24 24"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10L21 10"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 6H21"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 18L21 18"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14H21"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function CenterAlignIcon() {
  return (
    <svg
      width="20px"
      height="25px"
      viewBox="0 0 24 24"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H21M3 14H21M17 10H7M17 18H7"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function JustifyAlignIcon() {
  return (
    <svg
      width="20px"
      height="25px"
      viewBox="0 0 17 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        d="M17 2v1h-17v-1h17zM0 7h17v-1h-17v1zM0 11h17v-1h-17v1zM0 15h17v-1h-17v1z"
        fill="#ffffff"
      />
    </svg>
  );
}
export function OrderedListIcon() {
  return (
    <svg
      fill="#ffffff"
      width="20px"
      height="25px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.59 3.03h12.2v1.26H3.59zm0 4.29h12.2v1.26H3.59zm0 4.35h12.2v1.26H3.59zM.99 4.79h.49V2.52H.6v.45h.39v1.82zm.87 3.88H.91l.14-.11.3-.24c.35-.28.49-.5.49-.79A.74.74 0 0 0 1 6.8a.77.77 0 0 0-.81.84h.52A.34.34 0 0 1 1 7.25a.31.31 0 0 1 .31.31.6.6 0 0 1-.22.44l-.87.75v.39h1.64zm-.36 3.56a.52.52 0 0 0 .28-.48.67.67 0 0 0-.78-.62.71.71 0 0 0-.77.75h.5a.3.3 0 0 1 .27-.32.26.26 0 1 1 0 .51H.91v.38H1c.23 0 .37.11.37.29a.29.29 0 0 1-.33.29.35.35 0 0 1-.36-.35H.21a.76.76 0 0 0 .83.8.74.74 0 0 0 .83-.72.53.53 0 0 0-.37-.53z" />
    </svg>
  );
}
export function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="white"
      width={"20px"}
      height={"20px"}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
      />
    </svg>
  );
}
export function UnorderedListIcon() {
  return (
    <svg
      fill="#ffffff"
      width="20px"
      height="25px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="5.94" y="6.42" width="18.06" height="1.75" />
      <rect x="5.94" y="11.71" width="18.06" height="1.75" />
      <rect x="5.94" y="16.99" width="18.06" height="1.75" />
      <circle cx="1.85" cy="7.29" r="1.52" />
      <circle cx="1.85" cy="12.58" r="1.52" />
      <circle cx="1.85" cy="17.87" r="1.52" />
    </svg>
  );
}
export function RoundRectIcon() {
  return (
    <svg viewBox="0 0 73 73">
      <path
        d="M26.5,21.5 h20 a10,10 0 0 1 10,10 v10 a10,10 0 0 1 -10,10 h-20 a10,10 0 0 1 -10,-10 v-10 a10,10 0 0 1 10,-10 z"
        fill="#555"
        strokeLinejoin="round"
        strokeWidth="3"
        stroke="#fff"
      ></path>
    </svg>
  );
}
export function OvalIcon() {
  return (
    <svg viewBox="0 0 73 73">
      <ellipse
        fill="#555"
        cx="36.5"
        cy="36.5"
        rx="20"
        ry="15"
        strokeLinejoin="round"
        strokeWidth="3"
        stroke="#fff"
      ></ellipse>
    </svg>
  );
}
export function CircleIcon() {
  return (
    <svg viewBox="0 0 73 73">
      <ellipse
        fill="#555"
        cx="36.5"
        cy="36.5"
        rx="15"
        ry="15"
        strokeLinejoin="round"
        strokeWidth="3"
        stroke="#fff"
      ></ellipse>
    </svg>
  );
}

export function PolygonIcon() {
  return (
    <svg viewBox="0 0 73 73">
      <path
        d="M 20,15 L 10,35 L 20,55 L 35,45 L 40, 50 L 55,31 L 41,15 L 30, 25 Z"
        fill="#555"
        strokeLinejoin="round"
        strokeWidth="3"
        stroke="#fff"
      ></path>
    </svg>
  );
}

export function TransformIcon() {
  return (
    <DefaultSVG viewBox="0 0 80 80">
      {/* <rect x="20" y="20" width="40" height="40" stroke="#fff" strokeWidth="3" fill="rgba(255, 255, 255, 0.5)"></rect> */}
      <rect x="15" y="15" width="10" height="10"></rect>
      <rect x="35" y="15" width="10" height="10"></rect>
      <rect x="55" y="15" width="10" height="10"></rect>
      <rect x="15" y="35" width="10" height="10"></rect>
      <rect x="55" y="35" width="10" height="10"></rect>
      <rect x="15" y="55" width="10" height="10"></rect>
      <rect x="35" y="55" width="10" height="10"></rect>
      <rect x="55" y="55" width="10" height="10"></rect>
    </DefaultSVG>
  );
}

export function CheckedIcon() {
  return (
    <DefaultSVG viewBox="0 0 80 80">
      <path
        d="M 21,40 L 35,60 L 60,25 L35, 60, L 21,40 Z"
        strokeLinejoin="round"
        strokeWidth="10"
      ></path>
    </DefaultSVG>
  );
}

export function FolderIcon() {
  return (
    <DefaultSVG viewBox="0 0 80 80">
      <path
        d="M 10,20 L 30,20 L 40,26 L70, 26, L 70,60 L 10,60 L 10,20 Z"
        strokeLinejoin="round"
        strokeWidth="10"
      ></path>
    </DefaultSVG>
  );
}

export function LayerIcon() {
  return (
    <DefaultSVG viewBox="0 0 80 80">
      <path
        d="M40,20 L70,40 L40,60 L10,40 L40,20Z"
        strokeWidth="3"
        style={{
          // fill: "rgba(255, 255, 255, 0.5)",
          transform: "translateY(-7px)",
        }}
      ></path>
      <path
        d="M40,20 L70,40 L40,60 L10,40 L40,20Z"
        strokeWidth="3"
        style={{
          // fill: "rgba(255, 255, 255, 0.5)",
          transform: "translateY(7px)",
        }}
      ></path>
    </DefaultSVG>
  );
}

export function VisibleIcon(props: any) {
  return (
    <DefaultSVG height="48" width="48" viewBox="0 0 48 48" {...props}>
      <path d="M24 31.5q3.55 0 6.025-2.475Q32.5 26.55 32.5 23q0-3.55-2.475-6.025Q27.55 14.5 24 14.5q-3.55 0-6.025 2.475Q15.5 19.45 15.5 23q0 3.55 2.475 6.025Q20.45 31.5 24 31.5Zm0-2.9q-2.35 0-3.975-1.625T18.4 23q0-2.35 1.625-3.975T24 17.4q2.35 0 3.975 1.625T29.6 23q0 2.35-1.625 3.975T24 28.6Zm0 9.4q-7.3 0-13.2-4.15Q4.9 29.7 2 23q2.9-6.7 8.8-10.85Q16.7 8 24 8q7.3 0 13.2 4.15Q43.1 16.3 46 23q-2.9 6.7-8.8 10.85Q31.3 38 24 38Zm0-15Zm0 12q6.05 0 11.125-3.275T42.85 23q-2.65-5.45-7.725-8.725Q30.05 11 24 11t-11.125 3.275Q7.8 17.55 5.1 23q2.7 5.45 7.775 8.725Q17.95 35 24 35Z" />
    </DefaultSVG>
  );
}

export function InvisibleIcon(props: any) {
  return (
    <DefaultSVG height="48" width="48" viewBox="0 0 48 48" {...props}>
      <path d="m31.45 27.05-2.2-2.2q1.3-3.55-1.35-5.9-2.65-2.35-5.75-1.2l-2.2-2.2q.85-.55 1.9-.8 1.05-.25 2.15-.25 3.55 0 6.025 2.475Q32.5 19.45 32.5 23q0 1.1-.275 2.175-.275 1.075-.775 1.875Zm6.45 6.45-2-2q2.45-1.8 4.275-4.025Q42 25.25 42.85 23q-2.5-5.55-7.5-8.775Q30.35 11 24.5 11q-2.1 0-4.3.4-2.2.4-3.45.95L14.45 10q1.75-.8 4.475-1.4Q21.65 8 24.25 8q7.15 0 13.075 4.075Q43.25 16.15 46 23q-1.3 3.2-3.35 5.85-2.05 2.65-4.75 4.65Zm2.9 11.3-8.4-8.25q-1.75.7-3.95 1.075T24 38q-7.3 0-13.25-4.075T2 23q1-2.6 2.775-5.075T9.1 13.2L2.8 6.9l2.1-2.15L42.75 42.6ZM11.15 15.3q-1.85 1.35-3.575 3.55Q5.85 21.05 5.1 23q2.54 5.55 7.675 8.775Q17.9 35 24.4 35q1.65 0 3.25-.2t2.4-.6l-3.2-3.2q-.55.25-1.35.375T24 31.5q-3.5 0-6-2.45T15.5 23q0-.75.125-1.5T16 20.15Zm15.25 7.1Zm-5.8 2.9Z" />
    </DefaultSVG>
  );
}

export function LinkIcon(props: any) {
  return (
    <DefaultSVG height="48" width="48" viewBox="0 0 48 48" {...props}>
      <path d="M22.5 34H14q-4.15 0-7.075-2.925T4 24q0-4.15 2.925-7.075T14 14h8.5v3H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h15.5v3ZM25.5 34v-3H34q2.9 0 4.95-2.05Q41 26.9 41 24q0-2.9-2.05-4.95Q36.9 17 34 17h-8.5v-3H34q4.15 0 7.075 2.925T44 24q0 4.15-2.925 7.075T34 34Z" />
    </DefaultSVG>
  );
}

export function UnlinkIcon(props: any) {
  return (
    <DefaultSVG height="48" width="48" viewBox="0 0 48 48" {...props}>
      <path d="M37.5 33.45 35.05 31q2.54-.5 4.25-2.4 1.7-1.9 1.7-4.45 0-2.9-2.05-4.95-2.05-2.05-4.95-2.05h-7.75v-3H34q4.15 0 7.075 2.925T44 24.15q0 3.1-1.8 5.6-1.8 2.5-4.7 3.7Zm-7.8-7.8-3-3h5.05v3Zm11 19.55L3.15 7.65 5.3 5.5l37.55 37.55ZM22.5 34H14q-4.15 0-7.075-2.925T4 24q0-3.6 2.225-6.35Q8.45 14.9 11.9 14.2l2.8 2.8H14q-2.9 0-4.95 2.05Q7 21.1 7 24q0 2.9 2.05 4.95Q11.1 31 14 31h8.5Zm-6.25-8.5v-3h3.95l3 3Z" />
    </DefaultSVG>
  );
}

export function LightModeIcon(props: any) {
  return (
    <DefaultSVG height="40" viewBox="0 96 960 960" width="40" {...props}>
      <path d="M479.843 709.334q55.49 0 94.491-38.844 39-38.843 39-94.333 0-55.49-38.844-94.491-38.843-39-94.333-39-55.49 0-94.491 38.844-39 38.843-39 94.333 0 55.49 38.844 94.491 38.843 39 94.333 39ZM480 776q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM73.333 609.333q-14.166 0-23.75-9.617Q40 590.099 40 575.883q0-14.216 9.583-23.716 9.584-9.5 23.75-9.5h93.334q14.166 0 23.75 9.617Q200 561.901 200 576.117q0 14.216-9.583 23.716-9.584 9.5-23.75 9.5H73.333Zm720 0q-14.166 0-23.75-9.617Q760 590.099 760 575.883q0-14.216 9.583-23.716 9.584-9.5 23.75-9.5h93.334q14.166 0 23.75 9.617Q920 561.901 920 576.117q0 14.216-9.583 23.716-9.584 9.5-23.75 9.5h-93.334ZM479.883 296q-14.216 0-23.716-9.583-9.5-9.584-9.5-23.75v-93.334q0-14.166 9.617-23.75Q465.901 136 480.117 136q14.216 0 23.716 9.583 9.5 9.584 9.5 23.75v93.334q0 14.166-9.617 23.75Q494.099 296 479.883 296Zm0 720q-14.216 0-23.716-9.58-9.5-9.587-9.5-23.753v-93.334q0-14.166 9.617-23.75Q465.901 856 480.117 856q14.216 0 23.716 9.583 9.5 9.584 9.5 23.75v93.334q0 14.166-9.617 23.753-9.617 9.58-23.833 9.58ZM235.334 378 183 326.666q-10-9.666-9.586-23.735.414-14.069 9.517-24 9.931-9.931 24-9.931t23.735 10L282 331.334q9 10 9 23.333 0 13.333-9 23-9 9.666-22.833 9.5Q245.334 387 235.334 378Zm494 495L678 820.666q-9-10-9-23.749 0-13.75 9.333-22.917 9.334-10 22.834-9.833 13.499.166 23.499 9.833L777 825.334q10 9.666 9.586 23.735-.414 14.069-9.517 24-9.931 9.931-24 9.931t-23.735-10ZM678 378q-10-9.667-9.833-23.167.166-13.499 9.833-23.499L729.334 279q9.666-10 23.735-9.586 14.069.414 24 9.517 9.931 9.931 9.931 24t-10 23.735L724.666 378q-9.333 9-22.909 9-13.575 0-23.757-9ZM182.931 873.069q-9.931-9.931-9.931-24t10-23.735L235.334 774q9.866-9.667 23.433-9.667 13.566 0 22.972 9.667 10.261 9.667 10.094 23.167-.166 13.499-9.833 23.499L230.666 873q-9.666 10-23.735 9.586-14.069-.414-24-9.517ZM480 576Z" />
    </DefaultSVG>
  );
}

export function DarkModeIcon(props: any) {
  return (
    <DefaultSVG height="40" viewBox="0 96 960 960" width="40" {...props}>
      <path d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q10 0 20.5.667 10.5.666 24.166 2-37.666 31-59.166 77.833T444 396q0 90 63 153t153 63q53 0 99.667-20.5 46.666-20.5 77.666-56.166 1.334 12.333 2 21.833.667 9.5.667 18.833 0 150-105 255T480 936Zm0-66.666q102 0 179.334-61.167t101.333-147.834q-23.333 9-49.111 13.667-25.778 4.666-51.556 4.666-117.459 0-200.063-82.603Q377.334 513.459 377.334 396q0-22.667 4.333-47.667t14.667-55q-91.334 28.666-150.501 107Q186.666 478.666 186.666 576q0 122 85.667 207.667T480 869.334Zm-6-288.001Z" />
    </DefaultSVG>
  );
}

export const TemplatesIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 20L9 4"
        stroke={"#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 19V5C21 4.44772 20.5523 4 20 4L4 4C3.44772 4 3 4.44772 3 5L3 19C3 19.5523 3.44771 20 4 20H20C20.5523
           20 21 19.5523 21 19Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const DashboardIcon = ({ isActive }: RightSideBarImages) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.4 3H4.6C4.03995 3 3.75992 3 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3 3.75992 3 4.03995 3 4.6V8.4C3 8.96005 3 9.24008 3.10899 9.45399C3.20487 9.64215 3.35785 9.79513 3.54601 9.89101C3.75992 10 4.03995 10 4.6 10H8.4C8.96005 10 9.24008 10 9.45399 9.89101C9.64215 9.79513 9.79513 9.64215 9.89101 9.45399C10 9.24008 10 8.96005 10 8.4V4.6C10 4.03995 10 3.75992 9.89101 3.54601C9.79513 3.35785 9.64215 3.20487 9.45399 3.10899C9.24008 3 8.96005 3 8.4 3Z"
        stroke="#19110B"
        fill={`${isActive ? "#19110B" : ""}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M19.4 3H15.6C15.0399 3 14.7599 3 14.546 3.10899C14.3578 3.20487 14.2049 3.35785 14.109 3.54601C14 3.75992 14 4.03995 14 4.6V8.4C14 8.96005 14 9.24008 14.109 9.45399C14.2049 9.64215 14.3578 9.79513 14.546 9.89101C14.7599 10 15.0399 10 15.6 10H19.4C19.9601 10 20.2401 10 20.454 9.89101C20.6422 9.79513 20.7951 9.64215 20.891 9.45399C21 9.24008 21 8.96005 21 8.4V4.6C21 4.03995 21 3.75992 20.891 3.54601C20.7951 3.35785 20.6422 3.20487 20.454 3.10899C20.2401 3 19.9601 3 19.4 3Z`}
        stroke="#19110B"
        fill={`${isActive ? "#19110B" : ""}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M19.4 14H15.6C15.0399 14 14.7599 14 14.546 14.109C14.3578 14.2049 14.2049 14.3578 14.109 14.546C14 14.7599 14 15.0399 14 15.6V19.4C14 19.9601 14 20.2401 14.109 20.454C14.2049 20.6422 14.3578 20.7951 14.546 20.891C14.7599 21 15.0399 21 15.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V15.6C21 15.0399 21 14.7599 20.891 14.546C20.7951 14.3578 20.6422 14.2049 20.454 14.109C20.2401 14 19.9601 14 19.4 14Z`}
        stroke="#19110B"
        fill={`${isActive ? "#19110B" : ""}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M8.4 14H4.6C4.03995 14 3.75992 14 3.54601 14.109C3.35785 14.2049 3.20487 14.3578 3.10899 14.546C3 14.7599 3 15.0399 3 15.6V19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7951 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H8.4C8.96005 21 9.24008 21 9.45399 20.891C9.64215 20.7951 9.79513 20.6422 9.89101 20.454C10 20.2401 10 19.9601 10 19.4V15.6C10 15.0399 10 14.7599 9.89101 14.546C9.79513 14.3578 9.64215 14.2049 9.45399 14.109C9.24008 14 8.96005 14 8.4 14Z`}
        stroke="#19110B"
        fill={`${isActive ? "#19110B" : ""}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const ElementsNewIcon = ({ isActive }: RightSideBarImages) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.97 12.92C2.67476 13.0974 2.43033 13.348 2.26039 13.6476C2.09045
           13.9472 2.00075 14.2856 2 14.63V17.87C2.00075 18.2144 2.09045 18.5528 2.26039 
           18.8524C2.43033 19.152 2.67476 19.4026 2.97 19.58L5.97 21.38C6.28106 21.5669 
           6.63711 21.6656 7 21.6656C7.36289 21.6656 7.71894
            21.5669 8.03 21.38L12 19V13.5L7 10.5L2.97 12.92Z"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99781 16.5004L2.25781 13.6504"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16.5L12 13.5"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16.5V21.67"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.5V19L15.97 21.38C16.2811 21.5669 16.6371 21.6656 17 21.6656C17.3629
           21.6656 17.7189 21.5669 18.03 21.38L21.03 19.58C21.3252 19.4026 21.5697 19.152
            21.7396 18.8524C21.9096 18.5528 21.9992 18.2144 22 17.87V14.63C21.9992 14.2856
             21.9096 13.9472 21.7396 13.6476C21.5697 13.348 21.3252 13.0974 21.03 12.92L17 10.5L12 13.5Z"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.5L12 13.5"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.5004L21.74 13.6504"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.5V21.67"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.97 4.4196C7.67476 4.59698 7.43033 4.84761 7.26039 5.14719C7.09045 5.44678
           7.00075 5.78518 7 6.1296V10.4996L12 13.4996L17 10.4996V6.1296C16.9992 5.78518
            16.9096 5.44678 16.7396 5.14719C16.5697 4.84761 16.3252 4.59698 16.03 4.4196L13.03 
            2.6196C12.7189 2.43272 12.3629 2.33398 12 2.33398C11.6371 2.33398 11.2811 2.43272 10.97 2.6196L7.97 4.4196Z"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9978 8.00039L7.25781 5.15039"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.00039L16.74 5.15039"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.5V8"
        fill={isActive ? "currentColor" : "none"}
        stroke={isActive ? "#FFFFFF" : "#19110B"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const BrandingIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.88161 18.4058L13.4975 4.91129C13.5731 4.62886 13.4055 4.33857 13.1231 
          4.26289L7.38438 2.7252C7.10195 2.64953 6.81166 2.81713 6.73598 3.09955L3.12013
           16.5941C2.61983 18.4612 3.72787 20.3804 5.595 20.8807C7.46213 21.381 9.38131 20.273 9.88161 18.4058Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 20.9999L20.4706 20.9999C20.763 20.9999 21 20.7629 21 20.4705V14.5293"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 17.5996H6.502V17.6016H6.5V17.5996Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.98047 20.6712L20.6421 14.7669C20.9071 14.6434 21.0218 14.3284 20.8982
           14.0634L18.3873 8.67885C18.2638 8.41385 17.9488 8.29921 17.6838 8.42277L12.0304 11.059"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UploadsIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 3L6 3"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21L12 7"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12L12 7L17 12"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ProjectsIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 20L20 20C20.5523 20 21 19.5523 21 19L21 7C21 6.44772 20.5523 6 20 6L3 6L3 19C3 19.5523 3.44772 20 4 20Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6L10.2929 4.29289C10.1054 4.10536 9.851 4 9.58579 4H4C3.44772 4 3 4.44772 3 5V6"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DataIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 17L6 7M18 7L18 17"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 17C18 18.6569 15.3137 20 12 20C8.68629 20 6 18.6569 6 17"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 12C18 13.6569 15.3137 15 12 15C8.68629 15 6 13.6569 6 12"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 10C15.3137 10 18 8.65685 18 7C18 5.34315 15.3137 4 12 
          4C8.68629 4 6 5.34315 6 7C6 8.65685 8.68629 10 12 10Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ControlsIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 7L6 4C6 3.44772 6.44772 3 7 3L14.5631 3C14.8416 3 15.1076 3.11619 15.2968 3.32059L19.7338
           8.11246C19.9049 8.29731 20 8.53995 20 8.79187V20C20 20.5523 19.5523 21 19 21H15"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7113 12.5455L8.28867 10.0748C8.11004 9.97505 7.88996 9.97505
           7.71132 10.0748L3.28868 12.5455C3.11004 12.6453 3 12.8297 3 13.0293V17.9707C3
            18.1703 3.11004 18.3547 3.28868 18.4545L7.71132 20.9252C7.88996 21.0249 8.11004
             21.0249 8.28868 20.9252L12.7113 18.4545C12.89 18.3547 13 18.1703 13 17.9707V13.0293C13
              12.8297 12.89 12.6453 12.7113 12.5455Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 16.5C8.55228 16.5 9 16.0523 9 15.5C9 14.9477 8.55228 14.5 8 14.5C7.44772
           14.5 7 14.9477 7 15.5C7 16.0523 7.44772 16.5 8 16.5Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 9L15 9C14.4477 9 14 8.55228 14 8L14 3"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const CrossIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 15L5 5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 5L5 15"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const TableCheckedIcon = (props?: any) => {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4.0003L3.82843 6.82873L9.48528 1.17188"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const InfoIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke={defaultIconValues.primaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.33337V10.6667"
        stroke={defaultIconValues.primaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.96875 5.33337H8.03542V5.40004H7.96875V5.33337Z"
        stroke={defaultIconValues.primaryStroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HorizontalDoubleBar = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M12.6693 12.668L12.6693 3.33464C12.6693 2.96645 12.3708 2.66797 12.0026 2.66797L10.0026 2.66797C9.63441 2.66797 9.33594 2.96645 9.33594 3.33464L9.33594 12.668C9.33594 13.0362 9.63441 13.3346 10.0026 13.3346H12.0026C12.3708 13.3346 12.6693 13.0362 12.6693 12.668Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M6.66927 12.668L6.66927 3.33464C6.66927 2.96645 6.37079 2.66797 6.0026 2.66797L4.0026 2.66797C3.63441 2.66797 3.33594 2.96645 3.33594 3.33464L3.33594 12.668C3.33594 13.0362 3.63441 13.3346 4.0026 13.3346H6.0026C6.37079 13.3346 6.66927 13.0362 6.66927 12.668Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const AngleUpIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 7.5L6 4L9.5 7.5"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const AngleDownIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 4.5L6 8L2.5 4.5"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const VerticalDoubleBar = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M12.6641 9.33203H3.33073C2.96254 9.33203 2.66406 9.63051 2.66406 9.9987V11.9987C2.66406 12.3669 2.96254 12.6654 3.33073 12.6654H12.6641C13.0323 12.6654 13.3307 12.3669 13.3307 11.9987V9.9987C13.3307 9.63051 13.0323 9.33203 12.6641 9.33203Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M12.6641 3.33203H3.33073C2.96254 3.33203 2.66406 3.63051 2.66406 3.9987V5.9987C2.66406 6.36689 2.96254 6.66536 3.33073 6.66536H12.6641C13.0323 6.66536 13.3307 6.36689 13.3307 5.9987V3.9987C13.3307 3.63051 13.0323 3.33203 12.6641 3.33203Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DownArrowIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.832 7.50065L9.9987 13.334L4.16536 7.50065"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TableFormateUp = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 19H20"
        stroke="#19110B"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 22L17 16"
        stroke="#19110B"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g clipPath="url(#clip0_0_1)">
        <rect
          x="22.5"
          y="10.5"
          width="14.125"
          height="6"
          rx="0.5"
          transform="rotate(-180 22.5 10.5)"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <rect
          x="15.625"
          y="10.5"
          width="14.125"
          height="6"
          rx="0.5"
          transform="rotate(-180 15.625 10.5)"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <path
          d="M7 15L7 27"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 17L7 15L9 17"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_1">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="matrix(-1 0 0 -1 24 24)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export const TableFormateRight = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1150_186495)">
        <path
          // eslint-disable-next-line max-len
          d="M3 17.35C2.64101 17.35 2.35 17.641 2.35 18C2.35 18.359 2.64101 18.65 3 18.65V17.35ZM9 18.65C9.35898 18.65 9.65 18.359 9.65 18C9.65 17.641 9.35898 17.35 9 17.35V18.65ZM3 18.65H9V17.35H3V18.65Z"
          fill="#19110B"
        />
        <path
          // eslint-disable-next-line max-len
          d="M5.35 21C5.35 21.359 5.64102 21.65 6 21.65C6.35899 21.65 6.65 21.359 6.65 21H5.35ZM6.65 15C6.65 14.641 6.35899 14.35 6 14.35C5.64101 14.35 5.35 14.641 5.35 15L6.65 15ZM6.65 21L6.65 15L5.35 15L5.35 21H6.65Z"
          fill="#19110B"
        />
        <rect
          x="13.5"
          y="22.5"
          width="14.125"
          height="6"
          rx="0.5"
          transform="rotate(-90 13.5 22.5)"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <rect
          x="13.5"
          y="15.625"
          width="14.125"
          height="6"
          rx="0.5"
          transform="rotate(-90 13.5 15.625)"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <path
          d="M9 8L-3 8"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 6L9 8L7 10"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1150_186495">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="matrix(0 -1 1 0 0 24)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export const TableFormateDown = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1150_186507)">
        <path
          // eslint-disable-next-line max-len
          d="M16 4.35C15.641 4.35 15.35 4.64101 15.35 5C15.35 5.35899 15.641 5.65 16 5.65V4.35ZM22 5.65C22.359 5.65 22.65 5.35899 22.65 5C22.65 4.64101 22.359 4.35 22 4.35V5.65ZM16 5.65H22V4.35H16V5.65Z"
          fill="#19110B"
        />
        <path
          // eslint-disable-next-line max-len
          d="M18.35 8C18.35 8.35898 18.641 8.65 19 8.65C19.359 8.65 19.65 8.35898 19.65 8H18.35ZM19.65 2C19.65 1.64101 19.359 1.35 19 1.35C18.641 1.35 18.35 1.64101 18.35 2L19.65 2ZM19.65 8L19.65 2L18.35 2L18.35 8H19.65Z"
          fill="#19110B"
        />
        <rect
          x="1.5"
          y="13.5"
          width="14.125"
          height="6"
          rx="0.5"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <rect
          x="8.375"
          y="13.5"
          width="14.125"
          height="6"
          rx="0.5"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <path
          d="M9 9L9 -3"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 7L9 9L7 7"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1150_186507">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export const TableFormateLeft = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1150_296143)">
        <path
          // eslint-disable-next-line max-len
          d="M16 14.35C15.641 14.35 15.35 14.641 15.35 15C15.35 15.359 15.641 15.65 16 15.65V14.35ZM22 15.65C22.359 15.65 22.65 15.359 22.65 15C22.65 14.641 22.359 14.35 22 14.35V15.65ZM16 15.65H22V14.35H16V15.65Z"
          fill="#19110B"
        />
        <path
          // eslint-disable-next-line max-len
          d="M18.35 18C18.35 18.359 18.641 18.65 19 18.65C19.359 18.65 19.65 18.359 19.65 18H18.35ZM19.65 12C19.65 11.641 19.359 11.35 19 11.35C18.641 11.35 18.35 11.641 18.35 12L19.65 12ZM19.65 18L19.65 12L18.35 12L18.35 18H19.65Z"
          fill="#19110B"
        />
        <rect
          x="10.5"
          y="1.5"
          width="14.125"
          height="6"
          rx="0.5"
          transform="rotate(90 10.5 1.5)"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <rect
          x="10.5"
          y="8.375"
          width="14.125"
          height="6"
          rx="0.5"
          transform="rotate(90 10.5 8.375)"
          stroke="#19110B"
          strokeLinejoin="round"
        />
        <path
          d="M15 6L27 6"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 8L15 6L17 4"
          stroke="#19110B"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1150_296143">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="matrix(0 1 -1 0 24 0)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export const TableCellSpacing = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.5"
        y="7.5"
        width="10"
        height="6"
        rx="0.5"
        stroke="#19110B"
        strokeLinejoin="round"
      />
      <rect
        x="9.5"
        y="10.5"
        width="10"
        height="6"
        rx="0.5"
        stroke="#19110B"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TableCellPadding = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="7.5" width="10" height="6" rx="0.5" stroke="#19110B" />
      <rect x="13.5" y="10.5" width="10" height="6" rx="0.5" stroke="#19110B" />
    </svg>
  );
};
export const TableBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M17.1875 2.1875H2.8125C2.4668 2.1875 2.1875 2.4668 2.1875 2.8125V17.1875C2.1875 17.5332 2.4668 17.8125 2.8125 17.8125H17.1875C17.5332 17.8125 17.8125 17.5332 17.8125 17.1875V2.8125C17.8125 2.4668 17.5332 2.1875 17.1875 2.1875ZM16.4062 16.4062H10.7031H9.29688H3.59375V10.7031V9.29688V3.59375H9.29688H10.7031H16.4062V9.29688V10.7031V16.4062ZM9.45312 7.14844H10.5469C10.6328 7.14844 10.7031 7.07812 10.7031 6.99219V5.89844C10.7031 5.8125 10.6328 5.74219 10.5469 5.74219H9.45312C9.36719 5.74219 9.29688 5.8125 9.29688 5.89844V6.99219C9.29688 7.07812 9.36719 7.14844 9.45312 7.14844ZM5.89844 10.7031H6.99219C7.07812 10.7031 7.14844 10.6328 7.14844 10.5469V9.45312C7.14844 9.36719 7.07812 9.29688 6.99219 9.29688H5.89844C5.8125 9.29688 5.74219 9.36719 5.74219 9.45312V10.5469C5.74219 10.6328 5.8125 10.7031 5.89844 10.7031ZM13.0078 10.7031H14.1016C14.1875 10.7031 14.2578 10.6328 14.2578 10.5469V9.45312C14.2578 9.36719 14.1875 9.29688 14.1016 9.29688H13.0078C12.9219 9.29688 12.8516 9.36719 12.8516 9.45312V10.5469C12.8516 10.6328 12.9219 10.7031 13.0078 10.7031ZM9.45312 10.7031H10.5469C10.6328 10.7031 10.7031 10.6328 10.7031 10.5469V9.45312C10.7031 9.36719 10.6328 9.29688 10.5469 9.29688H9.45312C9.36719 9.29688 9.29688 9.36719 9.29688 9.45312V10.5469C9.29688 10.6328 9.36719 10.7031 9.45312 10.7031ZM9.45312 14.2578H10.5469C10.6328 14.2578 10.7031 14.1875 10.7031 14.1016V13.0078C10.7031 12.9219 10.6328 12.8516 10.5469 12.8516H9.45312C9.36719 12.8516 9.29688 12.9219 9.29688 13.0078V14.1016C9.29688 14.1875 9.36719 14.2578 9.45312 14.2578Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M10.7031 3.59375H9.29688V5.89844C9.29688 5.8125 9.36719 5.74219 9.45312 5.74219H10.5469C10.6328 5.74219 10.7031 5.8125 10.7031 5.89844V3.59375Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M10.5469 7.14844H9.45312C9.36719 7.14844 9.29688 7.07812 9.29688 6.99219V9.29688V9.45312C9.29688 9.36719 9.36719 9.29688 9.45312 9.29688H10.5469C10.6328 9.29688 10.7031 9.36719 10.7031 9.45312V9.29688V6.99219C10.7031 7.07812 10.6328 7.14844 10.5469 7.14844Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M10.5469 10.7031H9.45312C9.36719 10.7031 9.29688 10.6328 9.29688 10.5469V10.7031V13.0078C9.29688 12.9219 9.36719 12.8516 9.45312 12.8516H10.5469C10.6328 12.8516 10.7031 12.9219 10.7031 13.0078V10.7031V10.5469C10.7031 10.6328 10.6328 10.7031 10.5469 10.7031Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M9.29688 16.4062H10.7031V14.1016C10.7031 14.1875 10.6328 14.2578 10.5469 14.2578H9.45312C9.36719 14.2578 9.29688 14.1875 9.29688 14.1016V16.4062Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M3.59375 9.29688V10.7031H5.89844C5.8125 10.7031 5.74219 10.6328 5.74219 10.5469V9.45312C5.74219 9.36719 5.8125 9.29688 5.89844 9.29688H3.59375Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M7.14844 10.5469C7.14844 10.6328 7.07812 10.7031 6.99219 10.7031H9.29688V10.5469V9.45312V9.29688H6.99219C7.07812 9.29688 7.14844 9.36719 7.14844 9.45312V10.5469Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M12.8516 9.45312C12.8516 9.36719 12.9219 9.29688 13.0078 9.29688H10.7031V9.45312V10.5469V10.7031H13.0078C12.9219 10.7031 12.8516 10.6328 12.8516 10.5469V9.45312Z"
        fill="#19110B"
      />
      <path
        // eslint-disable-next-line max-len
        d="M14.2578 10.5469C14.2578 10.6328 14.1875 10.7031 14.1016 10.7031H16.4062V9.29688H14.1016C14.1875 9.29688 14.2578 9.36719 14.2578 9.45312V10.5469Z"
        fill="#19110B"
      />
    </svg>
  );
};
export const TableOuterBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M17.1875 2.1875H2.8125C2.4668 2.1875 2.1875 2.4668 2.1875 2.8125V17.1875C2.1875 17.5332 2.4668 17.8125 2.8125 17.8125H17.1875C17.5332 17.8125 17.8125 17.5332 17.8125 17.1875V2.8125C17.8125 2.4668 17.5332 2.1875 17.1875 2.1875ZM16.4062 16.4062H3.59375V3.59375H16.4062V16.4062ZM9.45312 7.14844H10.5469C10.6328 7.14844 10.7031 7.07812 10.7031 6.99219V5.89844C10.7031 5.8125 10.6328 5.74219 10.5469 5.74219H9.45312C9.36719 5.74219 9.29688 5.8125 9.29688 5.89844V6.99219C9.29688 7.07812 9.36719 7.14844 9.45312 7.14844ZM5.89844 10.7031H6.99219C7.07812 10.7031 7.14844 10.6328 7.14844 10.5469V9.45312C7.14844 9.36719 7.07812 9.29688 6.99219 9.29688H5.89844C5.8125 9.29688 5.74219 9.36719 5.74219 9.45312V10.5469C5.74219 10.6328 5.8125 10.7031 5.89844 10.7031ZM13.0078 10.7031H14.1016C14.1875 10.7031 14.2578 10.6328 14.2578 10.5469V9.45312C14.2578 9.36719 14.1875 9.29688 14.1016 9.29688H13.0078C12.9219 9.29688 12.8516 9.36719 12.8516 9.45312V10.5469C12.8516 10.6328 12.9219 10.7031 13.0078 10.7031ZM9.45312 10.7031H10.5469C10.6328 10.7031 10.7031 10.6328 10.7031 10.5469V9.45312C10.7031 9.36719 10.6328 9.29688 10.5469 9.29688H9.45312C9.36719 9.29688 9.29688 9.36719 9.29688 9.45312V10.5469C9.29688 10.6328 9.36719 10.7031 9.45312 10.7031ZM9.45312 14.2578H10.5469C10.6328 14.2578 10.7031 14.1875 10.7031 14.1016V13.0078C10.7031 12.9219 10.6328 12.8516 10.5469 12.8516H9.45312C9.36719 12.8516 9.29688 12.9219 9.29688 13.0078V14.1016C9.29688 14.1875 9.36719 14.2578 9.45312 14.2578Z"
        fill="#19110B"
      />
    </svg>
  );
};

export const TableInnerBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M17.0312 9.29688H10.7031V2.8125H9.29688V9.29688H2.96875C2.88281 9.29688 2.8125 9.36719 2.8125 9.45312V10.5469C2.8125 10.6328 2.88281 10.7031 2.96875 10.7031H9.29688V17.1875H10.7031V10.7031H17.0312C17.1172 10.7031 17.1875 10.6328 17.1875 10.5469V9.45312C17.1875 9.36719 17.1172 9.29688 17.0312 9.29688ZM17.0312 6.05469H15.9375C15.8516 6.05469 15.7812 6.125 15.7812 6.21094V7.30469C15.7812 7.39062 15.8516 7.46094 15.9375 7.46094H17.0312C17.1172 7.46094 17.1875 7.39062 17.1875 7.30469V6.21094C17.1875 6.125 17.1172 6.05469 17.0312 6.05469ZM17.0312 15.7812H15.9375C15.8516 15.7812 15.7812 15.8516 15.7812 15.9375V17.0312C15.7812 17.1172 15.8516 17.1875 15.9375 17.1875H17.0312C17.1172 17.1875 17.1875 17.1172 17.1875 17.0312V15.9375C17.1875 15.8516 17.1172 15.7812 17.0312 15.7812ZM17.0312 2.8125H15.9375C15.8516 2.8125 15.7812 2.88281 15.7812 2.96875V4.0625C15.7812 4.14844 15.8516 4.21875 15.9375 4.21875H17.0312C17.1172 4.21875 17.1875 4.14844 17.1875 4.0625V2.96875C17.1875 2.88281 17.1172 2.8125 17.0312 2.8125ZM17.0312 12.5391H15.9375C15.8516 12.5391 15.7812 12.6094 15.7812 12.6953V13.7891C15.7812 13.875 15.8516 13.9453 15.9375 13.9453H17.0312C17.1172 13.9453 17.1875 13.875 17.1875 13.7891V12.6953C17.1875 12.6094 17.1172 12.5391 17.0312 12.5391ZM12.6953 4.21875H13.7891C13.875 4.21875 13.9453 4.14844 13.9453 4.0625V2.96875C13.9453 2.88281 13.875 2.8125 13.7891 2.8125H12.6953C12.6094 2.8125 12.5391 2.88281 12.5391 2.96875V4.0625C12.5391 4.14844 12.6094 4.21875 12.6953 4.21875ZM13.7891 15.7812H12.6953C12.6094 15.7812 12.5391 15.8516 12.5391 15.9375V17.0312C12.5391 17.1172 12.6094 17.1875 12.6953 17.1875H13.7891C13.875 17.1875 13.9453 17.1172 13.9453 17.0312V15.9375C13.9453 15.8516 13.875 15.7812 13.7891 15.7812ZM7.30469 15.7812H6.21094C6.125 15.7812 6.05469 15.8516 6.05469 15.9375V17.0312C6.05469 17.1172 6.125 17.1875 6.21094 17.1875H7.30469C7.39062 17.1875 7.46094 17.1172 7.46094 17.0312V15.9375C7.46094 15.8516 7.39062 15.7812 7.30469 15.7812ZM6.21094 4.21875H7.30469C7.39062 4.21875 7.46094 4.14844 7.46094 4.0625V2.96875C7.46094 2.88281 7.39062 2.8125 7.30469 2.8125H6.21094C6.125 2.8125 6.05469 2.88281 6.05469 2.96875V4.0625C6.05469 4.14844 6.125 4.21875 6.21094 4.21875ZM2.96875 4.21875H4.0625C4.14844 4.21875 4.21875 4.14844 4.21875 4.0625V2.96875C4.21875 2.88281 4.14844 2.8125 4.0625 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V4.0625C2.8125 4.14844 2.88281 4.21875 2.96875 4.21875ZM4.0625 15.7812H2.96875C2.88281 15.7812 2.8125 15.8516 2.8125 15.9375V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H4.0625C4.14844 17.1875 4.21875 17.1172 4.21875 17.0312V15.9375C4.21875 15.8516 4.14844 15.7812 4.0625 15.7812ZM2.96875 7.46094H4.0625C4.14844 7.46094 4.21875 7.39062 4.21875 7.30469V6.21094C4.21875 6.125 4.14844 6.05469 4.0625 6.05469H2.96875C2.88281 6.05469 2.8125 6.125 2.8125 6.21094V7.30469C2.8125 7.39062 2.88281 7.46094 2.96875 7.46094ZM4.0625 12.5391H2.96875C2.88281 12.5391 2.8125 12.6094 2.8125 12.6953V13.7891C2.8125 13.875 2.88281 13.9453 2.96875 13.9453H4.0625C4.14844 13.9453 4.21875 13.875 4.21875 13.7891V12.6953C4.21875 12.6094 4.14844 12.5391 4.0625 12.5391Z"
        fill="#19110B"
      />
    </svg>
  );
};
export const TableTopBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M17.0312 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V4.0625C2.8125 4.14844 2.88281 4.21875 2.96875 4.21875H17.0312C17.1172 4.21875 17.1875 4.14844 17.1875 4.0625V2.96875C17.1875 2.88281 17.1172 2.8125 17.0312 2.8125ZM4.0625 6.05469H2.96875C2.88281 6.05469 2.8125 6.125 2.8125 6.21094V7.30469C2.8125 7.39062 2.88281 7.46094 2.96875 7.46094H4.0625C4.14844 7.46094 4.21875 7.39062 4.21875 7.30469V6.21094C4.21875 6.125 4.14844 6.05469 4.0625 6.05469ZM4.0625 15.7812H2.96875C2.88281 15.7812 2.8125 15.8516 2.8125 15.9375V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H4.0625C4.14844 17.1875 4.21875 17.1172 4.21875 17.0312V15.9375C4.21875 15.8516 4.14844 15.7812 4.0625 15.7812ZM4.0625 9.29688H2.96875C2.88281 9.29688 2.8125 9.36719 2.8125 9.45312V10.5469C2.8125 10.6328 2.88281 10.7031 2.96875 10.7031H4.0625C4.14844 10.7031 4.21875 10.6328 4.21875 10.5469V9.45312C4.21875 9.36719 4.14844 9.29688 4.0625 9.29688ZM4.0625 12.5391H2.96875C2.88281 12.5391 2.8125 12.6094 2.8125 12.6953V13.7891C2.8125 13.875 2.88281 13.9453 2.96875 13.9453H4.0625C4.14844 13.9453 4.21875 13.875 4.21875 13.7891V12.6953C4.21875 12.6094 4.14844 12.5391 4.0625 12.5391ZM7.30469 9.29688H6.21094C6.125 9.29688 6.05469 9.36719 6.05469 9.45312V10.5469C6.05469 10.6328 6.125 10.7031 6.21094 10.7031H7.30469C7.39062 10.7031 7.46094 10.6328 7.46094 10.5469V9.45312C7.46094 9.36719 7.39062 9.29688 7.30469 9.29688ZM7.30469 15.7812H6.21094C6.125 15.7812 6.05469 15.8516 6.05469 15.9375V17.0312C6.05469 17.1172 6.125 17.1875 6.21094 17.1875H7.30469C7.39062 17.1875 7.46094 17.1172 7.46094 17.0312V15.9375C7.46094 15.8516 7.39062 15.7812 7.30469 15.7812ZM13.7891 15.7812H12.6953C12.6094 15.7812 12.5391 15.8516 12.5391 15.9375V17.0312C12.5391 17.1172 12.6094 17.1875 12.6953 17.1875H13.7891C13.875 17.1875 13.9453 17.1172 13.9453 17.0312V15.9375C13.9453 15.8516 13.875 15.7812 13.7891 15.7812ZM13.7891 9.29688H12.6953C12.6094 9.29688 12.5391 9.36719 12.5391 9.45312V10.5469C12.5391 10.6328 12.6094 10.7031 12.6953 10.7031H13.7891C13.875 10.7031 13.9453 10.6328 13.9453 10.5469V9.45312C13.9453 9.36719 13.875 9.29688 13.7891 9.29688ZM17.0312 9.29688H15.9375C15.8516 9.29688 15.7812 9.36719 15.7812 9.45312V10.5469C15.7812 10.6328 15.8516 10.7031 15.9375 10.7031H17.0312C17.1172 10.7031 17.1875 10.6328 17.1875 10.5469V9.45312C17.1875 9.36719 17.1172 9.29688 17.0312 9.29688ZM10.5469 9.29688H9.45312C9.36719 9.29688 9.29688 9.36719 9.29688 9.45312V10.5469C9.29688 10.6328 9.36719 10.7031 9.45312 10.7031H10.5469C10.6328 10.7031 10.7031 10.6328 10.7031 10.5469V9.45312C10.7031 9.36719 10.6328 9.29688 10.5469 9.29688ZM17.0312 15.7812H15.9375C15.8516 15.7812 15.7812 15.8516 15.7812 15.9375V17.0312C15.7812 17.1172 15.8516 17.1875 15.9375 17.1875H17.0312C17.1172 17.1875 17.1875 17.1172 17.1875 17.0312V15.9375C17.1875 15.8516 17.1172 15.7812 17.0312 15.7812ZM10.5469 15.7812H9.45312C9.36719 15.7812 9.29688 15.8516 9.29688 15.9375V17.0312C9.29688 17.1172 9.36719 17.1875 9.45312 17.1875H10.5469C10.6328 17.1875 10.7031 17.1172 10.7031 17.0312V15.9375C10.7031 15.8516 10.6328 15.7812 10.5469 15.7812ZM17.0312 6.05469H15.9375C15.8516 6.05469 15.7812 6.125 15.7812 6.21094V7.30469C15.7812 7.39062 15.8516 7.46094 15.9375 7.46094H17.0312C17.1172 7.46094 17.1875 7.39062 17.1875 7.30469V6.21094C17.1875 6.125 17.1172 6.05469 17.0312 6.05469ZM10.5469 6.05469H9.45312C9.36719 6.05469 9.29688 6.125 9.29688 6.21094V7.30469C9.29688 7.39062 9.36719 7.46094 9.45312 7.46094H10.5469C10.6328 7.46094 10.7031 7.39062 10.7031 7.30469V6.21094C10.7031 6.125 10.6328 6.05469 10.5469 6.05469ZM17.0312 12.5391H15.9375C15.8516 12.5391 15.7812 12.6094 15.7812 12.6953V13.7891C15.7812 13.875 15.8516 13.9453 15.9375 13.9453H17.0312C17.1172 13.9453 17.1875 13.875 17.1875 13.7891V12.6953C17.1875 12.6094 17.1172 12.5391 17.0312 12.5391ZM10.5469 12.5391H9.45312C9.36719 12.5391 9.29688 12.6094 9.29688 12.6953V13.7891C9.29688 13.875 9.36719 13.9453 9.45312 13.9453H10.5469C10.6328 13.9453 10.7031 13.875 10.7031 13.7891V12.6953C10.7031 12.6094 10.6328 12.5391 10.5469 12.5391Z"
        fill="#19110B"
      />
    </svg>
  );
};

export const TableHorizontalBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M17.0312 9.29688H2.96875C2.88281 9.29688 2.8125 9.36719 2.8125 9.45312V10.5469C2.8125 10.6328 2.88281 10.7031 2.96875 10.7031H17.0312C17.1172 10.7031 17.1875 10.6328 17.1875 10.5469V9.45312C17.1875 9.36719 17.1172 9.29688 17.0312 9.29688ZM17.0312 6.05469H15.9375C15.8516 6.05469 15.7812 6.125 15.7812 6.21094V7.30469C15.7812 7.39062 15.8516 7.46094 15.9375 7.46094H17.0312C17.1172 7.46094 17.1875 7.39062 17.1875 7.30469V6.21094C17.1875 6.125 17.1172 6.05469 17.0312 6.05469ZM17.0312 15.7812H15.9375C15.8516 15.7812 15.7812 15.8516 15.7812 15.9375V17.0312C15.7812 17.1172 15.8516 17.1875 15.9375 17.1875H17.0312C17.1172 17.1875 17.1875 17.1172 17.1875 17.0312V15.9375C17.1875 15.8516 17.1172 15.7812 17.0312 15.7812ZM17.0312 2.8125H15.9375C15.8516 2.8125 15.7812 2.88281 15.7812 2.96875V4.0625C15.7812 4.14844 15.8516 4.21875 15.9375 4.21875H17.0312C17.1172 4.21875 17.1875 4.14844 17.1875 4.0625V2.96875C17.1875 2.88281 17.1172 2.8125 17.0312 2.8125ZM17.0312 12.5391H15.9375C15.8516 12.5391 15.7812 12.6094 15.7812 12.6953V13.7891C15.7812 13.875 15.8516 13.9453 15.9375 13.9453H17.0312C17.1172 13.9453 17.1875 13.875 17.1875 13.7891V12.6953C17.1875 12.6094 17.1172 12.5391 17.0312 12.5391ZM12.6953 4.21875H13.7891C13.875 4.21875 13.9453 4.14844 13.9453 4.0625V2.96875C13.9453 2.88281 13.875 2.8125 13.7891 2.8125H12.6953C12.6094 2.8125 12.5391 2.88281 12.5391 2.96875V4.0625C12.5391 4.14844 12.6094 4.21875 12.6953 4.21875ZM13.7891 15.7812H12.6953C12.6094 15.7812 12.5391 15.8516 12.5391 15.9375V17.0312C12.5391 17.1172 12.6094 17.1875 12.6953 17.1875H13.7891C13.875 17.1875 13.9453 17.1172 13.9453 17.0312V15.9375C13.9453 15.8516 13.875 15.7812 13.7891 15.7812ZM7.30469 15.7812H6.21094C6.125 15.7812 6.05469 15.8516 6.05469 15.9375V17.0312C6.05469 17.1172 6.125 17.1875 6.21094 17.1875H7.30469C7.39062 17.1875 7.46094 17.1172 7.46094 17.0312V15.9375C7.46094 15.8516 7.39062 15.7812 7.30469 15.7812ZM6.21094 4.21875H7.30469C7.39062 4.21875 7.46094 4.14844 7.46094 4.0625V2.96875C7.46094 2.88281 7.39062 2.8125 7.30469 2.8125H6.21094C6.125 2.8125 6.05469 2.88281 6.05469 2.96875V4.0625C6.05469 4.14844 6.125 4.21875 6.21094 4.21875ZM2.96875 4.21875H4.0625C4.14844 4.21875 4.21875 4.14844 4.21875 4.0625V2.96875C4.21875 2.88281 4.14844 2.8125 4.0625 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V4.0625C2.8125 4.14844 2.88281 4.21875 2.96875 4.21875ZM9.45312 4.21875H10.5469C10.6328 4.21875 10.7031 4.14844 10.7031 4.0625V2.96875C10.7031 2.88281 10.6328 2.8125 10.5469 2.8125H9.45312C9.36719 2.8125 9.29688 2.88281 9.29688 2.96875V4.0625C9.29688 4.14844 9.36719 4.21875 9.45312 4.21875ZM4.0625 15.7812H2.96875C2.88281 15.7812 2.8125 15.8516 2.8125 15.9375V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H4.0625C4.14844 17.1875 4.21875 17.1172 4.21875 17.0312V15.9375C4.21875 15.8516 4.14844 15.7812 4.0625 15.7812ZM10.5469 15.7812H9.45312C9.36719 15.7812 9.29688 15.8516 9.29688 15.9375V17.0312C9.29688 17.1172 9.36719 17.1875 9.45312 17.1875H10.5469C10.6328 17.1875 10.7031 17.1172 10.7031 17.0312V15.9375C10.7031 15.8516 10.6328 15.7812 10.5469 15.7812ZM2.96875 7.46094H4.0625C4.14844 7.46094 4.21875 7.39062 4.21875 7.30469V6.21094C4.21875 6.125 4.14844 6.05469 4.0625 6.05469H2.96875C2.88281 6.05469 2.8125 6.125 2.8125 6.21094V7.30469C2.8125 7.39062 2.88281 7.46094 2.96875 7.46094ZM9.45312 7.46094H10.5469C10.6328 7.46094 10.7031 7.39062 10.7031 7.30469V6.21094C10.7031 6.125 10.6328 6.05469 10.5469 6.05469H9.45312C9.36719 6.05469 9.29688 6.125 9.29688 6.21094V7.30469C9.29688 7.39062 9.36719 7.46094 9.45312 7.46094ZM4.0625 12.5391H2.96875C2.88281 12.5391 2.8125 12.6094 2.8125 12.6953V13.7891C2.8125 13.875 2.88281 13.9453 2.96875 13.9453H4.0625C4.14844 13.9453 4.21875 13.875 4.21875 13.7891V12.6953C4.21875 12.6094 4.14844 12.5391 4.0625 12.5391ZM10.5469 12.5391H9.45312C9.36719 12.5391 9.29688 12.6094 9.29688 12.6953V13.7891C9.29688 13.875 9.36719 13.9453 9.45312 13.9453H10.5469C10.6328 13.9453 10.7031 13.875 10.7031 13.7891V12.6953C10.7031 12.6094 10.6328 12.5391 10.5469 12.5391Z"
        fill="#19110B"
      />
    </svg>
  );
};
export const TableBottomBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M17.0312 15.7812H2.96875C2.88281 15.7812 2.8125 15.8516 2.8125 15.9375V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H17.0312C17.1172 17.1875 17.1875 17.1172 17.1875 17.0312V15.9375C17.1875 15.8516 17.1172 15.7812 17.0312 15.7812ZM2.96875 13.9453H4.0625C4.14844 13.9453 4.21875 13.875 4.21875 13.7891V12.6953C4.21875 12.6094 4.14844 12.5391 4.0625 12.5391H2.96875C2.88281 12.5391 2.8125 12.6094 2.8125 12.6953V13.7891C2.8125 13.875 2.88281 13.9453 2.96875 13.9453ZM2.96875 4.21875H4.0625C4.14844 4.21875 4.21875 4.14844 4.21875 4.0625V2.96875C4.21875 2.88281 4.14844 2.8125 4.0625 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V4.0625C2.8125 4.14844 2.88281 4.21875 2.96875 4.21875ZM2.96875 10.7031H4.0625C4.14844 10.7031 4.21875 10.6328 4.21875 10.5469V9.45312C4.21875 9.36719 4.14844 9.29688 4.0625 9.29688H2.96875C2.88281 9.29688 2.8125 9.36719 2.8125 9.45312V10.5469C2.8125 10.6328 2.88281 10.7031 2.96875 10.7031ZM2.96875 7.46094H4.0625C4.14844 7.46094 4.21875 7.39062 4.21875 7.30469V6.21094C4.21875 6.125 4.14844 6.05469 4.0625 6.05469H2.96875C2.88281 6.05469 2.8125 6.125 2.8125 6.21094V7.30469C2.8125 7.39062 2.88281 7.46094 2.96875 7.46094ZM6.21094 10.7031H7.30469C7.39062 10.7031 7.46094 10.6328 7.46094 10.5469V9.45312C7.46094 9.36719 7.39062 9.29688 7.30469 9.29688H6.21094C6.125 9.29688 6.05469 9.36719 6.05469 9.45312V10.5469C6.05469 10.6328 6.125 10.7031 6.21094 10.7031ZM6.21094 4.21875H7.30469C7.39062 4.21875 7.46094 4.14844 7.46094 4.0625V2.96875C7.46094 2.88281 7.39062 2.8125 7.30469 2.8125H6.21094C6.125 2.8125 6.05469 2.88281 6.05469 2.96875V4.0625C6.05469 4.14844 6.125 4.21875 6.21094 4.21875ZM12.6953 4.21875H13.7891C13.875 4.21875 13.9453 4.14844 13.9453 4.0625V2.96875C13.9453 2.88281 13.875 2.8125 13.7891 2.8125H12.6953C12.6094 2.8125 12.5391 2.88281 12.5391 2.96875V4.0625C12.5391 4.14844 12.6094 4.21875 12.6953 4.21875ZM12.6953 10.7031H13.7891C13.875 10.7031 13.9453 10.6328 13.9453 10.5469V9.45312C13.9453 9.36719 13.875 9.29688 13.7891 9.29688H12.6953C12.6094 9.29688 12.5391 9.36719 12.5391 9.45312V10.5469C12.5391 10.6328 12.6094 10.7031 12.6953 10.7031ZM17.0312 9.29688H15.9375C15.8516 9.29688 15.7812 9.36719 15.7812 9.45312V10.5469C15.7812 10.6328 15.8516 10.7031 15.9375 10.7031H17.0312C17.1172 10.7031 17.1875 10.6328 17.1875 10.5469V9.45312C17.1875 9.36719 17.1172 9.29688 17.0312 9.29688ZM9.45312 10.7031H10.5469C10.6328 10.7031 10.7031 10.6328 10.7031 10.5469V9.45312C10.7031 9.36719 10.6328 9.29688 10.5469 9.29688H9.45312C9.36719 9.29688 9.29688 9.36719 9.29688 9.45312V10.5469C9.29688 10.6328 9.36719 10.7031 9.45312 10.7031ZM17.0312 2.8125H15.9375C15.8516 2.8125 15.7812 2.88281 15.7812 2.96875V4.0625C15.7812 4.14844 15.8516 4.21875 15.9375 4.21875H17.0312C17.1172 4.21875 17.1875 4.14844 17.1875 4.0625V2.96875C17.1875 2.88281 17.1172 2.8125 17.0312 2.8125ZM9.45312 4.21875H10.5469C10.6328 4.21875 10.7031 4.14844 10.7031 4.0625V2.96875C10.7031 2.88281 10.6328 2.8125 10.5469 2.8125H9.45312C9.36719 2.8125 9.29688 2.88281 9.29688 2.96875V4.0625C9.29688 4.14844 9.36719 4.21875 9.45312 4.21875ZM17.0312 12.5391H15.9375C15.8516 12.5391 15.7812 12.6094 15.7812 12.6953V13.7891C15.7812 13.875 15.8516 13.9453 15.9375 13.9453H17.0312C17.1172 13.9453 17.1875 13.875 17.1875 13.7891V12.6953C17.1875 12.6094 17.1172 12.5391 17.0312 12.5391ZM9.45312 13.9453H10.5469C10.6328 13.9453 10.7031 13.875 10.7031 13.7891V12.6953C10.7031 12.6094 10.6328 12.5391 10.5469 12.5391H9.45312C9.36719 12.5391 9.29688 12.6094 9.29688 12.6953V13.7891C9.29688 13.875 9.36719 13.9453 9.45312 13.9453ZM17.0312 6.05469H15.9375C15.8516 6.05469 15.7812 6.125 15.7812 6.21094V7.30469C15.7812 7.39062 15.8516 7.46094 15.9375 7.46094H17.0312C17.1172 7.46094 17.1875 7.39062 17.1875 7.30469V6.21094C17.1875 6.125 17.1172 6.05469 17.0312 6.05469ZM9.45312 7.46094H10.5469C10.6328 7.46094 10.7031 7.39062 10.7031 7.30469V6.21094C10.7031 6.125 10.6328 6.05469 10.5469 6.05469H9.45312C9.36719 6.05469 9.29688 6.125 9.29688 6.21094V7.30469C9.29688 7.39062 9.36719 7.46094 9.45312 7.46094Z"
        fill="#19110B"
      />
    </svg>
  );
};
export const TableLeftBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M4.0625 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H4.0625C4.14844 17.1875 4.21875 17.1172 4.21875 17.0312V2.96875C4.21875 2.88281 4.14844 2.8125 4.0625 2.8125ZM7.30469 2.8125H6.21094C6.125 2.8125 6.05469 2.88281 6.05469 2.96875V4.0625C6.05469 4.14844 6.125 4.21875 6.21094 4.21875H7.30469C7.39062 4.21875 7.46094 4.14844 7.46094 4.0625V2.96875C7.46094 2.88281 7.39062 2.8125 7.30469 2.8125ZM17.0312 2.8125H15.9375C15.8516 2.8125 15.7812 2.88281 15.7812 2.96875V4.0625C15.7812 4.14844 15.8516 4.21875 15.9375 4.21875H17.0312C17.1172 4.21875 17.1875 4.14844 17.1875 4.0625V2.96875C17.1875 2.88281 17.1172 2.8125 17.0312 2.8125ZM10.5469 2.8125H9.45312C9.36719 2.8125 9.29688 2.88281 9.29688 2.96875V4.0625C9.29688 4.14844 9.36719 4.21875 9.45312 4.21875H10.5469C10.6328 4.21875 10.7031 4.14844 10.7031 4.0625V2.96875C10.7031 2.88281 10.6328 2.8125 10.5469 2.8125ZM13.7891 2.8125H12.6953C12.6094 2.8125 12.5391 2.88281 12.5391 2.96875V4.0625C12.5391 4.14844 12.6094 4.21875 12.6953 4.21875H13.7891C13.875 4.21875 13.9453 4.14844 13.9453 4.0625V2.96875C13.9453 2.88281 13.875 2.8125 13.7891 2.8125ZM10.5469 6.05469H9.45312C9.36719 6.05469 9.29688 6.125 9.29688 6.21094V7.30469C9.29688 7.39062 9.36719 7.46094 9.45312 7.46094H10.5469C10.6328 7.46094 10.7031 7.39062 10.7031 7.30469V6.21094C10.7031 6.125 10.6328 6.05469 10.5469 6.05469ZM17.0312 6.05469H15.9375C15.8516 6.05469 15.7812 6.125 15.7812 6.21094V7.30469C15.7812 7.39062 15.8516 7.46094 15.9375 7.46094H17.0312C17.1172 7.46094 17.1875 7.39062 17.1875 7.30469V6.21094C17.1875 6.125 17.1172 6.05469 17.0312 6.05469ZM17.0312 12.5391H15.9375C15.8516 12.5391 15.7812 12.6094 15.7812 12.6953V13.7891C15.7812 13.875 15.8516 13.9453 15.9375 13.9453H17.0312C17.1172 13.9453 17.1875 13.875 17.1875 13.7891V12.6953C17.1875 12.6094 17.1172 12.5391 17.0312 12.5391ZM10.5469 12.5391H9.45312C9.36719 12.5391 9.29688 12.6094 9.29688 12.6953V13.7891C9.29688 13.875 9.36719 13.9453 9.45312 13.9453H10.5469C10.6328 13.9453 10.7031 13.875 10.7031 13.7891V12.6953C10.7031 12.6094 10.6328 12.5391 10.5469 12.5391ZM10.5469 15.7812H9.45312C9.36719 15.7812 9.29688 15.8516 9.29688 15.9375V17.0312C9.29688 17.1172 9.36719 17.1875 9.45312 17.1875H10.5469C10.6328 17.1875 10.7031 17.1172 10.7031 17.0312V15.9375C10.7031 15.8516 10.6328 15.7812 10.5469 15.7812ZM10.5469 9.29688H9.45312C9.36719 9.29688 9.29688 9.36719 9.29688 9.45312V10.5469C9.29688 10.6328 9.36719 10.7031 9.45312 10.7031H10.5469C10.6328 10.7031 10.7031 10.6328 10.7031 10.5469V9.45312C10.7031 9.36719 10.6328 9.29688 10.5469 9.29688ZM17.0312 15.7812H15.9375C15.8516 15.7812 15.7812 15.8516 15.7812 15.9375V17.0312C15.7812 17.1172 15.8516 17.1875 15.9375 17.1875H17.0312C17.1172 17.1875 17.1875 17.1172 17.1875 17.0312V15.9375C17.1875 15.8516 17.1172 15.7812 17.0312 15.7812ZM17.0312 9.29688H15.9375C15.8516 9.29688 15.7812 9.36719 15.7812 9.45312V10.5469C15.7812 10.6328 15.8516 10.7031 15.9375 10.7031H17.0312C17.1172 10.7031 17.1875 10.6328 17.1875 10.5469V9.45312C17.1875 9.36719 17.1172 9.29688 17.0312 9.29688ZM7.30469 15.7812H6.21094C6.125 15.7812 6.05469 15.8516 6.05469 15.9375V17.0312C6.05469 17.1172 6.125 17.1875 6.21094 17.1875H7.30469C7.39062 17.1875 7.46094 17.1172 7.46094 17.0312V15.9375C7.46094 15.8516 7.39062 15.7812 7.30469 15.7812ZM7.30469 9.29688H6.21094C6.125 9.29688 6.05469 9.36719 6.05469 9.45312V10.5469C6.05469 10.6328 6.125 10.7031 6.21094 10.7031H7.30469C7.39062 10.7031 7.46094 10.6328 7.46094 10.5469V9.45312C7.46094 9.36719 7.39062 9.29688 7.30469 9.29688ZM13.7891 15.7812H12.6953C12.6094 15.7812 12.5391 15.8516 12.5391 15.9375V17.0312C12.5391 17.1172 12.6094 17.1875 12.6953 17.1875H13.7891C13.875 17.1875 13.9453 17.1172 13.9453 17.0312V15.9375C13.9453 15.8516 13.875 15.7812 13.7891 15.7812ZM13.7891 9.29688H12.6953C12.6094 9.29688 12.5391 9.36719 12.5391 9.45312V10.5469C12.5391 10.6328 12.6094 10.7031 12.6953 10.7031H13.7891C13.875 10.7031 13.9453 10.6328 13.9453 10.5469V9.45312C13.9453 9.36719 13.875 9.29688 13.7891 9.29688Z"
        fill="#19110B"
      />
    </svg>
  );
};
export const TableVerticalBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M10.5469 2.8125H9.45312C9.36719 2.8125 9.29688 2.88281 9.29688 2.96875V17.0312C9.29688 17.1172 9.36719 17.1875 9.45312 17.1875H10.5469C10.6328 17.1875 10.7031 17.1172 10.7031 17.0312V2.96875C10.7031 2.88281 10.6328 2.8125 10.5469 2.8125ZM7.30469 2.8125H6.21094C6.125 2.8125 6.05469 2.88281 6.05469 2.96875V4.0625C6.05469 4.14844 6.125 4.21875 6.21094 4.21875H7.30469C7.39062 4.21875 7.46094 4.14844 7.46094 4.0625V2.96875C7.46094 2.88281 7.39062 2.8125 7.30469 2.8125ZM17.0312 2.8125H15.9375C15.8516 2.8125 15.7812 2.88281 15.7812 2.96875V4.0625C15.7812 4.14844 15.8516 4.21875 15.9375 4.21875H17.0312C17.1172 4.21875 17.1875 4.14844 17.1875 4.0625V2.96875C17.1875 2.88281 17.1172 2.8125 17.0312 2.8125ZM4.0625 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V4.0625C2.8125 4.14844 2.88281 4.21875 2.96875 4.21875H4.0625C4.14844 4.21875 4.21875 4.14844 4.21875 4.0625V2.96875C4.21875 2.88281 4.14844 2.8125 4.0625 2.8125ZM13.7891 2.8125H12.6953C12.6094 2.8125 12.5391 2.88281 12.5391 2.96875V4.0625C12.5391 4.14844 12.6094 4.21875 12.6953 4.21875H13.7891C13.875 4.21875 13.9453 4.14844 13.9453 4.0625V2.96875C13.9453 2.88281 13.875 2.8125 13.7891 2.8125ZM4.0625 6.05469H2.96875C2.88281 6.05469 2.8125 6.125 2.8125 6.21094V7.30469C2.8125 7.39062 2.88281 7.46094 2.96875 7.46094H4.0625C4.14844 7.46094 4.21875 7.39062 4.21875 7.30469V6.21094C4.21875 6.125 4.14844 6.05469 4.0625 6.05469ZM17.0312 6.05469H15.9375C15.8516 6.05469 15.7812 6.125 15.7812 6.21094V7.30469C15.7812 7.39062 15.8516 7.46094 15.9375 7.46094H17.0312C17.1172 7.46094 17.1875 7.39062 17.1875 7.30469V6.21094C17.1875 6.125 17.1172 6.05469 17.0312 6.05469ZM17.0312 12.5391H15.9375C15.8516 12.5391 15.7812 12.6094 15.7812 12.6953V13.7891C15.7812 13.875 15.8516 13.9453 15.9375 13.9453H17.0312C17.1172 13.9453 17.1875 13.875 17.1875 13.7891V12.6953C17.1875 12.6094 17.1172 12.5391 17.0312 12.5391ZM4.0625 12.5391H2.96875C2.88281 12.5391 2.8125 12.6094 2.8125 12.6953V13.7891C2.8125 13.875 2.88281 13.9453 2.96875 13.9453H4.0625C4.14844 13.9453 4.21875 13.875 4.21875 13.7891V12.6953C4.21875 12.6094 4.14844 12.5391 4.0625 12.5391ZM4.0625 15.7812H2.96875C2.88281 15.7812 2.8125 15.8516 2.8125 15.9375V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H4.0625C4.14844 17.1875 4.21875 17.1172 4.21875 17.0312V15.9375C4.21875 15.8516 4.14844 15.7812 4.0625 15.7812ZM4.0625 9.29688H2.96875C2.88281 9.29688 2.8125 9.36719 2.8125 9.45312V10.5469C2.8125 10.6328 2.88281 10.7031 2.96875 10.7031H4.0625C4.14844 10.7031 4.21875 10.6328 4.21875 10.5469V9.45312C4.21875 9.36719 4.14844 9.29688 4.0625 9.29688ZM17.0312 15.7812H15.9375C15.8516 15.7812 15.7812 15.8516 15.7812 15.9375V17.0312C15.7812 17.1172 15.8516 17.1875 15.9375 17.1875H17.0312C17.1172 17.1875 17.1875 17.1172 17.1875 17.0312V15.9375C17.1875 15.8516 17.1172 15.7812 17.0312 15.7812ZM17.0312 9.29688H15.9375C15.8516 9.29688 15.7812 9.36719 15.7812 9.45312V10.5469C15.7812 10.6328 15.8516 10.7031 15.9375 10.7031H17.0312C17.1172 10.7031 17.1875 10.6328 17.1875 10.5469V9.45312C17.1875 9.36719 17.1172 9.29688 17.0312 9.29688ZM7.30469 15.7812H6.21094C6.125 15.7812 6.05469 15.8516 6.05469 15.9375V17.0312C6.05469 17.1172 6.125 17.1875 6.21094 17.1875H7.30469C7.39062 17.1875 7.46094 17.1172 7.46094 17.0312V15.9375C7.46094 15.8516 7.39062 15.7812 7.30469 15.7812ZM7.30469 9.29688H6.21094C6.125 9.29688 6.05469 9.36719 6.05469 9.45312V10.5469C6.05469 10.6328 6.125 10.7031 6.21094 10.7031H7.30469C7.39062 10.7031 7.46094 10.6328 7.46094 10.5469V9.45312C7.46094 9.36719 7.39062 9.29688 7.30469 9.29688ZM13.7891 15.7812H12.6953C12.6094 15.7812 12.5391 15.8516 12.5391 15.9375V17.0312C12.5391 17.1172 12.6094 17.1875 12.6953 17.1875H13.7891C13.875 17.1875 13.9453 17.1172 13.9453 17.0312V15.9375C13.9453 15.8516 13.875 15.7812 13.7891 15.7812ZM13.7891 9.29688H12.6953C12.6094 9.29688 12.5391 9.36719 12.5391 9.45312V10.5469C12.5391 10.6328 12.6094 10.7031 12.6953 10.7031H13.7891C13.875 10.7031 13.9453 10.6328 13.9453 10.5469V9.45312C13.9453 9.36719 13.875 9.29688 13.7891 9.29688Z"
        fill="#19110B"
      />
    </svg>
  );
};

export const TableRightBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M17.0312 2.8125H15.9375C15.8516 2.8125 15.7812 2.88281 15.7812 2.96875V17.0312C15.7812 17.1172 15.8516 17.1875 15.9375 17.1875H17.0312C17.1172 17.1875 17.1875 17.1172 17.1875 17.0312V2.96875C17.1875 2.88281 17.1172 2.8125 17.0312 2.8125ZM13.7891 2.8125H12.6953C12.6094 2.8125 12.5391 2.88281 12.5391 2.96875V4.0625C12.5391 4.14844 12.6094 4.21875 12.6953 4.21875H13.7891C13.875 4.21875 13.9453 4.14844 13.9453 4.0625V2.96875C13.9453 2.88281 13.875 2.8125 13.7891 2.8125ZM4.0625 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V4.0625C2.8125 4.14844 2.88281 4.21875 2.96875 4.21875H4.0625C4.14844 4.21875 4.21875 4.14844 4.21875 4.0625V2.96875C4.21875 2.88281 4.14844 2.8125 4.0625 2.8125ZM10.5469 2.8125H9.45312C9.36719 2.8125 9.29688 2.88281 9.29688 2.96875V4.0625C9.29688 4.14844 9.36719 4.21875 9.45312 4.21875H10.5469C10.6328 4.21875 10.7031 4.14844 10.7031 4.0625V2.96875C10.7031 2.88281 10.6328 2.8125 10.5469 2.8125ZM7.30469 2.8125H6.21094C6.125 2.8125 6.05469 2.88281 6.05469 2.96875V4.0625C6.05469 4.14844 6.125 4.21875 6.21094 4.21875H7.30469C7.39062 4.21875 7.46094 4.14844 7.46094 4.0625V2.96875C7.46094 2.88281 7.39062 2.8125 7.30469 2.8125ZM10.5469 6.05469H9.45312C9.36719 6.05469 9.29688 6.125 9.29688 6.21094V7.30469C9.29688 7.39062 9.36719 7.46094 9.45312 7.46094H10.5469C10.6328 7.46094 10.7031 7.39062 10.7031 7.30469V6.21094C10.7031 6.125 10.6328 6.05469 10.5469 6.05469ZM4.0625 6.05469H2.96875C2.88281 6.05469 2.8125 6.125 2.8125 6.21094V7.30469C2.8125 7.39062 2.88281 7.46094 2.96875 7.46094H4.0625C4.14844 7.46094 4.21875 7.39062 4.21875 7.30469V6.21094C4.21875 6.125 4.14844 6.05469 4.0625 6.05469ZM4.0625 12.5391H2.96875C2.88281 12.5391 2.8125 12.6094 2.8125 12.6953V13.7891C2.8125 13.875 2.88281 13.9453 2.96875 13.9453H4.0625C4.14844 13.9453 4.21875 13.875 4.21875 13.7891V12.6953C4.21875 12.6094 4.14844 12.5391 4.0625 12.5391ZM10.5469 12.5391H9.45312C9.36719 12.5391 9.29688 12.6094 9.29688 12.6953V13.7891C9.29688 13.875 9.36719 13.9453 9.45312 13.9453H10.5469C10.6328 13.9453 10.7031 13.875 10.7031 13.7891V12.6953C10.7031 12.6094 10.6328 12.5391 10.5469 12.5391ZM10.5469 15.7812H9.45312C9.36719 15.7812 9.29688 15.8516 9.29688 15.9375V17.0312C9.29688 17.1172 9.36719 17.1875 9.45312 17.1875H10.5469C10.6328 17.1875 10.7031 17.1172 10.7031 17.0312V15.9375C10.7031 15.8516 10.6328 15.7812 10.5469 15.7812ZM10.5469 9.29688H9.45312C9.36719 9.29688 9.29688 9.36719 9.29688 9.45312V10.5469C9.29688 10.6328 9.36719 10.7031 9.45312 10.7031H10.5469C10.6328 10.7031 10.7031 10.6328 10.7031 10.5469V9.45312C10.7031 9.36719 10.6328 9.29688 10.5469 9.29688ZM4.0625 15.7812H2.96875C2.88281 15.7812 2.8125 15.8516 2.8125 15.9375V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H4.0625C4.14844 17.1875 4.21875 17.1172 4.21875 17.0312V15.9375C4.21875 15.8516 4.14844 15.7812 4.0625 15.7812ZM4.0625 9.29688H2.96875C2.88281 9.29688 2.8125 9.36719 2.8125 9.45312V10.5469C2.8125 10.6328 2.88281 10.7031 2.96875 10.7031H4.0625C4.14844 10.7031 4.21875 10.6328 4.21875 10.5469V9.45312C4.21875 9.36719 4.14844 9.29688 4.0625 9.29688ZM13.7891 15.7812H12.6953C12.6094 15.7812 12.5391 15.8516 12.5391 15.9375V17.0312C12.5391 17.1172 12.6094 17.1875 12.6953 17.1875H13.7891C13.875 17.1875 13.9453 17.1172 13.9453 17.0312V15.9375C13.9453 15.8516 13.875 15.7812 13.7891 15.7812ZM13.7891 9.29688H12.6953C12.6094 9.29688 12.5391 9.36719 12.5391 9.45312V10.5469C12.5391 10.6328 12.6094 10.7031 12.6953 10.7031H13.7891C13.875 10.7031 13.9453 10.6328 13.9453 10.5469V9.45312C13.9453 9.36719 13.875 9.29688 13.7891 9.29688ZM7.30469 15.7812H6.21094C6.125 15.7812 6.05469 15.8516 6.05469 15.9375V17.0312C6.05469 17.1172 6.125 17.1875 6.21094 17.1875H7.30469C7.39062 17.1875 7.46094 17.1172 7.46094 17.0312V15.9375C7.46094 15.8516 7.39062 15.7812 7.30469 15.7812ZM7.30469 9.29688H6.21094C6.125 9.29688 6.05469 9.36719 6.05469 9.45312V10.5469C6.05469 10.6328 6.125 10.7031 6.21094 10.7031H7.30469C7.39062 10.7031 7.46094 10.6328 7.46094 10.5469V9.45312C7.46094 9.36719 7.39062 9.29688 7.30469 9.29688Z"
        fill="#19110B"
      />
    </svg>
  );
};
export const ClearTableBorder = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7891 2.8125H12.6953C12.6094 2.8125 12.5391 2.88281 12.5391 2.96875V4.0625C12.5391 4.14844 12.6094 4.21875 12.6953 4.21875H13.7891C13.875 4.21875 13.9453 4.14844 13.9453 4.0625V2.96875C13.9453 2.88281 13.875 2.8125 13.7891 2.8125ZM4.0625 2.8125H2.96875C2.88281 2.8125 2.8125 2.88281 2.8125 2.96875V4.0625C2.8125 4.14844 2.88281 4.21875 2.96875 4.21875H4.0625C4.14844 4.21875 4.21875 4.14844 4.21875 4.0625V2.96875C4.21875 2.88281 4.14844 2.8125 4.0625 2.8125ZM10.5469 2.8125H9.45312C9.36719 2.8125 9.29688 2.88281 9.29688 2.96875V4.0625C9.29688 4.14844 9.36719 4.21875 9.45312 4.21875H10.5469C10.6328 4.21875 10.7031 4.14844 10.7031 4.0625V2.96875C10.7031 2.88281 10.6328 2.8125 10.5469 2.8125ZM7.30469 2.8125H6.21094C6.125 2.8125 6.05469 2.88281 6.05469 2.96875V4.0625C6.05469 4.14844 6.125 4.21875 6.21094 4.21875H7.30469C7.39062 4.21875 7.46094 4.14844 7.46094 4.0625V2.96875C7.46094 2.88281 7.39062 2.8125 7.30469 2.8125ZM10.5469 6.05469H9.45312C9.36719 6.05469 9.29688 6.125 9.29688 6.21094V7.30469C9.29688 7.39062 9.36719 7.46094 9.45312 7.46094H10.5469C10.6328 7.46094 10.7031 7.39062 10.7031 7.30469V6.21094C10.7031 6.125 10.6328 6.05469 10.5469 6.05469ZM4.0625 6.05469H2.96875C2.88281 6.05469 2.8125 6.125 2.8125 6.21094V7.30469C2.8125 7.39062 2.88281 7.46094 2.96875 7.46094H4.0625C4.14844 7.46094 4.21875 7.39062 4.21875 7.30469V6.21094C4.21875 6.125 4.14844 6.05469 4.0625 6.05469ZM4.0625 12.5391H2.96875C2.88281 12.5391 2.8125 12.6094 2.8125 12.6953V13.7891C2.8125 13.875 2.88281 13.9453 2.96875 13.9453H4.0625C4.14844 13.9453 4.21875 13.875 4.21875 13.7891V12.6953C4.21875 12.6094 4.14844 12.5391 4.0625 12.5391ZM10.5469 12.5391H9.45312C9.36719 12.5391 9.29688 12.6094 9.29688 12.6953V13.7891C9.29688 13.875 9.36719 13.9453 9.45312 13.9453H10.5469C10.6328 13.9453 10.7031 13.875 10.7031 13.7891V12.6953C10.7031 12.6094 10.6328 12.5391 10.5469 12.5391ZM10.5469 15.7812H9.45312C9.36719 15.7812 9.29688 15.8516 9.29688 15.9375V17.0312C9.29688 17.1172 9.36719 17.1875 9.45312 17.1875H10.5469C10.6328 17.1875 10.7031 17.1172 10.7031 17.0312V15.9375C10.7031 15.8516 10.6328 15.7812 10.5469 15.7812ZM10.5469 9.29688H9.45312C9.36719 9.29688 9.29688 9.36719 9.29688 9.45312V10.5469C9.29688 10.6328 9.36719 10.7031 9.45312 10.7031H10.5469C10.6328 10.7031 10.7031 10.6328 10.7031 10.5469V9.45312C10.7031 9.36719 10.6328 9.29688 10.5469 9.29688ZM4.0625 15.7812H2.96875C2.88281 15.7812 2.8125 15.8516 2.8125 15.9375V17.0312C2.8125 17.1172 2.88281 17.1875 2.96875 17.1875H4.0625C4.14844 17.1875 4.21875 17.1172 4.21875 17.0312V15.9375C4.21875 15.8516 4.14844 15.7812 4.0625 15.7812ZM4.0625 9.29688H2.96875C2.88281 9.29688 2.8125 9.36719 2.8125 9.45312V10.5469C2.8125 10.6328 2.88281 10.7031 2.96875 10.7031H4.0625C4.14844 10.7031 4.21875 10.6328 4.21875 10.5469V9.45312C4.21875 9.36719 4.14844 9.29688 4.0625 9.29688ZM13.7891 15.7812H12.6953C12.6094 15.7812 12.5391 15.8516 12.5391 15.9375V17.0312C12.5391 17.1172 12.6094 17.1875 12.6953 17.1875H13.7891C13.875 17.1875 13.9453 17.1172 13.9453 17.0312V15.9375C13.9453 15.8516 13.875 15.7812 13.7891 15.7812ZM13.7891 9.29688H12.6953C12.6094 9.29688 12.5391 9.36719 12.5391 9.45312V10.5469C12.5391 10.6328 12.6094 10.7031 12.6953 10.7031H13.7891C13.875 10.7031 13.9453 10.6328 13.9453 10.5469V9.45312C13.9453 9.36719 13.875 9.29688 13.7891 9.29688ZM7.30469 15.7812H6.21094C6.125 15.7812 6.05469 15.8516 6.05469 15.9375V17.0312C6.05469 17.1172 6.125 17.1875 6.21094 17.1875H7.30469C7.39062 17.1875 7.46094 17.1172 7.46094 17.0312V15.9375C7.46094 15.8516 7.39062 15.7812 7.30469 15.7812ZM7.30469 9.29688H6.21094C6.125 9.29688 6.05469 9.36719 6.05469 9.45312V10.5469C6.05469 10.6328 6.125 10.7031 6.21094 10.7031H7.30469C7.39062 10.7031 7.46094 10.6328 7.46094 10.5469V9.45312C7.46094 9.36719 7.39062 9.29688 7.30469 9.29688Z"
        fill="#19110B"
      />
      <path
        d="M15.9688 2.8125H17.0625C17.1484 2.8125 17.2188 2.88281 17.2188 2.96875V4.0625C17.2188 4.14844 17.1484 4.21875 17.0625 4.21875H15.9688C15.8828 4.21875 15.8125 4.14844 15.8125 4.0625V2.96875C15.8125 2.88281 15.8828 2.8125 15.9688 2.8125Z"
        fill="#19110B"
      />
      <path
        d="M15.9688 6.05469H17.0625C17.1484 6.05469 17.2188 6.125 17.2188 6.21094V7.30469C17.2188 7.39062 17.1484 7.46094 17.0625 7.46094H15.9688C15.8828 7.46094 15.8125 7.39062 15.8125 7.30469V6.21094C15.8125 6.125 15.8828 6.05469 15.9688 6.05469Z"
        fill="#19110B"
      />
      <path
        d="M15.9688 12.5391H17.0625C17.1484 12.5391 17.2188 12.6094 17.2188 12.6953V13.7891C17.2188 13.875 17.1484 13.9453 17.0625 13.9453H15.9688C15.8828 13.9453 15.8125 13.875 15.8125 13.7891V12.6953C15.8125 12.6094 15.8828 12.5391 15.9688 12.5391Z"
        fill="#19110B"
      />
      <path
        d="M15.9688 15.7812H17.0625C17.1484 15.7812 17.2188 15.8516 17.2188 15.9375V17.0312C17.2188 17.1172 17.1484 17.1875 17.0625 17.1875H15.9688C15.8828 17.1875 15.8125 17.1172 15.8125 17.0312V15.9375C15.8125 15.8516 15.8828 15.7812 15.9688 15.7812Z"
        fill="#19110B"
      />
      <path
        d="M15.9688 9.29688H17.0625C17.1484 9.29688 17.2188 9.36719 17.2188 9.45312V10.5469C17.2188 10.6328 17.1484 10.7031 17.0625 10.7031H15.9688C15.8828 10.7031 15.8125 10.6328 15.8125 10.5469V9.45312C15.8125 9.36719 15.8828 9.29688 15.9688 9.29688Z"
        fill="#19110B"
      />
    </svg>
  );
};
export const DropdownArrow = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.832 7.50065L9.9987 13.334L4.16536 7.50065"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const BarIcon = () => {
  return (
    <svg
      width="12"
      height="9"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.32812 0.664062H10.6615"
        stroke="#19110B"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.32812 3.99609H10.6615"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.32812 7.33203H10.6615"
        stroke="#19110B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DopplerIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M9.02338 14.8633L8.66983 14.5098L9.02338 14.8633ZM9.55791 6.56578L9.91146 6.21222V6.21222L9.55791 6.56578ZM8.83012 5.83799L8.47657 6.19155H8.47657L8.83012 5.83799ZM14.1672 11.1751L13.8137 11.5286L14.1672 11.1751ZM10.2857 4.38242L10.6392 4.02887L10.2857 4.38242ZM11.0135 5.11021L10.6599 5.46376C10.7537 5.55753 10.8809 5.61021 11.0135 5.61021C11.1461 5.61021 11.2733 5.55753 11.367 5.46376L11.0135 5.11021ZM11.9839 4.13983L11.6303 3.78627V3.78627L11.9839 4.13983ZM15.8654 8.02135L15.5118 7.66779H15.5118L15.8654 8.02135ZM14.895 8.99173L14.5414 8.63818C14.3462 8.83344 14.3462 9.15002 14.5414 9.34528L14.895 8.99173ZM15.6228 9.71951L15.2692 10.0731L15.2692 10.0731L15.6228 9.71951ZM5.14186 10.9818L4.78831 10.6283L5.14186 10.9818ZM3.6374 14.9122L3.99095 15.2658H3.99095L3.6374 14.9122ZM4.05654 14.4931L3.70298 14.1395H3.70298L4.05654 14.4931ZM5.09297 16.3678L5.44652 16.7214H5.44652L5.09297 16.3678ZM5.51211 15.9487L5.15855 15.5951H5.15855L5.51211 15.9487ZM4.52169 13.1671L4.02474 13.2223L4.02474 13.2223L4.52169 13.1671ZM4.48648 12.8502L4.98342 12.795V12.795L4.48648 12.8502ZM6.83815 15.4835L6.78293 15.9805L6.78293 15.9805L6.83815 15.4835ZM7.15502 15.5187L7.09981 16.0157L7.15502 15.5187ZM5.67919 15.788L6.00278 16.1692L5.67919 15.788ZM6.60733 15.4625L6.6219 14.9627H6.6219L6.60733 15.4625ZM4.58938 11.6199L4.14758 11.3858L4.14758 11.3858L4.58938 11.6199ZM4.45366 12.0068L3.96241 11.9136H3.96241L4.45366 12.0068ZM4.21717 14.326L3.83601 14.0024L3.83601 14.0024L4.21717 14.326ZM4.54275 13.3979L5.04254 13.3833L5.04254 13.3833L4.54275 13.3979ZM8.38531 15.4158L8.61944 15.8576H8.61944L8.38531 15.4158ZM7.99841 15.5516L8.09157 16.0428H8.09157L7.99841 15.5516ZM11.6693 12.2175L12.0228 12.571L11.6693 12.2175ZM9.91146 6.21222L9.18368 5.48444L8.47657 6.19155L9.20436 6.91933L9.91146 6.21222ZM14.5208 10.8215L13.793 10.0937L13.0859 10.8009L13.8137 11.5286L14.5208 10.8215ZM9.93214 4.73598L10.6599 5.46376L11.367 4.75665L10.6392 4.02887L9.93214 4.73598ZM11.367 5.46376L12.3374 4.49338L11.6303 3.78627L10.6599 4.75665L11.367 5.46376ZM15.5118 7.66779L14.5414 8.63818L15.2486 9.34528L16.2189 8.3749L15.5118 7.66779ZM9.20436 6.91933L13.0859 10.8009L13.793 10.0937L9.91146 6.21222L9.20436 6.91933ZM5.49542 11.3354L9.91146 6.91933L9.20436 6.21222L4.78831 10.6283L5.49542 11.3354ZM3.99095 15.2658L4.41009 14.8467L3.70298 14.1395L3.28384 14.5587L3.99095 15.2658ZM5.44652 16.7214L5.86566 16.3022L5.15855 15.5951L4.73941 16.0143L5.44652 16.7214ZM5.01863 13.1118L4.98342 12.795L3.98954 12.9054L4.02474 13.2223L5.01863 13.1118ZM6.78293 15.9805L7.09981 16.0157L7.21024 15.0218L6.89337 14.9866L6.78293 15.9805ZM5.86566 16.3022C5.95446 16.2134 5.97931 16.1891 6.00278 16.1692L5.3556 15.4069C5.29375 15.4594 5.23564 15.518 5.15855 15.5951L5.86566 16.3022ZM6.89337 14.9866C6.78499 14.9745 6.703 14.965 6.6219 14.9627L6.59276 15.9622C6.62354 15.9631 6.65813 15.9666 6.78293 15.9805L6.89337 14.9866ZM6.00278 16.1692C6.16711 16.0297 6.37728 15.956 6.59276 15.9622L6.6219 14.9627C6.15942 14.9492 5.70832 15.1074 5.3556 15.4069L6.00278 16.1692ZM3.28384 16.7214C3.88105 17.3186 4.84931 17.3186 5.44652 16.7214L4.73941 16.0143C4.53273 16.2209 4.19763 16.2209 3.99095 16.0143L3.28384 16.7214ZM4.78831 10.6283C4.50621 10.9104 4.28747 11.1218 4.14758 11.3858L5.03117 11.854C5.08426 11.7538 5.16952 11.6613 5.49542 11.3354L4.78831 10.6283ZM4.98342 12.795C4.93252 12.3369 4.92378 12.2114 4.9449 12.1L3.96241 11.9136C3.90675 12.2071 3.94548 12.5089 3.98954 12.9054L4.98342 12.795ZM4.14758 11.3858C4.05977 11.5515 3.99735 11.7294 3.96241 11.9136L4.9449 12.1C4.96118 12.0141 4.99026 11.9312 5.03117 11.854L4.14758 11.3858ZM15.5118 4.49338C16.3884 5.36997 16.3884 6.7912 15.5118 7.66779L16.2189 8.3749C17.486 7.10779 17.486 5.05339 16.2189 3.78627L15.5118 4.49338ZM12.3374 4.49338C13.214 3.61679 14.6352 3.61679 15.5118 4.49338L16.2189 3.78627C14.9518 2.51916 12.8974 2.51916 11.6303 3.78627L12.3374 4.49338ZM15.2692 10.8215C15.0625 11.0282 14.7275 11.0282 14.5208 10.8215L13.8137 11.5286C14.4109 12.1258 15.3791 12.1258 15.9763 11.5286L15.2692 10.8215ZM4.41009 14.8467C4.48719 14.7696 4.54583 14.7115 4.59834 14.6496L3.83601 14.0024C3.81608 14.0259 3.79178 14.0508 3.70298 14.1395L4.41009 14.8467ZM4.02474 13.2223C4.03861 13.3471 4.04206 13.3817 4.04296 13.4125L5.04254 13.3833C5.04017 13.3022 5.03067 13.2202 5.01863 13.1118L4.02474 13.2223ZM4.59834 14.6496C4.89778 14.2969 5.05602 13.8458 5.04254 13.3833L4.04296 13.4124C4.04924 13.6279 3.97552 13.8381 3.83601 14.0024L4.59834 14.6496ZM9.18368 4.73598C9.39036 4.52929 9.72546 4.52929 9.93214 4.73598L10.6392 4.02887C10.042 3.43166 9.07378 3.43166 8.47657 4.02887L9.18368 4.73598ZM3.99095 16.0143C3.78427 15.8076 3.78427 15.4725 3.99095 15.2658L3.28384 14.5587C2.68664 15.1559 2.68664 16.1242 3.28384 16.7214L3.99095 16.0143ZM9.18368 5.48444C8.97699 5.27776 8.97699 4.94266 9.18368 4.73598L8.47657 4.02887C7.87936 4.62608 7.87936 5.59434 8.47657 6.19155L9.18368 5.48444ZM15.9763 11.5286C16.5735 10.9314 16.5735 9.96317 15.9763 9.36596L15.2692 10.0731C15.4759 10.2798 15.4759 10.6148 15.2692 10.8215L15.9763 11.5286ZM8.66983 14.5098C8.34393 14.8357 8.25137 14.9209 8.15119 14.974L8.61944 15.8576C8.8834 15.7177 9.09484 15.499 9.37694 15.2169L8.66983 14.5098ZM7.09981 16.0157C7.49632 16.0597 7.79807 16.0985 8.09157 16.0428L7.90525 15.0603C7.79385 15.0814 7.66831 15.0727 7.21024 15.0218L7.09981 16.0157ZM8.15119 14.974C8.07399 15.0149 7.99109 15.044 7.90525 15.0603L8.09157 16.0428C8.27581 16.0079 8.45375 15.9454 8.61944 15.8576L8.15119 14.974ZM14.5414 9.34528L15.2692 10.0731L15.9763 9.36596L15.2486 8.63818L14.5414 9.34528ZM9.37694 15.2169L12.0228 12.571L11.3157 11.8639L8.66983 14.5098L9.37694 15.2169ZM12.0228 12.571L13.793 10.8009L13.0859 10.0937L11.3157 11.8639L12.0228 12.571Z"
        fill="#19110B"
      />
    </svg>
  );
};

export const MoveHorizontal = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8H14"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6L14 8L12 10"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 10L2 8L4 6"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MoveVertical = (props?: any) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14L8 2"
        stroke={props.color || defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12L8 14L6 12"
        stroke={props.color || defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 4L8 2L10 4"
        stroke={props.color || defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuSaveFolder = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M2.66667 13.3333L13.3333 13.3333C13.7015 13.3333 14 13.0349 14 12.6667L14 4.66667C14 4.29848 13.7015 4 13.3333 4L2 4L2 12.6667C2 13.0349 2.29848 13.3333 2.66667 13.3333Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M8 4.00033L6.86193 2.86225C6.7369 2.73723 6.56734 2.66699 6.39052 2.66699H2.66667C2.29848 2.66699 2 2.96547 2 3.33366V4.00033"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuCopy = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M10 10H13.3333C13.7015 10 14 9.70152 14 9.33333V2.66667C14 2.29848 13.7015 2 13.3333 2L6.66667 2C6.29848 2 6 2.29848 6 2.66667L6 6"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M2.66667 14L9.33333 14C9.70152 14 10 13.7015 10 13.3333L10 6.66667C10 6.29848 9.70153 6 9.33334 6L2.66667 6C2.29848 6 2 6.29848 2 6.66667L2 13.3333C2 13.7015 2.29848 14 2.66667 14Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuDownload = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 14H12"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2L8 11.3333"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3346 8L8.0013 11.3333L4.66797 8"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuVersionHistory = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="#19110B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4.66699V8.00033H11.3333"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuFindReplace = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M6.66667 11.3333C9.244 11.3333 11.3333 9.244 11.3333 6.66667C11.3333 4.08934 9.244 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.244 4.08934 11.3333 6.66667 11.3333Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10L14 14"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuDelete = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M12 4H4V13.3333C4 13.7015 4.29848 14 4.66667 14H11.3333C11.7015 14 12 13.7015 12 13.3333V4Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66797 4H13.3346"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M9.9987 2H5.9987C5.63051 2 5.33203 2.29848 5.33203 2.66667V4H10.6654V2.66667C10.6654 2.29848 10.3669 2 9.9987 2Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const FileMenuSave = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M11.3333 2.66699H4.66667C4.29848 2.66699 4 2.96547 4 3.33366V13.4213C4 13.9538 4.59343 14.2714 5.03647 13.976L7.6302 12.2469C7.85413 12.0976 8.14587 12.0976 8.3698 12.2469L10.9635 13.976C11.4066 14.2714 12 13.9538 12 13.4213V3.33366C12 2.96547 11.7015 2.66699 11.3333 2.66699Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuLanguage = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="#19110B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8H14"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M8 14C9.10457 14 10 11.3137 10 8C10 4.68629 9.10457 2 8 2C6.89543 2 6 4.68629 6 8C6 11.3137 6.89543 14 8 14Z"
        stroke="#19110B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FileMenuImport = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        // eslint-disable-next-line max-len
        d="M12.668 12.6663C14.1407 12.6663 15.3346 11.4724 15.3346 9.99967C15.3346 8.52692 14.1407 7.33301 12.668 7.33301C12.6522 7.33301 12.6365 7.33315 12.6208 7.33342C12.2975 5.07169 10.3524 3.33301 8.0013 3.33301C6.13687 3.33301 4.5278 4.42637 3.78031 6.00688C2.04238 6.12064 0.667969 7.56632 0.667969 9.33301C0.667969 11.174 2.16035 12.6663 4.0013 12.6663H12.668Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.667L8 6.66699"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8.00033L8 6.66699L10 8.00033"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const Brush = ({ isActive }: RightSideBarImages) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M2 22.0002C4 22.0002 6.60801 22.3419 7.97485 20.975C9.34168 19.6082 9.34168 17.3921 7.97485 16.0253C6.60801 14.6585 4.39194 14.6585 3.0251 16.0253C1.65827 17.3921 3.0251 20.0002 2 22.0002Z`}
        fill={isActive ? `#19110B` : ""}
      />
      <path
        d={`M7.99995 16.0002C7.50853 15.5088 7.26283 15.2631 7.12391 15.0057C6.79079 14.3887 6.80514 13.6423 7.16173 13.0385C7.31043 12.7868 7.5654 12.5507 8.07534 12.0785L17.9434 2.94141C18.8126 2.13663 20.1624 2.16258 20.9999 3.00017C21.8375 3.83776 21.8635 5.18755 21.0587 6.05671L11.9216 15.9248C11.4494 16.4347 11.2134 16.6897 10.9616 16.8384C10.3578 17.195 9.6114 17.2093 8.99438 16.8762C8.73706 16.7373 8.49136 16.4916 7.99995 16.0002Z`}
        fill={isActive ? `#19110B` : ""}
      />
      <path
        d={`M8.99997 11.2224L12.7778 15.0002M7.97485 20.975C6.60801 22.3419 4 22.0002 2 22.0002C3.0251 20.0002 1.65827 17.3921 3.0251 16.0253C4.39194 14.6585 6.60801 14.6585 7.97485 16.0253C9.34168 17.3921 9.34168 19.6082 7.97485 20.975ZM11.9216 15.9248L21.0587 6.05671C21.8635 5.18755 21.8375 3.83776 20.9999 3.00017C20.1624 2.16258 18.8126 2.13663 17.9434 2.94141L8.07534 12.0785C7.5654 12.5507 7.31043 12.7868 7.16173 13.0385C6.80514 13.6423 6.79079 14.3887 7.12391 15.0057C7.26283 15.2631 7.50853 15.5088 7.99995 16.0002C8.49136 16.4916 8.73707 16.7373 8.99438 16.8762C9.6114 17.2093 10.3578 17.195 10.9616 16.8384C11.2134 16.6897 11.4494 16.4347 11.9216 15.9248Z`}
        stroke="#19110B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M12.0378 15.7024L12.0378 15.7024L12.8939 14.7778L9.11616 11L8.19152 11.8561C7.68159 12.3283 7.42662 12.5644 7.27792 12.8161C6.92133 13.4199 6.90698 14.1663 7.2401 14.7833C7.37902 15.0407 7.62472 15.2864 8.11613 15.7778L8.11614 15.7778C8.60755 16.2692 8.85325 16.5149 9.11057 16.6538C9.72759 16.9869 10.474 16.9726 11.0778 16.616C11.3295 16.4673 11.5656 16.2123 12.0378 15.7024Z`}
        fill="#F0F0F0"
        stroke="#19110B"
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const Download = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 17.5H15"
        stroke="#19110B"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 2.5L10 14.1667"
        stroke="#19110B"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1693 10L10.0026 14.1667L5.83594 10"
        stroke="#19110B"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Barcode = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M14.6716 22.6512C12.1636 22.6512 10.783 22.7811 10.0039 22.002C9.22479 21.2228 9.35145 20.504 9.35145 17.996`}
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path
        d="M22.6482 17.9961C22.6482 20.504 22.7791 21.2228 22 22.002C21.2209 22.7811 19.836 22.6512 17.3281 22.6512"
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path
        d="M17.3281 9.35169C19.836 9.35169 21.2209 9.22284 22 10.002C22.7791 10.7811 22.6482 11.4989 22.6482 14.0068"
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path
        d={`M14.6716 9.35171C12.1636 9.35171 10.783 9.22284 10.0039 10.002C9.22479 10.7811 9.35145 11.4989 9.35145 14.0068`}
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path d="M9.35156 16H22.6518" stroke="#19110B" strokeLinecap="round" />
    </svg>
  );
};

// Text Drawer icons

export const Rotational = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 13H2V3"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 8.66406V8.66406C4.20914 8.66406 6 10.4549 6 12.6641V12.6641"
        stroke={defaultIconValues.primaryStroke}
      />
    </svg>
  );
};

export const Minus = () => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 10H15.5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UnorderedList = ({ color }: { color?: any }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 14.166H16.3333"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66797 14.166H4.66997V14.168H4.66797V14.166Z"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10H16.3333"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66797 10H4.66997V10.002H4.66797V10Z"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 5.83398H16.3333"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66797 5.83398H4.66997V5.83598H4.66797V5.83398Z"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ListChecklist = () => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.86719 14.3125H17.3672"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.86719 10.1484H17.3672"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.86719 5.98438H17.3672"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9 5L5.4 6.8L4.5 6.2"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9 9L5.4 10.8L4.5 10.2"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9 13L5.4 14.8L4.5 14.2"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const OrderedList = ({ color }: { color?: any }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.41797 13.832H16.7513"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.92188 12.1786V12.0859C3.92188 11.6717 4.25766 11.3359 4.67188 11.3359H4.69215C5.09516 11.3359 5.42188 11.6626 5.42188 12.0657C5.42188 12.2411 5.36497 12.4118 5.25971 12.5522L3.92188 14.3359H5.42188"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.41797 9.66797H16.7513"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.41797 5.50391H16.7513"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 5.5L4.75 5V8"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Swicher = () => {
  return (
    <svg
      width="12"
      height="24"
      viewBox="0 0 12 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 7.5L6 4L9.5 7.5"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 16.5L6 20L2.5 16.5"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PipetteDisabled = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M6.68745 12.5274L6.33389 12.1739L6.68745 12.5274ZM7.22197 4.22984L7.57552 3.87629V3.87629L7.22197 4.22984ZM6.49419 3.50205L6.14063 3.85561H6.14063L6.49419 3.50205ZM11.8313 8.83915L11.4777 9.1927L11.8313 8.83915ZM7.94976 2.04648L8.30331 1.69293L7.94976 2.04648ZM8.67754 2.77427L8.32399 3.12782C8.41776 3.22159 8.54493 3.27427 8.67754 3.27427C8.81015 3.27427 8.93733 3.22159 9.03109 3.12782L8.67754 2.77427ZM9.64792 1.80389L9.29437 1.45034V1.45034L9.64792 1.80389ZM13.5294 5.68541L13.1759 5.33186H13.1759L13.5294 5.68541ZM12.5591 6.65579L12.2055 6.30224C12.0102 6.4975 12.0102 6.81408 12.2055 7.00934L12.5591 6.65579ZM13.2868 7.38358L12.9333 7.73713L12.9333 7.73713L13.2868 7.38358ZM2.80593 8.64589L2.45237 8.29233L2.80593 8.64589ZM1.30146 12.5763L1.65501 12.9299H1.65501L1.30146 12.5763ZM1.7206 12.1572L1.36704 11.8036H1.36704L1.7206 12.1572ZM2.75703 14.0319L3.11058 14.3854H3.11058L2.75703 14.0319ZM3.17617 13.6127L2.82261 13.2592H2.82261L3.17617 13.6127ZM2.18575 10.8311L1.68881 10.8863L1.68881 10.8863L2.18575 10.8311ZM2.15054 10.5142L2.64748 10.459V10.459L2.15054 10.5142ZM4.50221 13.1476L4.44699 13.6445L4.447 13.6445L4.50221 13.1476ZM4.81909 13.1828L4.76387 13.6797L4.81909 13.1828ZM3.34325 13.4521L3.66684 13.8333L3.34325 13.4521ZM4.27139 13.1265L4.28597 12.6267H4.28596L4.27139 13.1265ZM2.25344 9.28395L1.81164 9.04982L1.81164 9.04983L2.25344 9.28395ZM2.11772 9.67086L1.62648 9.5777H1.62648L2.11772 9.67086ZM1.88124 11.9901L1.50007 11.6665L1.50007 11.6665L1.88124 11.9901ZM2.20681 11.0619L2.7066 11.0474L2.7066 11.0474L2.20681 11.0619ZM6.04938 13.0799L6.28351 13.5217H6.28351L6.04938 13.0799ZM5.66247 13.2156L5.75564 13.7069H5.75564L5.66247 13.2156ZM9.33333 9.88152L9.68689 10.2351L9.33333 9.88152ZM7.57552 3.87629L6.84774 3.1485L6.14063 3.85561L6.86842 4.58339L7.57552 3.87629ZM12.1848 8.48559L11.457 7.75781L10.7499 8.46491L11.4777 9.1927L12.1848 8.48559ZM7.5962 2.40004L8.32399 3.12782L9.03109 2.42072L8.30331 1.69293L7.5962 2.40004ZM9.03109 3.12782L10.0015 2.15744L9.29437 1.45034L8.32399 2.42072L9.03109 3.12782ZM13.1759 5.33186L12.2055 6.30224L12.9126 7.00934L13.883 6.03896L13.1759 5.33186ZM6.86842 4.58339L10.7499 8.46491L11.457 7.75781L7.57552 3.87629L6.86842 4.58339ZM3.15948 8.99944L7.57552 4.58339L6.86842 3.87629L2.45237 8.29233L3.15948 8.99944ZM1.65501 12.9299L2.07415 12.5107L1.36704 11.8036L0.947905 12.2228L1.65501 12.9299ZM3.11058 14.3854L3.52972 13.9663L2.82261 13.2592L2.40348 13.6783L3.11058 14.3854ZM2.68269 10.7759L2.64748 10.459L1.6536 10.5695L1.68881 10.8863L2.68269 10.7759ZM4.447 13.6445L4.76387 13.6797L4.8743 12.6859L4.55743 12.6506L4.447 13.6445ZM3.52972 13.9663C3.61853 13.8775 3.64337 13.8532 3.66684 13.8333L3.01966 13.0709C2.95781 13.1234 2.89971 13.1821 2.82261 13.2592L3.52972 13.9663ZM4.55743 12.6506C4.44906 12.6386 4.36706 12.6291 4.28597 12.6267L4.25682 13.6263C4.2876 13.6272 4.32219 13.6307 4.44699 13.6445L4.55743 12.6506ZM3.66684 13.8333C3.83118 13.6938 4.04135 13.62 4.25682 13.6263L4.28596 12.6267C3.82348 12.6133 3.37238 12.7715 3.01966 13.0709L3.66684 13.8333ZM0.947905 14.3854C1.54511 14.9826 2.51338 14.9826 3.11058 14.3854L2.40348 13.6783C2.19679 13.885 1.86169 13.885 1.65501 13.6783L0.947905 14.3854ZM2.45237 8.29233C2.17028 8.57443 1.95153 8.78587 1.81164 9.04982L2.69523 9.51808C2.74833 9.4179 2.83358 9.32534 3.15948 8.99944L2.45237 8.29233ZM2.64748 10.459C2.59659 10.001 2.58784 9.87542 2.60896 9.76402L1.62648 9.5777C1.57081 9.8712 1.60954 10.173 1.6536 10.5695L2.64748 10.459ZM1.81164 9.04983C1.72383 9.21552 1.66142 9.39346 1.62648 9.5777L2.60896 9.76402C2.62524 9.67819 2.65432 9.59528 2.69523 9.51808L1.81164 9.04983ZM13.1759 2.15744C14.0525 3.03403 14.0525 4.45527 13.1759 5.33186L13.883 6.03896C15.1501 4.77185 15.1501 2.71745 13.883 1.45034L13.1759 2.15744ZM10.0015 2.15744C10.8781 1.28085 12.2993 1.28085 13.1759 2.15744L13.883 1.45034C12.6159 0.183221 10.5615 0.183221 9.29437 1.45034L10.0015 2.15744ZM12.9333 8.48559C12.7266 8.69228 12.3915 8.69228 12.1848 8.48559L11.4777 9.1927C12.0749 9.78991 13.0432 9.78991 13.6404 9.1927L12.9333 8.48559ZM2.07415 12.5107C2.15125 12.4336 2.2099 12.3755 2.2624 12.3137L1.50007 11.6665C1.48014 11.69 1.45584 11.7148 1.36704 11.8036L2.07415 12.5107ZM1.68881 10.8863C1.70268 11.0111 1.70613 11.0457 1.70702 11.0765L2.7066 11.0474C2.70423 10.9663 2.69473 10.8843 2.68269 10.7759L1.68881 10.8863ZM2.2624 12.3137C2.56185 11.961 2.72008 11.5099 2.7066 11.0474L1.70702 11.0765C1.71331 11.292 1.63958 11.5022 1.50007 11.6665L2.2624 12.3137ZM6.84774 2.40004C7.05442 2.19336 7.38952 2.19336 7.5962 2.40004L8.30331 1.69293C7.7061 1.09572 6.73784 1.09572 6.14063 1.69293L6.84774 2.40004ZM1.65501 13.6783C1.44833 13.4716 1.44833 13.1365 1.65501 12.9299L0.947905 12.2228C0.350699 12.82 0.350698 13.7882 0.947905 14.3854L1.65501 13.6783ZM6.84774 3.1485C6.64106 2.94182 6.64106 2.60672 6.84774 2.40004L6.14063 1.69293C5.54343 2.29014 5.54343 3.2584 6.14063 3.85561L6.84774 3.1485ZM13.6404 9.1927C14.2376 8.59549 14.2376 7.62723 13.6404 7.03002L12.9333 7.73713C13.14 7.94381 13.14 8.27891 12.9333 8.48559L13.6404 9.1927ZM6.33389 12.1739C6.00799 12.4998 5.91543 12.585 5.81525 12.6381L6.28351 13.5217C6.54747 13.3818 6.7589 13.1631 7.041 12.881L6.33389 12.1739ZM4.76387 13.6797C5.16038 13.7238 5.46213 13.7625 5.75564 13.7069L5.56931 12.7244C5.45791 12.7455 5.33238 12.7367 4.8743 12.6859L4.76387 13.6797ZM5.81525 12.6381C5.73805 12.679 5.65515 12.7081 5.56931 12.7244L5.75564 13.7069C5.93987 13.6719 6.11782 13.6095 6.28351 13.5217L5.81525 12.6381ZM12.2055 7.00934L12.9333 7.73713L13.6404 7.03002L12.9126 6.30224L12.2055 7.00934ZM7.041 12.881L9.68689 10.2351L8.97978 9.52797L6.33389 12.1739L7.041 12.881ZM9.68689 10.2351L11.457 8.46491L10.7499 7.75781L8.97978 9.52797L9.68689 10.2351Z"
        fill={defaultIconValues.primaryStroke}
      />
    </svg>
  );
};

export const Pipette = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M6.68745 12.5274L6.33389 12.1739L6.68745 12.5274ZM7.22197 4.22984L7.57552 3.87629V3.87629L7.22197 4.22984ZM6.49419 3.50205L6.14063 3.85561H6.14063L6.49419 3.50205ZM11.8313 8.83915L11.4777 9.1927L11.8313 8.83915ZM7.94976 2.04648L8.30331 1.69293L7.94976 2.04648ZM8.67754 2.77427L8.32399 3.12782C8.41776 3.22159 8.54493 3.27427 8.67754 3.27427C8.81015 3.27427 8.93733 3.22159 9.03109 3.12782L8.67754 2.77427ZM9.64792 1.80389L9.29437 1.45034V1.45034L9.64792 1.80389ZM13.5294 5.68541L13.1759 5.33186H13.1759L13.5294 5.68541ZM12.5591 6.65579L12.2055 6.30224C12.0102 6.4975 12.0102 6.81408 12.2055 7.00934L12.5591 6.65579ZM13.2868 7.38358L12.9333 7.73713L12.9333 7.73713L13.2868 7.38358ZM2.80593 8.64589L2.45237 8.29233L2.80593 8.64589ZM1.30146 12.5763L1.65501 12.9299H1.65501L1.30146 12.5763ZM1.7206 12.1572L1.36704 11.8036H1.36704L1.7206 12.1572ZM2.75703 14.0319L3.11058 14.3854H3.11058L2.75703 14.0319ZM3.17617 13.6127L2.82261 13.2592H2.82261L3.17617 13.6127ZM2.18575 10.8311L1.68881 10.8863L1.68881 10.8863L2.18575 10.8311ZM2.15054 10.5142L2.64748 10.459V10.459L2.15054 10.5142ZM4.50221 13.1476L4.44699 13.6445L4.447 13.6445L4.50221 13.1476ZM4.81909 13.1828L4.76387 13.6797L4.81909 13.1828ZM3.34325 13.4521L3.66684 13.8333L3.34325 13.4521ZM4.27139 13.1265L4.28597 12.6267H4.28596L4.27139 13.1265ZM2.25344 9.28395L1.81164 9.04982L1.81164 9.04983L2.25344 9.28395ZM2.11772 9.67086L1.62648 9.5777H1.62648L2.11772 9.67086ZM1.88124 11.9901L1.50007 11.6665L1.50007 11.6665L1.88124 11.9901ZM2.20681 11.0619L2.7066 11.0474L2.7066 11.0474L2.20681 11.0619ZM6.04938 13.0799L6.28351 13.5217H6.28351L6.04938 13.0799ZM5.66247 13.2156L5.75564 13.7069H5.75564L5.66247 13.2156ZM9.33333 9.88152L9.68689 10.2351L9.33333 9.88152ZM7.57552 3.87629L6.84774 3.1485L6.14063 3.85561L6.86842 4.58339L7.57552 3.87629ZM12.1848 8.48559L11.457 7.75781L10.7499 8.46491L11.4777 9.1927L12.1848 8.48559ZM7.5962 2.40004L8.32399 3.12782L9.03109 2.42072L8.30331 1.69293L7.5962 2.40004ZM9.03109 3.12782L10.0015 2.15744L9.29437 1.45034L8.32399 2.42072L9.03109 3.12782ZM13.1759 5.33186L12.2055 6.30224L12.9126 7.00934L13.883 6.03896L13.1759 5.33186ZM6.86842 4.58339L10.7499 8.46491L11.457 7.75781L7.57552 3.87629L6.86842 4.58339ZM3.15948 8.99944L7.57552 4.58339L6.86842 3.87629L2.45237 8.29233L3.15948 8.99944ZM1.65501 12.9299L2.07415 12.5107L1.36704 11.8036L0.947905 12.2228L1.65501 12.9299ZM3.11058 14.3854L3.52972 13.9663L2.82261 13.2592L2.40348 13.6783L3.11058 14.3854ZM2.68269 10.7759L2.64748 10.459L1.6536 10.5695L1.68881 10.8863L2.68269 10.7759ZM4.447 13.6445L4.76387 13.6797L4.8743 12.6859L4.55743 12.6506L4.447 13.6445ZM3.52972 13.9663C3.61853 13.8775 3.64337 13.8532 3.66684 13.8333L3.01966 13.0709C2.95781 13.1234 2.89971 13.1821 2.82261 13.2592L3.52972 13.9663ZM4.55743 12.6506C4.44906 12.6386 4.36706 12.6291 4.28597 12.6267L4.25682 13.6263C4.2876 13.6272 4.32219 13.6307 4.44699 13.6445L4.55743 12.6506ZM3.66684 13.8333C3.83118 13.6938 4.04135 13.62 4.25682 13.6263L4.28596 12.6267C3.82348 12.6133 3.37238 12.7715 3.01966 13.0709L3.66684 13.8333ZM0.947905 14.3854C1.54511 14.9826 2.51338 14.9826 3.11058 14.3854L2.40348 13.6783C2.19679 13.885 1.86169 13.885 1.65501 13.6783L0.947905 14.3854ZM2.45237 8.29233C2.17028 8.57443 1.95153 8.78587 1.81164 9.04982L2.69523 9.51808C2.74833 9.4179 2.83358 9.32534 3.15948 8.99944L2.45237 8.29233ZM2.64748 10.459C2.59659 10.001 2.58784 9.87542 2.60896 9.76402L1.62648 9.5777C1.57081 9.8712 1.60954 10.173 1.6536 10.5695L2.64748 10.459ZM1.81164 9.04983C1.72383 9.21552 1.66142 9.39346 1.62648 9.5777L2.60896 9.76402C2.62524 9.67819 2.65432 9.59528 2.69523 9.51808L1.81164 9.04983ZM13.1759 2.15744C14.0525 3.03403 14.0525 4.45527 13.1759 5.33186L13.883 6.03896C15.1501 4.77185 15.1501 2.71745 13.883 1.45034L13.1759 2.15744ZM10.0015 2.15744C10.8781 1.28085 12.2993 1.28085 13.1759 2.15744L13.883 1.45034C12.6159 0.183221 10.5615 0.183221 9.29437 1.45034L10.0015 2.15744ZM12.9333 8.48559C12.7266 8.69228 12.3915 8.69228 12.1848 8.48559L11.4777 9.1927C12.0749 9.78991 13.0432 9.78991 13.6404 9.1927L12.9333 8.48559ZM2.07415 12.5107C2.15125 12.4336 2.2099 12.3755 2.2624 12.3137L1.50007 11.6665C1.48014 11.69 1.45584 11.7148 1.36704 11.8036L2.07415 12.5107ZM1.68881 10.8863C1.70268 11.0111 1.70613 11.0457 1.70702 11.0765L2.7066 11.0474C2.70423 10.9663 2.69473 10.8843 2.68269 10.7759L1.68881 10.8863ZM2.2624 12.3137C2.56185 11.961 2.72008 11.5099 2.7066 11.0474L1.70702 11.0765C1.71331 11.292 1.63958 11.5022 1.50007 11.6665L2.2624 12.3137ZM6.84774 2.40004C7.05442 2.19336 7.38952 2.19336 7.5962 2.40004L8.30331 1.69293C7.7061 1.09572 6.73784 1.09572 6.14063 1.69293L6.84774 2.40004ZM1.65501 13.6783C1.44833 13.4716 1.44833 13.1365 1.65501 12.9299L0.947905 12.2228C0.350699 12.82 0.350698 13.7882 0.947905 14.3854L1.65501 13.6783ZM6.84774 3.1485C6.64106 2.94182 6.64106 2.60672 6.84774 2.40004L6.14063 1.69293C5.54343 2.29014 5.54343 3.2584 6.14063 3.85561L6.84774 3.1485ZM13.6404 9.1927C14.2376 8.59549 14.2376 7.62723 13.6404 7.03002L12.9333 7.73713C13.14 7.94381 13.14 8.27891 12.9333 8.48559L13.6404 9.1927ZM6.33389 12.1739C6.00799 12.4998 5.91543 12.585 5.81525 12.6381L6.28351 13.5217C6.54747 13.3818 6.7589 13.1631 7.041 12.881L6.33389 12.1739ZM4.76387 13.6797C5.16038 13.7238 5.46213 13.7625 5.75564 13.7069L5.56931 12.7244C5.45791 12.7455 5.33238 12.7367 4.8743 12.6859L4.76387 13.6797ZM5.81525 12.6381C5.73805 12.679 5.65515 12.7081 5.56931 12.7244L5.75564 13.7069C5.93987 13.6719 6.11782 13.6095 6.28351 13.5217L5.81525 12.6381ZM12.2055 7.00934L12.9333 7.73713L13.6404 7.03002L12.9126 6.30224L12.2055 7.00934ZM7.041 12.881L9.68689 10.2351L8.97978 9.52797L6.33389 12.1739L7.041 12.881ZM9.68689 10.2351L11.457 8.46491L10.7499 7.75781L8.97978 9.52797L9.68689 10.2351Z"
        fill="#19110B"
      />
    </svg>
  );
};

export const Underline = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15.834H15"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3307 4.16602V9.16602C13.3307 11.007 11.8383 12.4993 9.9974 12.4993C8.15645
         12.4993 6.66406 11.007 6.66406 9.16602V4.16602"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StrikeThrough = () => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6686 10C11.4148 10 12.1473 10.1603 12.7896 10.4642C13.0797 10.6015
         13.3466 10.7658 13.5852 10.9529C13.8748 11.18 14.1227 11.4407 14.3198 
         11.7275C14.6793 12.2506 14.8566 12.8414 14.8332 13.438C14.8097 14.0347
          14.5864 14.6154 14.1866 15.1194C13.7867 15.6235 13.2251 16.0323 12.5602
           16.3034C11.8953 16.5744 11.1517 16.6976 10.4069 16.6601C9.66219 16.6226
            8.94371 16.4258 8.32654 16.0903C7.70936 15.7547 7.21616 15.2927 6.89844 14.7526"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.00781 10H17.3411"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4446 5.24805C14.1269 4.70791 13.6337 4.24593 13.0165 3.91038C12.3993
         3.57484 11.6808 3.37805 10.9361 3.34056C10.1914 3.30308 9.44773 3.42628 8.78285
          3.6973C8.11798 3.96831 7.55628 4.3772 7.15645 4.88123C6.75661 5.38526 6.53331
           5.96595 6.50987 6.56262C6.503 6.73743 6.51336 6.91174 6.54049 7.08398"
        stroke={defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const AlignLeft = ({ color }: { color?: any }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.83594 15H12.1693"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.83594 11.666H17.1693"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.83594 8.33398H12.1693"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.83594 5H17.1693"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlignCenter = ({ color }: { color?: any }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6693 15H6.33594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 11.666H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6693 8.33398H6.33594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 5H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlignRight = ({ color }: { color?: any }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1693 15H8.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 11.666H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 8.33398H8.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 5H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlignJustify = ({ color }: { color?: any }) => {
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.1693 15H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 11.666H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 8.33398H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1693 5H3.83594"
        stroke={color ? color : defaultIconValues.primaryStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EditFont = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3359 18L8.33594 6L3.33594 18"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3359 14L5.33594 14"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3359 18V12"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3359 15C21.3359 16.6569 19.9928 18 18.3359 18C16.6791 18 15.3359 
        16.6569 15.3359 15C15.3359 13.3431 16.6791 12 18.3359 12C19.9928 12 21.3359 13.3431 21.3359 15Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UndoLeft = ({ isDisabled }: { isDisabled: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.83333 10.8327L2.5 7.49935L5.83333 4.16602"
        stroke={
          isDisabled
            ? defaultIconValues.primaryStroke
            : defaultIconValues.secondaryStroke
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.16667 15.8333H13.3333C15.6345 15.8333 17.5 13.9679 17.5 11.6667C17.5 9.36548 15.6345 7.5 13.3333 7.5H2.5"
        stroke={
          isDisabled
            ? defaultIconValues.primaryStroke
            : defaultIconValues.secondaryStroke
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const UndoRight = ({ isDisabled }: { isDisabled: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.168 10.8327L17.5013 7.49935L14.168 4.16602"
        stroke={
          isDisabled
            ? defaultIconValues.primaryStroke
            : defaultIconValues.secondaryStroke
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8333 15.8333H6.66667C4.36548 15.8333 2.5 13.9679 2.5 11.6667C2.5 9.36548 4.36548 7.5 6.66667 7.5H17.5"
        stroke={
          isDisabled
            ? defaultIconValues.primaryStroke
            : defaultIconValues.secondaryStroke
        }
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const TextIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.33203 15.834H11.6654"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 4.16602V15.8327"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 4.99935V4.16602H15V4.99935"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ElementsIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M7 12.25C9.89949 12.25 12.25 9.89949 12.25 7C12.25 4.1005 9.89949 1.75 7 1.75C4.1005 1.75 1.75 4.1005 1.75 7C1.75 9.89949 4.1005 12.25 7 12.25Z"
        stroke="#19110B"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M17.6667 7.75H8.33333C8.01117 7.75 7.75 8.01117 7.75 8.33333V17.6667C7.75 17.9888 8.01117 18.25 8.33333 18.25H17.6667C17.9888 18.25 18.25 17.9888 18.25 17.6667V8.33333C18.25 8.01117 17.9888 7.75 17.6667 7.75Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M17.6667 7.75H8.33333C8.01117 7.75 7.75 8.01117 7.75 8.33333V17.6667C7.75 17.9888 8.01117 18.25 8.33333 18.25H17.6667C17.9888 18.25 18.25 17.9888 18.25 17.6667V8.33333C18.25 8.01117 17.9888 7.75 17.6667 7.75Z"
        fill="white"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const InterfaceIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.69713 16.1427L14.3008 3.85547"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const WatermarkIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M13.5038 3.14645C13.41 3.05268 13.2829 3 13.1503 3H4.5C4.22386 3 4 3.22386 4 3.5V17.5C4 17.7761 4.22386 18 4.5 18H15.8633C16.1394 18 16.3633 17.7761 16.3633 17.5V6.21302C16.3633 6.08042 16.3106 5.95324 16.2168 5.85947L13.5038 3.14645ZM13.3218 4.20738L15.1559 6.04148H13.3218V4.20738ZM15.4844 17.1211H4.87891V3.87891H12.4429V6.42039C12.4429 6.69653 12.6667 6.92039 12.9429 6.92039H15.4844V17.1211Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M8.58244 13.6042C8.76963 13.6042 8.93627 13.4857 8.99762 13.3088L9.31991 12.3798H11.0467L11.3657 13.3076C11.4267 13.4851 11.5936 13.6042 11.7812 13.6042C12.0829 13.6042 12.2949 13.3072 12.1968 13.0219L10.7076 8.6894C10.6381 8.48732 10.4479 8.35171 10.2342 8.35194L10.1421 8.35204C9.92935 8.35226 9.74002 8.48713 9.67028 8.68816L8.16726 13.0207C8.06821 13.3063 8.28024 13.6042 8.58244 13.6042ZM10.1873 9.87951L10.7446 11.5008H9.62483L10.1873 9.87951Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M6.14062 8.79102C6.14062 8.54831 6.33737 8.35156 6.58008 8.35156H7.78128C8.02398 8.35156 8.22073 8.54831 8.22073 8.79102C8.22073 9.03372 8.02398 9.23047 7.78128 9.23047H6.58008C6.33737 9.23047 6.14062 9.03372 6.14062 8.79102Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M6.14062 10.9746C6.14062 10.7319 6.33737 10.5352 6.58008 10.5352H7.27348C7.51618 10.5352 7.71293 10.7319 7.71293 10.9746C7.71293 11.2173 7.51618 11.4141 7.27348 11.4141H6.58008C6.33738 11.4141 6.14062 11.2173 6.14062 10.9746Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M6.14062 15.3418C6.14062 15.0991 6.33737 14.9023 6.58008 14.9023H13.7872C14.0299 14.9023 14.2266 15.0991 14.2266 15.3418C14.2266 15.5845 14.0299 15.7813 13.7872 15.7813H6.58008C6.33737 15.7813 6.14062 15.5845 6.14062 15.3418Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M6.14062 13.1582C6.14062 12.9155 6.33737 12.7188 6.58008 12.7188C6.82278 12.7188 7.01953 12.9155 7.01953 13.1582C7.01953 13.4009 6.82278 13.5977 6.58008 13.5977C6.33737 13.5977 6.14062 13.4009 6.14062 13.1582Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M12.1445 8.79102C12.1445 8.54831 12.3413 8.35156 12.584 8.35156H13.7852C14.0279 8.35156 14.2246 8.54831 14.2246 8.79102C14.2246 9.03372 14.0279 9.23047 13.7852 9.23047H12.584C12.3413 9.23047 12.1445 9.03372 12.1445 8.79102Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M12.6523 10.9746C12.6523 10.7319 12.8491 10.5352 13.0918 10.5352H13.7852C14.0279 10.5352 14.2246 10.7319 14.2246 10.9746C14.2246 11.2173 14.0279 11.4141 13.7852 11.4141H13.0918C12.8491 11.4141 12.6523 11.2173 12.6523 10.9746Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
      <path
        // eslint-disable-next-line max-len
        d="M13.3438 13.1582C13.3438 12.9155 13.5405 12.7188 13.7832 12.7188C14.0259 12.7188 14.2227 12.9155 14.2227 13.1582C14.2227 13.4009 14.0259 13.5977 13.7832 13.5977C13.5405 13.5977 13.3438 13.4009 13.3438 13.1582Z"
        fill="#19110B"
        stroke="#19110B"
        strokeWidth="0.3"
      />
    </svg>
  );
};

export const SignatureIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M13.4627 11.0562C14.0332 11.6785 15.1576 12.2815 17.3574 12.2815C17.5278 12.2815 17.6913 12.2138 17.8118 12.0933C17.9323 11.9728 18 11.8094 18 11.639C18 11.4685 17.9323 11.3051 17.8118 11.1846C17.6913 11.0641 17.5278 10.9964 17.3574 10.9964C14.9373 10.9964 14.2045 10.1733 14.1467 9.71601L14.0456 9.71122M13.4627 11.0562L12.8986 9.48946C12.95 9.34904 13.0487 9.23093 13.1778 9.15548C13.3069 9.08004 13.4583 9.05199 13.6059 9.07615C13.7535 9.10032 13.888 9.17519 13.9863 9.28788C14.0837 9.39958 14.1395 9.54149 14.1443 9.68956L14.0444 9.69429V9.69485M13.4627 11.0562C13.466 11.0523 13.4693 11.0483 13.4726 11.0443L13.3958 10.9803L13.3194 11.0448C13.323 11.0491 13.3267 11.0534 13.3303 11.0577C12.5098 12.0129 11.7084 12.4075 10.8993 12.251C10.0888 12.0976 9.41411 11.3996 8.89119 10.1746L8.98333 10.1358C8.98331 10.1357 8.98329 10.1357 8.98328 10.1356M13.4627 11.0562L8.98328 10.1356M14.0456 9.71122C14.0456 9.7112 14.0456 9.71118 14.0456 9.71116C14.0454 9.70868 14.0451 9.70621 14.0449 9.70375M14.0456 9.71122L14.0444 9.71116V9.69747M14.0456 9.71122C14.0717 9.98107 14.291 10.3267 14.7938 10.6022C15.3045 10.8821 16.117 11.0964 17.3574 11.0964C17.5013 11.0964 17.6393 11.1535 17.7411 11.2553C17.8428 11.357 17.9 11.495 17.9 11.639C17.9 11.7829 17.8428 11.9209 17.7411 12.0226C17.6393 12.1244 17.5013 12.1815 17.3574 12.1815C15.0869 12.1815 13.995 11.5344 13.4722 10.9157L13.3953 10.8248L13.319 10.9162C12.4848 11.9165 11.6957 12.3032 10.9183 12.1528L10.9179 12.1528C10.1566 12.0087 9.50134 11.3491 8.98328 10.1356M14.0449 9.70375L14.0557 9.70273L14.0449 9.7017V9.70306M14.0449 9.70375C14.0449 9.70352 14.0449 9.70329 14.0449 9.70306M14.0449 9.70375L14.0449 9.70375V9.70306M14.0449 9.70306C14.0448 9.70253 14.0448 9.70199 14.0447 9.70146L14.0444 9.69747M14.0444 9.69747V9.69611M14.0444 9.69747L14.0443 9.69611L14.0444 9.69611M14.0444 9.69611L14.0445 9.69611C14.0444 9.69569 14.0444 9.69527 14.0444 9.69485M14.0444 9.69611V9.69485M14.0444 9.69485C14.0408 9.56908 13.9937 9.44845 13.9109 9.35362C13.8279 9.25847 13.7143 9.19524 13.5897 9.17484C13.4651 9.15443 13.3373 9.17812 13.2283 9.24182C13.1193 9.30553 13.0359 9.40526 12.9925 9.52383L12.9884 9.53503L12.9818 9.54494C12.0011 11.0155 11.3884 11.1371 11.1134 11.0867L11.1129 11.0866C10.9131 11.0489 10.7301 10.9083 10.5686 10.7222C10.4054 10.5343 10.2539 10.2885 10.1191 10.0189C9.84939 9.47957 9.63875 8.83004 9.53235 8.31737C9.50915 8.20972 9.45374 8.11169 9.37349 8.03628C9.29317 7.9608 9.19177 7.91158 9.08278 7.89515C8.97379 7.87873 8.86238 7.89589 8.76338 7.94435C8.66439 7.99281 8.5825 8.07026 8.52861 8.16641L8.52453 8.17369L8.5193 8.18019C6.92542 10.1621 5.84154 10.8568 5.14001 11.037L4.93867 11.0887L5.02393 10.8991C5.70472 9.38518 6.21205 8.05876 6.53645 6.94415C7.08363 5.0635 7.11156 3.78339 6.66672 2.99707L6.66649 2.99667C6.43998 2.59196 5.96509 2.10391 4.99364 2.1H4.97411C4.36695 2.10428 3.81891 2.39346 3.35968 2.94674C2.89888 3.5019 2.53007 4.3208 2.29042 5.37177L2.29041 5.37181C2.00478 6.62175 1.95811 8.01246 2.16055 9.18815C2.36314 10.3648 2.78238 11.1981 3.37489 11.6897L3.43504 11.7396L3.40115 11.81C3.10182 12.432 2.79533 13.0394 2.49781 13.6143L2.46985 13.6683H2.409H0.649889C0.505983 13.6683 0.367972 13.7255 0.266215 13.8273C0.164459 13.929 0.107292 14.067 0.107292 14.2109C0.107292 14.3548 0.164459 14.4929 0.266215 14.5946C0.367972 14.6964 0.505984 14.7535 0.649889 14.7535H1.72704H1.89455L1.81507 14.901C1.35991 15.7454 0.95542 16.4619 0.663275 16.9698C0.517198 17.2237 0.399198 17.4255 0.316985 17.5651C0.275878 17.6349 0.243719 17.6891 0.221475 17.7265L0.19568 17.7698L0.188627 17.7816L0.186653 17.7849L0.186043 17.786L0.184212 17.7891L0.184156 17.7891C0.145472 17.8502 0.119393 17.9184 0.10745 17.9897C0.0955076 18.061 0.0979427 18.134 0.114613 18.2044C0.131283 18.2748 0.161851 18.3411 0.204521 18.3995C0.24719 18.4579 0.3011 18.5071 0.363084 18.5444C0.425066 18.5816 0.49387 18.6061 0.565452 18.6164C0.637035 18.6267 0.70995 18.6226 0.779912 18.6043C0.849874 18.586 0.915471 18.5539 0.972849 18.5098C1.03023 18.4658 1.07823 18.4108 1.11403 18.348L1.1143 18.3475C1.11497 18.3463 1.11804 18.3412 1.12342 18.3321C1.2209 18.1684 2.07531 16.7329 3.09658 14.8067L3.12477 14.7535H3.18493H17.3574C17.5013 14.7535 17.6393 14.6964 17.7411 14.5946C17.8428 14.4929 17.9 14.3548 17.9 14.2109C17.9 14.067 17.8428 13.929 17.7411 13.8273C17.6393 13.7255 17.5013 13.6683 17.3574 13.6683H17.2574V13.6667H3.85163H3.68872L3.76246 13.5215C3.97582 13.1012 4.19004 12.6687 4.40433 12.2289L4.43518 12.1656L4.50521 12.1733C5.07669 12.2365 5.70995 12.0691 6.40513 11.6578C7.10046 11.2464 7.85199 10.5942 8.65612 9.69819L8.76777 9.57378L8.82459 9.73099C8.87215 9.86257 8.92531 9.99825 8.98328 10.1356M14.1445 9.69429C14.1445 9.69402 14.1444 9.69375 14.1444 9.69349L14.1445 9.69429ZM3.81004 10.5763L3.91107 10.7156L3.98207 10.5589C5.11522 8.05768 5.61389 6.42164 5.79794 5.35336C5.9816 4.28736 5.85407 3.77446 5.71735 3.53128C5.67161 3.44857 5.60495 3.35851 5.48607 3.29109C5.36863 3.22448 5.20952 3.18519 4.98742 3.18519C4.63252 3.18519 4.30079 3.45982 4.02594 3.87898C3.74732 4.3039 3.50888 4.90356 3.34689 5.61323C3.12679 6.57731 3.07334 7.58189 3.15819 8.46117C3.24274 9.33739 3.46589 10.1019 3.81004 10.5763Z"
        fill="#19110B"
        stroke="white"
        strokeWidth="0.2"
      />
    </svg>
  );
};

export const EditIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M15.832 3.33398H4.16536C3.70513 3.33398 3.33203 3.70708 3.33203 4.16732V15.834C3.33203 16.2942 3.70513 16.6673 4.16536 16.6673H15.832C16.2923 16.6673 16.6654 16.2942 16.6654 15.834V4.16732C16.6654 3.70708 16.2923 3.33398 15.832 3.33398Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 3.33398V16.6673"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6654 12.5L3.33203 12.5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6654 7.5L3.33203 7.5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const GridLineIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 7H1.5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 13H1.5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 2L7 18"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 2L13 18"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const NetworkIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 7H1.5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 13H1.5"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 2L7 18"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 2L13 18"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DotGridIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9997 11.0026C16.4599 11.0026 16.833 10.6295 16.833 10.1693C16.833 9.70903 16.4599 9.33594 15.9997 9.33594C15.5394 9.33594 15.1663 9.70903 15.1663 10.1693C15.1663 10.6295 15.5394 11.0026 15.9997 11.0026Z"
        fill="#19110B"
      />
      <path
        d="M15.9997 16.8359C16.4599 16.8359 16.833 16.4628 16.833 16.0026C16.833 15.5424 16.4599 15.1693 15.9997 15.1693C15.5394 15.1693 15.1663 15.5424 15.1663 16.0026C15.1663 16.4628 15.5394 16.8359 15.9997 16.8359Z"
        fill="#19110B"
      />
      <path
        d="M15.9997 22.6693C16.4599 22.6693 16.833 22.2962 16.833 21.8359C16.833 21.3757 16.4599 21.0026 15.9997 21.0026C15.5394 21.0026 15.1663 21.3757 15.1663 21.8359C15.1663 22.2962 15.5394 22.6693 15.9997 22.6693Z"
        fill="#19110B"
      />
      <path
        d="M21.833 11.0026C22.2932 11.0026 22.6663 10.6295 22.6663 10.1693C22.6663 9.70903 22.2932 9.33594 21.833 9.33594C21.3728 9.33594 20.9997 9.70903 20.9997 10.1693C20.9997 10.6295 21.3728 11.0026 21.833 11.0026Z"
        fill="#19110B"
      />
      <path
        d="M21.833 16.8359C22.2932 16.8359 22.6663 16.4628 22.6663 16.0026C22.6663 15.5424 22.2932 15.1693 21.833 15.1693C21.3728 15.1693 20.9997 15.5424 20.9997 16.0026C20.9997 16.4628 21.3728 16.8359 21.833 16.8359Z"
        fill="#19110B"
      />
      <path
        d="M21.833 22.6693C22.2932 22.6693 22.6663 22.2962 22.6663 21.8359C22.6663 21.3757 22.2932 21.0026 21.833 21.0026C21.3728 21.0026 20.9997 21.3757 20.9997 21.8359C20.9997 22.2962 21.3728 22.6693 21.833 22.6693Z"
        fill="#19110B"
      />
      <path
        d="M10.1663 11.0026C10.6266 11.0026 10.9997 10.6295 10.9997 10.1693C10.9997 9.70903 10.6266 9.33594 10.1663 9.33594C9.7061 9.33594 9.33301 9.70903 9.33301 10.1693C9.33301 10.6295 9.7061 11.0026 10.1663 11.0026Z"
        fill="#19110B"
      />
      <path
        d="M10.1663 16.8359C10.6266 16.8359 10.9997 16.4628 10.9997 16.0026C10.9997 15.5424 10.6266 15.1693 10.1663 15.1693C9.7061 15.1693 9.33301 15.5424 9.33301 16.0026C9.33301 16.4628 9.7061 16.8359 10.1663 16.8359Z"
        fill="#19110B"
      />
      <path
        d="M10.1663 22.6693C10.6266 22.6693 10.9997 22.2962 10.9997 21.8359C10.9997 21.3757 10.6266 21.0026 10.1663 21.0026C9.7061 21.0026 9.33301 21.3757 9.33301 21.8359C9.33301 22.2962 9.7061 22.6693 10.1663 22.6693Z"
        fill="#19110B"
      />
      <path
        d="M15.9997 11.0026C16.4599 11.0026 16.833 10.6295 16.833 10.1693C16.833 9.70903 16.4599 9.33594 15.9997 9.33594C15.5394 9.33594 15.1663 9.70903 15.1663 10.1693C15.1663 10.6295 15.5394 11.0026 15.9997 11.0026Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9997 16.8359C16.4599 16.8359 16.833 16.4628 16.833 16.0026C16.833 15.5424 16.4599 15.1693 15.9997 15.1693C15.5394 15.1693 15.1663 15.5424 15.1663 16.0026C15.1663 16.4628 15.5394 16.8359 15.9997 16.8359Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9997 22.6693C16.4599 22.6693 16.833 22.2962 16.833 21.8359C16.833 21.3757 16.4599 21.0026 15.9997 21.0026C15.5394 21.0026 15.1663 21.3757 15.1663 21.8359C15.1663 22.2962 15.5394 22.6693 15.9997 22.6693Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.833 11.0026C22.2932 11.0026 22.6663 10.6295 22.6663 10.1693C22.6663 9.70903 22.2932 9.33594 21.833 9.33594C21.3728 9.33594 20.9997 9.70903 20.9997 10.1693C20.9997 10.6295 21.3728 11.0026 21.833 11.0026Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.833 16.8359C22.2932 16.8359 22.6663 16.4628 22.6663 16.0026C22.6663 15.5424 22.2932 15.1693 21.833 15.1693C21.3728 15.1693 20.9997 15.5424 20.9997 16.0026C20.9997 16.4628 21.3728 16.8359 21.833 16.8359Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.833 22.6693C22.2932 22.6693 22.6663 22.2962 22.6663 21.8359C22.6663 21.3757 22.2932 21.0026 21.833 21.0026C21.3728 21.0026 20.9997 21.3757 20.9997 21.8359C20.9997 22.2962 21.3728 22.6693 21.833 22.6693Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1663 11.0026C10.6266 11.0026 10.9997 10.6295 10.9997 10.1693C10.9997 9.70903 10.6266 9.33594 10.1663 9.33594C9.7061 9.33594 9.33301 9.70903 9.33301 10.1693C9.33301 10.6295 9.7061 11.0026 10.1663 11.0026Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1663 16.8359C10.6266 16.8359 10.9997 16.4628 10.9997 16.0026C10.9997 15.5424 10.6266 15.1693 10.1663 15.1693C9.7061 15.1693 9.33301 15.5424 9.33301 16.0026C9.33301 16.4628 9.7061 16.8359 10.1663 16.8359Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1663 22.6693C10.6266 22.6693 10.9997 22.2962 10.9997 21.8359C10.9997 21.3757 10.6266 21.0026 10.1663 21.0026C9.7061 21.0026 9.33301 21.3757 9.33301 21.8359C9.33301 22.2962 9.7061 22.6693 10.1663 22.6693Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SystemQrIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.832 16.666H16.6654"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.668 16.666H13.3346"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.168 14.166L16.668 14.166"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.668 14.166L11.668 16.666"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.668 11.666L16.668 14.166"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.832 11.666L16.6654 11.666"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.668 11.666H13.3346"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M7.4987 11.666H4.16536C3.70513 11.666 3.33203 12.0391 3.33203 12.4993V15.8327C3.33203 16.2929 3.70513 16.666 4.16536 16.666H7.4987C7.95894 16.666 8.33203 16.2929 8.33203 15.8327V12.4993C8.33203 12.0391 7.95894 11.666 7.4987 11.666Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M15.8346 3.33398H12.5013C12.0411 3.33398 11.668 3.70708 11.668 4.16732V7.50065C11.668 7.96089 12.0411 8.33398 12.5013 8.33398H15.8346C16.2949 8.33398 16.668 7.96089 16.668 7.50065V4.16732C16.668 3.70708 16.2949 3.33398 15.8346 3.33398Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M7.4987 3.33398H4.16536C3.70513 3.33398 3.33203 3.70708 3.33203 4.16732V7.50065C3.33203 7.96089 3.70513 8.33398 4.16536 8.33398H7.4987C7.95894 8.33398 8.33203 7.96089 8.33203 7.50065V4.16732C8.33203 3.70708 7.95894 3.33398 7.4987 3.33398Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ScanBarcodeIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M8.67156 16.6512C6.16364 16.6512 4.78302 16.7811 4.00391 16.002C3.22479 15.2228 3.35145 14.504 3.35145 11.9961"
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path
        d="M16.6482 11.9961C16.6482 14.504 16.7791 15.2228 16 16.002C15.2209 16.7811 13.836 16.6512 11.3281 16.6512"
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path
        d="M11.3281 3.35169C13.836 3.35169 15.2209 3.22284 16 4.00195C16.7791 4.78106 16.6482 5.49886 16.6482 8.00678"
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path
        // eslint-disable-next-line max-len
        d="M8.67156 3.35171C6.16364 3.35171 4.78302 3.22284 4.00391 4.00195C3.22479 4.78106 3.35145 5.49888 3.35145 8.0068"
        stroke="#19110B"
        strokeLinecap="round"
      />
      <path d="M3.35156 10H16.6518" stroke="#19110B" strokeLinecap="round" />
    </svg>
  );
};

export const PaintBucketIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_412_42017)">
        <path
          // eslint-disable-next-line max-len
          d="M4.16653 1.66797L8.3332 5.83463M1.66653 10.8346H14.1665M15.8332 9.16797L9.16653 2.5013L1.99987 9.66797C1.69449 9.97952 1.52344 10.3984 1.52344 10.8346C1.52344 11.2709 1.69449 11.6898 1.99987 12.0013L6.3332 16.3346C6.99987 17.0013 7.99987 17.0013 8.66653 16.3346L15.8332 9.16797ZM18.3332 16.668C18.3332 17.11 18.1576 17.5339 17.845 17.8465C17.5325 18.159 17.1086 18.3346 16.6665 18.3346C16.2245 18.3346 15.8006 18.159 15.488 17.8465C15.1755 17.5339 14.9999 17.11 14.9999 16.668C14.9999 15.3346 16.6665 13.3346 16.6665 13.3346C16.6665 13.3346 18.3332 15.3346 18.3332 16.668Z"
          stroke="#19110B"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_412_42017">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DesignToolIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M6.21094 6.09928L5.96094 6.53229H5.96094L6.21094 6.09928ZM5.79916 5.6875L6.23217 5.4375L5.79916 5.6875ZM14.4978 5.6875L14.0647 5.4375L14.4978 5.6875ZM14.086 6.09928L14.336 6.53229L14.086 6.09928ZM14.086 2.65072L14.336 2.21771L14.086 2.65072ZM14.4978 3.0625L14.0647 3.3125L14.4978 3.0625ZM6.21094 2.65072L5.96094 2.21771L6.21094 2.65072ZM5.79916 3.0625L6.23217 3.3125L5.79916 3.0625ZM11.4288 17.2803L11.0752 16.9268L11.4288 17.2803ZM11.4288 11.7197L11.0752 12.0732L11.4288 11.7197ZM8.86812 11.7197L8.51457 11.3661L8.86812 11.7197ZM8.86812 17.2803L9.22167 16.9268V16.9268L8.86812 17.2803ZM12.7034 9.24175L12.6293 8.74728L12.7034 9.24175ZM15.7609 8.78313L15.6868 8.28866L15.7609 8.78313ZM17.5442 5.3255L18.0095 5.14233V5.14233L17.5442 5.3255ZM16.698 4.47928L16.5148 4.94452L16.698 4.47928ZM16.8523 8.53284L16.6177 8.0913L16.8523 8.53284ZM17.5629 7.70777L18.0343 7.87428L18.0343 7.87428L17.5629 7.70777ZM10.5118 9.93795L10.133 9.61167L10.5118 9.93795ZM10.152 11.5V12H10.6437L10.6519 11.5084L10.152 11.5ZM5.27344 3.875C4.9973 3.875 4.77344 4.09886 4.77344 4.375C4.77344 4.65114 4.9973 4.875 5.27344 4.875V3.875ZM7.52345 3H12.7735V2H7.52345V3ZM12.7735 5.75H7.52345V6.75H12.7735V5.75ZM7.52345 5.75C7.16376 5.75 6.92743 5.74952 6.74736 5.7332C6.57417 5.7175 6.50269 5.69037 6.46094 5.66627L5.96094 6.53229C6.18025 6.65891 6.41454 6.70714 6.6571 6.72912C6.89278 6.75048 7.18217 6.75 7.52345 6.75V5.75ZM5.14844 4.375C5.14844 4.71628 5.14796 5.00567 5.16932 5.24135C5.1913 5.4839 5.23953 5.71819 5.36615 5.9375L6.23217 5.4375C6.20807 5.39575 6.18094 5.32428 6.16524 5.15108C6.14892 4.97101 6.14844 4.73468 6.14844 4.375H5.14844ZM6.46094 5.66627C6.36593 5.61141 6.28703 5.53251 6.23217 5.4375L5.36615 5.9375C5.50877 6.18453 5.71391 6.38967 5.96094 6.53229L6.46094 5.66627ZM14.1485 4.375C14.1485 4.73468 14.148 4.97101 14.1317 5.15108C14.116 5.32427 14.0888 5.39575 14.0647 5.4375L14.9308 5.9375C15.0574 5.71819 15.1056 5.4839 15.1276 5.24135C15.149 5.00567 15.1485 4.71628 15.1485 4.375H14.1485ZM12.7735 6.75C13.1147 6.75 13.4041 6.75048 13.6398 6.72912C13.8824 6.70714 14.1167 6.65891 14.336 6.53229L13.836 5.66627C13.7942 5.69037 13.7227 5.7175 13.5496 5.7332C13.3695 5.74952 13.1332 5.75 12.7735 5.75V6.75ZM14.0647 5.4375C14.0099 5.53251 13.931 5.61141 13.836 5.66627L14.336 6.53229C14.583 6.38967 14.7881 6.18453 14.9308 5.9375L14.0647 5.4375ZM12.7735 3C13.1332 3 13.3695 3.00048 13.5496 3.0168C13.7227 3.0325 13.7942 3.05963 13.836 3.08373L14.336 2.21771C14.1167 2.09109 13.8824 2.04286 13.6398 2.02088C13.4041 1.99952 13.1147 2 12.7735 2V3ZM15.1485 4.375C15.1485 4.03372 15.149 3.74433 15.1276 3.50865C15.1056 3.2661 15.0574 3.03181 14.9308 2.8125L14.0647 3.3125C14.0888 3.35425 14.116 3.42573 14.1317 3.59892C14.148 3.77899 14.1485 4.01532 14.1485 4.375H15.1485ZM13.836 3.08373C13.931 3.13859 14.0099 3.21749 14.0647 3.3125L14.9308 2.8125C14.7881 2.56547 14.583 2.36033 14.336 2.21771L13.836 3.08373ZM7.52345 2C7.18217 2 6.89278 1.99952 6.6571 2.02088C6.41455 2.04286 6.18025 2.09109 5.96094 2.21771L6.46094 3.08373C6.50269 3.05963 6.57417 3.0325 6.74736 3.0168C6.92743 3.00048 7.16376 3 7.52345 3V2ZM6.14844 4.375C6.14844 4.01532 6.14892 3.77898 6.16524 3.59892C6.18094 3.42572 6.20807 3.35425 6.23217 3.3125L5.36615 2.8125C5.23953 3.03181 5.1913 3.2661 5.16932 3.50865C5.14796 3.74433 5.14844 4.03372 5.14844 4.375H6.14844ZM5.96094 2.21771C5.71391 2.36033 5.50877 2.56547 5.36615 2.8125L6.23217 3.3125C6.28703 3.21749 6.36593 3.13859 6.46094 3.08373L5.96094 2.21771ZM9.14845 16V13H8.14845V16H9.14845ZM11.1485 13V16H12.1485V13H11.1485ZM11.1485 16C11.1485 16.3677 11.1474 16.5932 11.1255 16.7563C11.1055 16.9051 11.0767 16.9253 11.0752 16.9268L11.7823 17.6339C12.0006 17.4157 12.0816 17.1493 12.1165 16.8896C12.1495 16.6443 12.1485 16.3394 12.1485 16H11.1485ZM10.1485 18C10.4879 18 10.7927 18.0011 11.038 17.9681C11.2977 17.9332 11.5641 17.8521 11.7823 17.6339L11.0752 16.9268C11.0738 16.9282 11.0536 16.957 10.9048 16.977C10.7416 16.9989 10.5161 17 10.1485 17V18ZM10.1485 12C10.5161 12 10.7416 12.0011 10.9048 12.023C11.0536 12.043 11.0738 12.0718 11.0752 12.0732L11.7823 11.3661C11.5641 11.1479 11.2977 11.0668 11.038 11.0319C10.7927 10.9989 10.4879 11 10.1485 11V12ZM12.1485 13C12.1485 12.6606 12.1495 12.3557 12.1165 12.1104C12.0816 11.8507 12.0006 11.5843 11.7823 11.3661L11.0752 12.0732C11.0767 12.0747 11.1055 12.0949 11.1255 12.2437C11.1474 12.4068 11.1485 12.6323 11.1485 13H12.1485ZM9.14845 13C9.14845 12.6323 9.14951 12.4068 9.17145 12.2437C9.19146 12.0949 9.22022 12.0747 9.22168 12.0732L8.51457 11.3661C8.29635 11.5843 8.21528 11.8507 8.18037 12.1104C8.14739 12.3557 8.14845 12.6606 8.14845 13H9.14845ZM10.1485 11C9.80904 11 9.50417 10.9989 9.25888 11.0319C8.9992 11.0668 8.73279 11.1479 8.51457 11.3661L9.22168 12.0732C9.22313 12.0718 9.24333 12.043 9.39212 12.023C9.5553 12.0011 9.78077 12 10.1485 12V11ZM8.14845 16C8.14845 16.3394 8.14739 16.6443 8.18037 16.8896C8.21528 17.1493 8.29635 17.4157 8.51457 17.6339L9.22167 16.9268C9.22022 16.9253 9.19146 16.9051 9.17145 16.7563C9.14951 16.5932 9.14845 16.3677 9.14845 16H8.14845ZM10.1485 17C9.78077 17 9.5553 16.9989 9.39212 16.977C9.24333 16.957 9.22313 16.9282 9.22167 16.9268L8.51457 17.6339C8.73279 17.8521 8.9992 17.9332 9.25888 17.9681C9.50417 18.0011 9.80904 18 10.1485 18V17ZM12.7776 9.73622L15.8351 9.2776L15.6868 8.28866L12.6293 8.74728L12.7776 9.73622ZM15.4322 3.875H14.6485V4.875H15.4322V3.875ZM18.1485 6.59133C18.1485 6.2642 18.1487 5.99494 18.1344 5.77496C18.1198 5.55077 18.0885 5.34313 18.0095 5.14233L17.079 5.50866C17.1042 5.57272 17.1251 5.66434 17.1365 5.84002C17.1482 6.01992 17.1485 6.25114 17.1485 6.59133H18.1485ZM15.4322 4.875C15.7723 4.875 16.0036 4.87525 16.1835 4.88698C16.3591 4.89843 16.4508 4.9193 16.5148 4.94452L16.8812 4.01403C16.6804 3.93498 16.4727 3.90371 16.2485 3.88909C16.0285 3.87475 15.7593 3.875 15.4322 3.875V4.875ZM18.0095 5.14233C17.8062 4.62599 17.3975 4.21732 16.8812 4.01403L16.5148 4.94452C16.773 5.04616 16.9773 5.2505 17.079 5.50866L18.0095 5.14233ZM15.8351 9.2776C16.3715 9.19714 16.7655 9.14518 17.0869 8.97438L16.6177 8.0913C16.485 8.16179 16.3028 8.19626 15.6868 8.28866L15.8351 9.2776ZM17.1485 6.59133C17.1485 7.21428 17.1414 7.3996 17.0914 7.54125L18.0343 7.87428C18.1555 7.53106 18.1485 7.13371 18.1485 6.59133H17.1485ZM17.0869 8.97438C17.5294 8.73929 17.8675 8.3467 18.0343 7.87428L17.0914 7.54125C17.008 7.77746 16.8389 7.97375 16.6177 8.0913L17.0869 8.97438ZM12.6293 8.74728C12.0327 8.83677 11.539 8.9099 11.1515 9.01884C10.7506 9.13158 10.4032 9.29788 10.133 9.61167L10.8907 10.2642C10.9839 10.156 11.1229 10.0657 11.4222 9.9815C11.735 9.89354 12.1554 9.82956 12.7776 9.73622L12.6293 8.74728ZM10.6519 11.5084C10.6652 10.7115 10.7379 10.4416 10.8907 10.2642L10.133 9.61167C9.71399 10.0982 9.66474 10.7327 9.65205 11.4916L10.6519 11.5084ZM10.1485 12H10.152V11H10.1485V12ZM5.64844 3.875H5.27344V4.875H5.64844V3.875Z"
        fill="#19110B"
      />
    </svg>
  );
};

export const SecurityIcon = (props: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        // eslint-disable-next-line max-len
        d="M2 13.5C2 11.3787 2 10.318 2.65902 9.65901C3.31805 9 4.37873 9 6.5001 9H12.5002C14.6216 9 15.6823 9 16.3413 9.65901C17.0003 10.318 17.0003 11.3787 17.0003 13.5C17.0003 15.6213 17.0003 16.682 16.3413 17.341C15.6823 18 14.6216 18 12.5002 18H6.5001C4.37873 18 3.31805 18 2.65902 17.341C2 16.682 2 15.6213 2 13.5Z"
        stroke={props.color}
      />
      <path
        d="M5 9.00001V7.50001C5 5.01472 7.01476 3 9.5001 3C11.597 3 13.3589 4.43412 13.8584 6.37501"
        stroke={props.color}
        strokeLinecap="round"
      />
      <path d="M9.5 12V15" stroke={props.color} strokeLinecap="round" />
    </svg>
  );
};
export const PlusIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 8H12"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12L8 4"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowLeftIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12L5 12"
        stroke="#19110B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 18L5 12L11 6"
        stroke="#19110B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const QrAlignLeftIcon = ({ color }: { color?: any }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 1.66602V18.3327"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M5.83398 6.24935C5.83398 5.4705 5.83398 5.08108 6.00145 4.79102C6.11116 4.60099 6.26896 4.44319 6.45898 4.33348C6.74905 4.16602 7.13847 4.16602 7.91732 4.16602H15.4173C16.1962 4.16602 16.5856 4.16602 16.8757 4.33348C17.0657 4.44319 17.2235 4.60099 17.3332 4.79102C17.5007 5.08108 17.5007 5.4705 17.5007 6.24935C17.5007 7.0282 17.5007 7.41762 17.3332 7.70768C17.2235 7.89771 17.0657 8.0555 16.8757 8.16521C16.5856 8.33268 16.1962 8.33268 15.4173 8.33268H7.91732C7.13847 8.33268 6.74905 8.33268 6.45898 8.16521C6.26896 8.0555 6.11116 7.89771 6.00145 7.70768C5.83398 7.41762 5.83398 7.0282 5.83398 6.24935Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
      <path
        d="M5.83398 13.7493C5.83398 12.9705 5.83398 12.5811 6.00145 12.291C6.11116 12.101 6.26896 11.9432 6.45898 11.8335C6.74905 11.666 7.13847 11.666 7.91732 11.666H12.9173C13.6962 11.666 14.0856 11.666 14.3757 11.8335C14.5657 11.9432 14.7235 12.101 14.8332 12.291C15.0007 12.5811 15.0007 12.9705 15.0007 13.7493C15.0007 14.5282 15.0007 14.9176 14.8332 15.2077C14.7235 15.3977 14.5657 15.5555 14.3757 15.6652C14.0856 15.8327 13.6962 15.8327 12.9173 15.8327H7.91732C7.13847 15.8327 6.74905 15.8327 6.45898 15.6652C6.26896 15.5555 6.11116 15.3977 6.00145 15.2077C5.83398 14.9176 5.83398 14.5282 5.83398 13.7493Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
    </svg>
  );
};
export const QrAlignRightIcon = ({ color }: { color?: any }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 1.66602V18.3327"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M14.1667 6.24935C14.1667 5.4705 14.1667 5.08108 13.9992 4.79102C13.8895 4.60099 13.7317 4.44319 13.5417 4.33348C13.2516 4.16602 12.8622 4.16602 12.0833 4.16602H4.58333C3.80449 4.16602 3.41506 4.16602 3.125 4.33348C2.93498 4.44319 2.77718 4.60099 2.66747 4.79102C2.5 5.08108 2.5 5.4705 2.5 6.24935C2.5 7.0282 2.5 7.41762 2.66747 7.70768C2.77718 7.89771 2.93498 8.0555 3.125 8.16521C3.41506 8.33268 3.80449 8.33268 4.58333 8.33268H12.0833C12.8622 8.33268 13.2516 8.33268 13.5417 8.16521C13.7317 8.0555 13.8895 7.89771 13.9992 7.70768C14.1667 7.41762 14.1667 7.0282 14.1667 6.24935Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
      <path
        d="M14.1667 13.7493C14.1667 12.9705 14.1667 12.5811 13.9992 12.291C13.8895 12.101 13.7317 11.9432 13.5417 11.8335C13.2516 11.666 12.8622 11.666 12.0833 11.666H7.08333C6.30449 11.666 5.91506 11.666 5.625 11.8335C5.43498 11.9432 5.27718 12.101 5.16747 12.291C5 12.5811 5 12.9705 5 13.7493C5 14.5282 5 14.9176 5.16747 15.2077C5.27718 15.3977 5.43498 15.5555 5.625 15.6652C5.91506 15.8327 6.30449 15.8327 7.08333 15.8327H12.0833C12.8622 15.8327 13.2516 15.8327 13.5417 15.6652C13.7317 15.5555 13.8895 15.3977 13.9992 15.2077C14.1667 14.9176 14.1667 14.5282 14.1667 13.7493Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
    </svg>
  );
};
export const QrAlignBottomIcon = ({ color }: { color?: any }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66602 17.5L18.3327 17.5"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6.24935 14.1667C5.4705 14.1667 5.08108 14.1667 4.79102 13.9992C4.60099 13.8895 4.44319 13.7317 4.33348 13.5417C4.16602 13.2516 4.16602 12.8622 4.16602 12.0833L4.16602 4.58333C4.16602 3.80449 4.16602 3.41506 4.33348 3.125C4.44319 2.93498 4.60099 2.77718 4.79102 2.66747C5.08108 2.5 5.4705 2.5 6.24935 2.5C7.0282 2.5 7.41762 2.5 7.70768 2.66747C7.89771 2.77718 8.0555 2.93498 8.16521 3.125C8.33268 3.41506 8.33268 3.80449 8.33268 4.58333L8.33268 12.0833C8.33268 12.8622 8.33268 13.2516 8.16521 13.5417C8.0555 13.7317 7.89771 13.8895 7.70768 13.9992C7.41762 14.1667 7.0282 14.1667 6.24935 14.1667Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
      <path
        d="M13.7493 14.1667C12.9705 14.1667 12.5811 14.1667 12.291 13.9992C12.101 13.8895 11.9432 13.7317 11.8335 13.5417C11.666 13.2516 11.666 12.8622 11.666 12.0833L11.666 7.08333C11.666 6.30449 11.666 5.91506 11.8335 5.625C11.9432 5.43498 12.101 5.27718 12.291 5.16747C12.5811 5 12.9705 5 13.7493 5C14.5282 5 14.9176 5 15.2077 5.16747C15.3977 5.27718 15.5555 5.43498 15.6652 5.625C15.8327 5.91506 15.8327 6.30449 15.8327 7.08333L15.8327 12.0833C15.8327 12.8622 15.8327 13.2516 15.6652 13.5417C15.5555 13.7317 15.3977 13.8895 15.2077 13.9992C14.9176 14.1667 14.5282 14.1667 13.7493 14.1667Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
    </svg>
  );
};
export const QrAlignVerticalIcon = ({ color }: { color?: any }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66602 10L4.16602 10M18.3327 10L15.8327 10M11.666 10L8.33268 10"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6.24935 4.16602C5.4705 4.16602 5.08108 4.16602 4.79102 4.33348C4.60099 4.44319 4.44319 4.60099 4.33348 4.79102C4.16602 5.08108 4.16602 5.4705 4.16602 6.24935L4.16602 13.7493C4.16602 14.5282 4.16602 14.9176 4.33348 15.2077C4.44319 15.3977 4.60099 15.5555 4.79102 15.6652C5.08108 15.8327 5.4705 15.8327 6.24935 15.8327C7.0282 15.8327 7.41762 15.8327 7.70768 15.6652C7.89771 15.5555 8.0555 15.3977 8.16521 15.2077C8.33268 14.9176 8.33268 14.5282 8.33268 13.7493L8.33268 6.24935C8.33268 5.4705 8.33268 5.08108 8.16521 4.79102C8.0555 4.60099 7.89771 4.44319 7.70768 4.33348C7.41762 4.16602 7.0282 4.16602 6.24935 4.16602Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
      <path
        d="M13.7493 5.83398C12.9705 5.83398 12.5811 5.83398 12.291 6.00145C12.101 6.11116 11.9432 6.26896 11.8335 6.45898C11.666 6.74905 11.666 7.13847 11.666 7.91732L11.666 12.084C11.666 12.8628 11.666 13.2523 11.8335 13.5423C11.9432 13.7323 12.101 13.8901 12.291 13.9998C12.5811 14.1673 12.9705 14.1673 13.7493 14.1673C14.5282 14.1673 14.9176 14.1673 15.2077 13.9998C15.3977 13.8901 15.5555 13.7323 15.6652 13.5423C15.8327 13.2523 15.8327 12.8628 15.8327 12.084V7.91732C15.8327 7.13847 15.8327 6.74905 15.6652 6.45898C15.5555 6.26896 15.3977 6.11116 15.2077 6.00145C14.9176 5.83398 14.5282 5.83398 13.7493 5.83398Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
    </svg>
  );
};
export const QrAlignTopIcon = ({ color }: { color?: any }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.66602 2.5L18.3327 2.5"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6.24935 5.83398C5.4705 5.83398 5.08108 5.83398 4.79102 6.00145C4.60099 6.11116 4.44319 6.26896 4.33348 6.45898C4.16602 6.74905 4.16602 7.13847 4.16602 7.91732L4.16602 15.4173C4.16602 16.1962 4.16602 16.5856 4.33348 16.8757C4.44319 17.0657 4.60099 17.2235 4.79102 17.3332C5.08108 17.5007 5.4705 17.5007 6.24935 17.5007C7.0282 17.5007 7.41762 17.5007 7.70768 17.3332C7.89771 17.2235 8.0555 17.0657 8.16521 16.8757C8.33268 16.5856 8.33268 16.1962 8.33268 15.4173L8.33268 7.91732C8.33268 7.13847 8.33268 6.74905 8.16521 6.45898C8.0555 6.26896 7.89771 6.11116 7.70768 6.00145C7.41762 5.83398 7.0282 5.83398 6.24935 5.83398Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
      <path
        d="M13.7493 5.83398C12.9705 5.83398 12.5811 5.83398 12.291 6.00145C12.101 6.11116 11.9432 6.26896 11.8335 6.45898C11.666 6.74905 11.666 7.13847 11.666 7.91732L11.666 12.9173C11.666 13.6962 11.666 14.0856 11.8335 14.3757C11.9432 14.5657 12.101 14.7235 12.291 14.8332C12.5811 15.0007 12.9705 15.0007 13.7493 15.0007C14.5282 15.0007 14.9176 15.0006 15.2077 14.8332C15.3977 14.7235 15.5555 14.5657 15.6652 14.3757C15.8327 14.0856 15.8327 13.6962 15.8327 12.9173L15.8327 7.91732C15.8327 7.13847 15.8327 6.74905 15.6652 6.45898C15.5555 6.26896 15.3977 6.11116 15.2077 6.00145C14.9176 5.83398 14.5282 5.83398 13.7493 5.83398Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
    </svg>
  );
};
export const QrAlignHorizontalIcon = ({ color }: { color?: any }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 1.66602L10 4.16602M10 18.3327L10 15.8327M10 11.666L10 8.33268"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M4.16602 6.24935C4.16602 5.4705 4.16602 5.08108 4.33348 4.79102C4.44319 4.60099 4.60099 4.44319 4.79102 4.33348C5.08108 4.16602 5.4705 4.16602 6.24935 4.16602H13.7493C14.5282 4.16602 14.9176 4.16602 15.2077 4.33348C15.3977 4.44319 15.5555 4.60099 15.6652 4.79102C15.8327 5.08108 15.8327 5.4705 15.8327 6.24935C15.8327 7.0282 15.8327 7.41762 15.6652 7.70768C15.5555 7.89771 15.3977 8.0555 15.2077 8.16521C14.9176 8.33268 14.5282 8.33268 13.7493 8.33268H6.24935C5.4705 8.33268 5.08108 8.33268 4.79102 8.16521C4.60099 8.0555 4.44319 7.89771 4.33348 7.70768C4.16602 7.41762 4.16602 7.0282 4.16602 6.24935Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
      <path
        d="M5.83398 13.7493C5.83398 12.9705 5.83398 12.5811 6.00145 12.291C6.11116 12.101 6.26896 11.9432 6.45898 11.8335C6.74905 11.666 7.13847 11.666 7.91732 11.666H12.084C12.8628 11.666 13.2523 11.666 13.5423 11.8335C13.7323 11.9432 13.8901 12.101 13.9998 12.291C14.1673 12.5811 14.1673 12.9705 14.1673 13.7493C14.1673 14.5282 14.1673 14.9176 13.9998 15.2077C13.8901 15.3977 13.7323 15.5555 13.5423 15.6652C13.2523 15.8327 12.8628 15.8327 12.084 15.8327H7.91732C7.13847 15.8327 6.74905 15.8327 6.45898 15.6652C6.26896 15.5555 6.11116 15.3977 6.00145 15.2077C5.83398 14.9176 5.83398 14.5282 5.83398 13.7493Z"
        stroke={color ? color : "#19110B"}
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const EyeIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.01677 10.5937C1.90328 10.414 1.84654 10.3241 1.81477 10.1855C1.79091 10.0814 1.79091 9.91727 1.81477 9.81317C1.84654 9.67458 1.90328 9.58473 2.01677 9.40503C2.95461 7.92005 5.74617 4.16602 10.0003 4.16602C14.2545 4.16602 17.0461 7.92005 17.9839 9.40503C18.0974 9.58473 18.1541 9.67458 18.1859 9.81317C18.2098 9.91727 18.2098 10.0814 18.1859 10.1855C18.1541 10.3241 18.0974 10.414 17.9839 10.5937C17.0461 12.0786 14.2545 15.8327 10.0003 15.8327C5.74617 15.8327 2.95461 12.0786 2.01677 10.5937Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0003 12.4993C11.381 12.4993 12.5003 11.3801 12.5003 9.99935C12.5003 8.61864 11.381 7.49935 10.0003 7.49935C8.61962 7.49935 7.50034 8.61864 7.50034 9.99935C7.50034 11.3801 8.61962 12.4993 10.0003 12.4993Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const RulerIcon = (props: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.084 4.58389L13.334 5.83389M9.58396 7.08389L10.834 8.33389M7.08396 9.58389L8.33396 10.8339M4.58396 12.0839L5.83396 13.3339M2.13866 14.6387L5.36252 17.8625C5.52752 18.0275 5.61003 18.11 5.70516 18.1409C5.78885 18.1681 5.87899 18.1681 5.96268 18.1409C6.05782 18.11 6.14032 18.0275 6.30533 17.8625L17.8625 6.30533C18.0275 6.14032 18.11 6.05782 18.1409 5.96268C18.1681 5.87899 18.1681 5.78885 18.1409 5.70516C18.11 5.61003 18.0275 5.52752 17.8625 5.36252L14.6387 2.13866C14.4737 1.97365 14.3911 1.89115 14.296 1.86024C14.2123 1.83305 14.1222 1.83305 14.0385 1.86024C13.9434 1.89115 13.8609 1.97365 13.6959 2.13866L2.13866 13.6959C1.97365 13.8609 1.89115 13.9434 1.86024 14.0385C1.83305 14.1222 1.83305 14.2123 1.86024 14.296C1.89115 14.3911 1.97365 14.4737 2.13866 14.6387Z"
        stroke={props.color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AnchorIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="14" height="14" stroke="black" />
      <rect
        x="2.16602"
        y="2.16406"
        width="2.33333"
        height="2.33333"
        fill="white"
        stroke="black"
      />
      <rect
        x="15.5"
        y="2.16406"
        width="2.33333"
        height="2.33333"
        fill="white"
        stroke="black"
      />
      <rect
        x="15.5"
        y="15.5"
        width="2.33333"
        height="2.33333"
        fill="white"
        stroke="black"
      />
      <rect
        x="2.16602"
        y="15.5"
        width="2.33333"
        height="2.33333"
        fill="white"
        stroke="black"
      />
      <rect
        x="8.83398"
        y="8.83594"
        width="2.33333"
        height="2.33333"
        rx="1.16667"
        fill="white"
        stroke="black"
      />
    </svg>
  );
};

export const PrintIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 12.554L1.5 12.554L1 12.554ZM1 5.44351L0.5 5.44351L1 5.44351ZM1.88882 4.55469L1.88882 5.05469L1.88882 4.55469ZM16.1099 4.55469V5.05469V4.55469ZM16.9987 5.4435H17.4987V5.4435L16.9987 5.4435ZM16.9987 12.554H16.4987H16.9987ZM3.66645 13.9429C3.94259 13.9429 4.16645 13.719 4.16645 13.4429C4.16645 13.1667 3.94259 12.9429 3.66645 12.9429V13.9429ZM1.88882 13.4429V12.9429V13.4429ZM16.1099 13.4429V13.9429V13.4429ZM14.3322 12.9429C14.0561 12.9429 13.8322 13.1667 13.8322 13.4429C13.8322 13.719 14.0561 13.9429 14.3322 13.9429V12.9429ZM1.5 12.554L1.5 5.44351L0.5 5.44351L0.500001 12.554L1.5 12.554ZM1.88882 5.05469L16.1099 5.05469V4.05469L1.88882 4.05469L1.88882 5.05469ZM16.4987 5.4435V12.554H17.4987V5.4435H16.4987ZM3.66645 12.9429H1.88882V13.9429H3.66645V12.9429ZM16.1099 12.9429H14.3322V13.9429H16.1099V12.9429ZM16.1099 5.05469C16.3246 5.05469 16.4987 5.22877 16.4987 5.4435L17.4987 5.4435C17.4987 4.67648 16.8769 4.05469 16.1099 4.05469V5.05469ZM1.5 5.44351C1.5 5.22877 1.67408 5.05469 1.88882 5.05469L1.88882 4.05469C1.12179 4.05469 0.5 4.67648 0.5 5.44351L1.5 5.44351ZM0.500001 12.554C0.500001 13.3211 1.1218 13.9429 1.88882 13.9429L1.88882 12.9429C1.67408 12.9429 1.5 12.7688 1.5 12.554L0.500001 12.554ZM16.4987 12.554C16.4987 12.7688 16.3246 12.9429 16.1099 12.9429V13.9429C16.8769 13.9429 17.4987 13.3211 17.4987 12.554H16.4987Z"
        fill="#ffffff"
      />
      <path
        d="M13.441 17.0009V16.5009V17.0009ZM4.55288 17.0009L4.55288 17.5009L4.55288 17.0009ZM3.66406 16.1121H3.16406H3.66406ZM3.66406 12.5568L3.16406 12.5568L3.66406 12.5568ZM13.441 11.668V12.168V11.668ZM14.3299 12.5568H14.8299V12.5568L14.3299 12.5568ZM14.3299 16.1121H13.8299H14.3299ZM13.441 16.5009L4.55288 16.5009L4.55288 17.5009L13.441 17.5009V16.5009ZM4.16406 16.1121L4.16406 12.5568L3.16406 12.5568L3.16406 16.1121H4.16406ZM4.55288 12.168L13.441 12.168V11.168L4.55288 11.168L4.55288 12.168ZM13.8299 12.5568V16.1121H14.8299V12.5568H13.8299ZM13.441 12.168C13.6558 12.168 13.8299 12.342 13.8299 12.5568L14.8299 12.5568C14.8299 11.7898 14.2081 11.168 13.441 11.168V12.168ZM4.16406 12.5568C4.16406 12.342 4.33814 12.168 4.55288 12.168L4.55288 11.168C3.78586 11.168 3.16406 11.7898 3.16406 12.5568L4.16406 12.5568ZM4.55288 16.5009C4.33814 16.5009 4.16406 16.3268 4.16406 16.1121H3.16406C3.16406 16.8791 3.78586 17.5009 4.55288 17.5009L4.55288 16.5009ZM13.441 17.5009C14.2081 17.5009 14.8299 16.8791 14.8299 16.1121H13.8299C13.8299 16.3268 13.6558 16.5009 13.441 16.5009V17.5009Z"
        fill="#ffffff"
      />
      <path
        d="M7.22266 7.60938C6.94651 7.60938 6.72266 7.83323 6.72266 8.10938C6.72266 8.38552 6.94651 8.60938 7.22266 8.60938V7.60938ZM10.7779 8.60938C11.0541 8.60938 11.2779 8.38552 11.2779 8.10938C11.2779 7.83323 11.0541 7.60938 10.7779 7.60938V8.60938ZM7.22266 8.60938H10.7779V7.60938H7.22266V8.60938Z"
        fill="#ffffff"
      />
      <path
        d="M13.441 4.55527V4.05527V4.55527ZM4.55288 4.55527V5.05527V4.55527ZM3.66406 3.66645H3.16406H3.66406ZM3.66406 1.88882L4.16406 1.88882L3.66406 1.88882ZM4.55288 1L4.55288 1.5L4.55288 1ZM13.441 1V1.5V1ZM14.3299 1.88882H14.8299V1.88882L14.3299 1.88882ZM14.3299 3.66645H13.8299H14.3299ZM13.441 4.05527L4.55288 4.05527L4.55288 5.05527L13.441 5.05527V4.05527ZM4.16406 3.66645L4.16406 1.88882L3.16406 1.88882L3.16406 3.66645H4.16406ZM4.55288 1.5L13.441 1.5V0.5L4.55288 0.500001L4.55288 1.5ZM13.8299 1.88882V3.66645H14.8299V1.88882H13.8299ZM13.441 1.5C13.6558 1.5 13.8299 1.67408 13.8299 1.88882L14.8299 1.88882C14.8299 1.12179 14.2081 0.5 13.441 0.5V1.5ZM4.16406 1.88882C4.16406 1.67408 4.33814 1.5 4.55288 1.5L4.55288 0.500001C3.78586 0.500001 3.16406 1.12179 3.16406 1.88882L4.16406 1.88882ZM4.55288 4.05527C4.33814 4.05527 4.16406 3.88119 4.16406 3.66645H3.16406C3.16406 4.43347 3.78586 5.05527 4.55288 5.05527L4.55288 4.05527ZM13.441 5.05527C14.2081 5.05527 14.8299 4.43347 14.8299 3.66645L13.8299 3.66645C13.8299 3.88119 13.6558 4.05527 13.441 4.05527V5.05527Z"
        fill="#ffffff"
      />
    </svg>
  );
};
export const WarningIcon = (props: any) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.extraClass}
    >
      <path
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.33398V10.6673"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9668 5.33398H8.03346V5.40065H7.9668V5.33398Z"
        stroke="#000000"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MarginBottom = () => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.35355 0.646446C6.15829 0.451184 5.84171 0.451184 5.64645 0.646446L2.46447 3.82843C2.2692 4.02369 2.2692 4.34027 2.46447 4.53553C2.65973 4.7308 2.97631 4.7308 3.17157 4.53553L6 1.70711L8.82843 4.53553C9.02369 4.7308 9.34027 4.7308 9.53553 4.53553C9.7308 4.34027 9.7308 4.02369 9.53553 3.82843L6.35355 0.646446ZM6.5 11L6.5 1L5.5 1L5.5 11L6.5 11Z"
        fill="black"
      />
      <line x1="0.5" y1="12.5" x2="11.5" y2="12.5" stroke="black" />
    </svg>
  );
};

export const MarginTop = () => {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.64645 12.3536C5.84171 12.5488 6.15829 12.5488 6.35355 12.3536L9.53553 9.17157C9.7308 8.97631 9.7308 8.65973 9.53553 8.46447C9.34027 8.2692 9.02369 8.2692 8.82843 8.46447L6 11.2929L3.17157 8.46447C2.97631 8.2692 2.65973 8.2692 2.46447 8.46447C2.2692 8.65973 2.2692 8.97631 2.46447 9.17157L5.64645 12.3536ZM5.5 2L5.5 12L6.5 12L6.5 2L5.5 2Z"
        fill="black"
      />
      <line x1="11.5" y1="0.5" x2="0.5" y2="0.500001" stroke="black" />
    </svg>
  );
};

export const MarginLeft = () => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3536 6.35355C12.5488 6.15829 12.5488 5.84171 12.3536 5.64645L9.17157 2.46447C8.97631 2.2692 8.65973 2.2692 8.46447 2.46447C8.2692 2.65973 8.2692 2.97631 8.46447 3.17157L11.2929 6L8.46447 8.82843C8.2692 9.02369 8.2692 9.34027 8.46447 9.53553C8.65973 9.7308 8.97631 9.7308 9.17157 9.53553L12.3536 6.35355ZM2 6.5H12V5.5H2V6.5Z"
        fill="black"
      />
      <line x1="0.5" y1="0.5" x2="0.5" y2="11.5" stroke="black" />
    </svg>
  );
};

export const MarginRight = () => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.646446 5.64645C0.451184 5.84171 0.451184 6.15829 0.646446 6.35355L3.82843 9.53553C4.02369 9.7308 4.34027 9.7308 4.53553 9.53553C4.7308 9.34027 4.7308 9.02369 4.53553 8.82843L1.70711 6L4.53553 3.17157C4.7308 2.97631 4.7308 2.65973 4.53553 2.46447C4.34027 2.2692 4.02369 2.2692 3.82843 2.46447L0.646446 5.64645ZM11 5.5L1 5.5L1 6.5L11 6.5L11 5.5Z"
        fill="black"
      />
      <line x1="12.5" y1="11.5" x2="12.5" y2="0.5" stroke="black" />
    </svg>
  );
};
export const ExpandIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3L3 8M3 3L8 3M8 16L3 21M3 21H8M3 21L3 16M16 16L21 21M21 21V16M21 21H16"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
        stroke="#5E626D"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SortingIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 12.6641L18.5 12.6641M18.5 12.6641C18.5 14.0448 19.6193 15.1641 21 15.1641C22.3807 15.1641 23.5 14.0448 23.5 12.6641C23.5 11.2834 22.3807 10.1641 21 10.1641C19.6193 10.1641 18.5 11.2834 18.5 12.6641ZM13.5 19.3307L23.5 19.3307M13.5 19.3307C13.5 20.7114 12.3807 21.8307 11 21.8307C9.61929 21.8307 8.5 20.7114 8.5 19.3307C8.5 17.95 9.61929 16.8307 11 16.8307C12.3807 16.8307 13.5 17.95 13.5 19.3307Z"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FilterIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="filter-funnel-01">
        <path
          id="Icon"
          d="M1.66699 3.83333C1.66699 3.36662 1.66699 3.13327 1.75782 2.95501C1.83771 2.79821 1.9652 2.67072 2.122 2.59083C2.30026 2.5 2.53362 2.5 3.00033 2.5H17.0003C17.467 2.5 17.7004 2.5 17.8787 2.59083C18.0355 2.67072 18.1629 2.79821 18.2428 2.95501C18.3337 3.13327 18.3337 3.36662 18.3337 3.83333V4.39116C18.3337 4.61516 18.3337 4.72716 18.3063 4.8313C18.282 4.92359 18.2421 5.01103 18.1882 5.0898C18.1275 5.17869 18.0428 5.25204 17.8736 5.39875L12.5438 10.0179C12.3745 10.1646 12.2898 10.238 12.2291 10.3269C12.1752 10.4056 12.1353 10.4931 12.111 10.5854C12.0837 10.6895 12.0837 10.8015 12.0837 11.0255V15.382C12.0837 15.5449 12.0837 15.6264 12.0574 15.6969C12.0342 15.7591 11.9964 15.8149 11.9472 15.8596C11.8916 15.9102 11.8159 15.9404 11.6646 16.001L8.83125 17.1343C8.52497 17.2568 8.37182 17.3181 8.24889 17.2925C8.14138 17.2702 8.04704 17.2063 7.98637 17.1148C7.91699 17.0101 7.91699 16.8452 7.91699 16.5153V11.0255C7.91699 10.8015 7.91699 10.6895 7.88962 10.5854C7.86537 10.4931 7.82544 10.4056 7.77158 10.3269C7.71081 10.238 7.62617 10.1646 7.4569 10.0179L2.12708 5.39875C1.95781 5.25204 1.87318 5.17869 1.8124 5.0898C1.75855 5.01103 1.71862 4.92359 1.69436 4.8313C1.66699 4.72716 1.66699 4.61516 1.66699 4.39116V3.83333Z"
          stroke="#19110B"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
export const InputRemove = () => {
  return (
    <svg
      width="20"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 15L5 5"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 5L5 15"
        stroke="#19110B"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// export const ComentsCursor = () => {
//   return (
//     encodeURIComponent(`
//     <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
//       <path d="M17.833 9.6662C17.8305 11.9199 16.9341 14.0806 15.3405 15.6743C13.7469 17.2679 11.5862 18.1643 9.33246 18.1667H1.77301C1.5237 18.1667 1.28461 18.0677 1.10833 17.8914C0.932043 17.7151 0.833008 17.4761 0.833008 17.2267V9.66675C0.833008 7.41241 1.72854 5.2504 3.3226 3.65634C4.91666 2.06228 7.07867 1.16675 9.33301 1.16675C11.5873 1.16675 13.7494 2.06228 15.3434 3.65634C16.9373 5.25027 17.8329 7.41206 17.833 9.6662Z" fill="#141527" stroke="white" />
//     </svg>
//       `
//     )

//   );
// };

export const ExportIcons = () => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#F4F4F4" />
      <path
        d="M12 16V8M12 8L8 12M12 8L16 12"
        stroke="#19110B"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const GalleryIcon = () => {
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.55991 15.2733L8.05703 9.77614C8.38704 9.44613 8.55205 9.28112 8.74232 9.2193C8.90969 9.16492 9.08998 9.16492 9.25735 9.2193C9.44762 9.28112 9.61264 9.44613 9.94265 9.77614L15.4031 15.2366M10.6665 10.5L13.057 8.10948C13.387 7.77946 13.552 7.61445 13.7423 7.55263C13.9097 7.49825 14.09 7.49825 14.2574 7.55263C14.4476 7.61445 14.6126 7.77946 14.9426 8.10947L17.3332 10.5M7.33317 5.5C7.33317 6.42047 6.58698 7.16667 5.6665 7.16667C4.74603 7.16667 3.99984 6.42047 3.99984 5.5C3.99984 4.57953 4.74603 3.83333 5.6665 3.83333C6.58698 3.83333 7.33317 4.57953 7.33317 5.5ZM4.6665 15.5H13.3332C14.7333 15.5 15.4334 15.5 15.9681 15.2275C16.4386 14.9878 16.821 14.6054 17.0607 14.135C17.3332 13.6002 17.3332 12.9001 17.3332 11.5V4.5C17.3332 3.09987 17.3332 2.3998 17.0607 1.86502C16.821 1.39462 16.4386 1.01217 15.9681 0.772484C15.4334 0.5 14.7333 0.5 13.3332 0.5H4.6665C3.26637 0.5 2.56631 0.5 2.03153 0.772484C1.56112 1.01217 1.17867 1.39462 0.938988 1.86502C0.666504 2.3998 0.666504 3.09987 0.666504 4.5V11.5C0.666504 12.9001 0.666504 13.6002 0.938988 14.135C1.17867 14.6054 1.56112 14.9878 2.03153 15.2275C2.56631 15.5 3.26637 15.5 4.6665 15.5Z"
        stroke="#19110B"
        strokeWidth="0.833333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EmojiIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.6665 10.6665C5.6665 10.6665 6.9165 12.3332 8.99984 12.3332C11.0832 12.3332 12.3332 10.6665 12.3332 10.6665M11.4998 6.49984H11.5082M6.49984 6.49984H6.50817M17.3332 8.99984C17.3332 13.6022 13.6022 17.3332 8.99984 17.3332C4.39746 17.3332 0.666504 13.6022 0.666504 8.99984C0.666504 4.39746 4.39746 0.666504 8.99984 0.666504C13.6022 0.666504 17.3332 4.39746 17.3332 8.99984ZM11.9165 6.49984C11.9165 6.72996 11.73 6.9165 11.4998 6.9165C11.2697 6.9165 11.0832 6.72996 11.0832 6.49984C11.0832 6.26972 11.2697 6.08317 11.4998 6.08317C11.73 6.08317 11.9165 6.26972 11.9165 6.49984ZM6.9165 6.49984C6.9165 6.72996 6.72996 6.9165 6.49984 6.9165C6.26972 6.9165 6.08317 6.72996 6.08317 6.49984C6.08317 6.26972 6.26972 6.08317 6.49984 6.08317C6.72996 6.08317 6.9165 6.26972 6.9165 6.49984Z"
        stroke="#19110B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MentionIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.03125C5.88656 0.03125 3.85967 0.870812 2.36524 2.36524C0.870812 3.85967 0.03125 5.88656 0.03125 8C0.03125 10.1134 0.870812 12.1403 2.36524 13.6348C3.85967 15.1292 5.88656 15.9688 8 15.9688C9.65078 15.9688 11.3836 15.4727 12.6344 14.6406C12.738 14.5717 12.81 14.4645 12.8345 14.3425C12.859 14.2206 12.8341 14.0938 12.7652 13.9902C12.6963 13.8866 12.5891 13.8146 12.4671 13.7901C12.3452 13.7656 12.2184 13.7905 12.1148 13.8594C11.0289 14.582 9.45156 15.0312 8 15.0312C6.60935 15.0312 5.24993 14.6189 4.09365 13.8463C2.93736 13.0737 2.03615 11.9755 1.50397 10.6907C0.971793 9.40595 0.832551 7.9922 1.10385 6.62827C1.37516 5.26434 2.04482 4.01149 3.02816 3.02816C4.01149 2.04482 5.26434 1.37516 6.62827 1.10385C7.9922 0.832551 9.40595 0.971793 10.6907 1.50397C11.9755 2.03615 13.0737 2.93736 13.8463 4.09365C14.6189 5.24993 15.0312 6.60935 15.0312 8C15.0312 10.3109 13.9547 10.6562 13.3125 10.6562C12.6703 10.6562 11.5938 10.3109 11.5938 8V4.875C11.5938 4.75068 11.5444 4.63145 11.4565 4.54354C11.3685 4.45564 11.2493 4.40625 11.125 4.40625C11.0007 4.40625 10.8815 4.45564 10.7935 4.54354C10.7056 4.63145 10.6562 4.75068 10.6562 4.875V5.57812C10.1524 5.02411 9.48807 4.64133 8.75607 4.48327C8.02408 4.32522 7.261 4.39978 6.57344 4.69654C5.88589 4.99329 5.30821 5.49743 4.92113 6.13849C4.53405 6.77956 4.3569 7.52553 4.41444 8.27218C4.47198 9.01883 4.76132 9.72886 5.24205 10.303C5.72278 10.8772 6.37087 11.2869 7.09577 11.4748C7.82068 11.6627 8.58618 11.6195 9.28531 11.3512C9.98445 11.0828 10.5823 10.6028 10.9953 9.97813C11.4187 11.0156 12.2188 11.5938 13.3125 11.5938C14.9758 11.5938 15.9688 10.25 15.9688 8C15.9663 5.88732 15.1259 3.86188 13.632 2.36798C12.1381 0.87409 10.1127 0.0337311 8 0.03125ZM8 10.6562C7.47464 10.6562 6.96108 10.5005 6.52427 10.2086C6.08745 9.91672 5.74699 9.50187 5.54595 9.0165C5.3449 8.53114 5.2923 7.99705 5.39479 7.48179C5.49728 6.96653 5.75026 6.49323 6.12175 6.12175C6.49323 5.75026 6.96653 5.49728 7.48179 5.39479C7.99705 5.2923 8.53114 5.3449 9.0165 5.54595C9.50187 5.74699 9.91672 6.08745 10.2086 6.52427C10.5005 6.96108 10.6562 7.47464 10.6562 8C10.6562 8.70448 10.3764 9.38011 9.87825 9.87825C9.38011 10.3764 8.70448 10.6562 8 10.6562Z"
        fill="black"
      />
    </svg>
  );
};

export const DarkExportIcons = () => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#0E77D3" />
      <path
        d="M12 16V8M12 8L8 12M12 8L16 12"
        stroke="#ffff"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const SportsIcons = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 10.0006C7.5 2.9173 12.5 11.2506 17.5 8.33396M2.5 17.0839L10 10.0006C10 10.0006 12.8149 12.8155 13.3333 13.3339C13.8518 13.8524 13.75 15.0006 12.5 15.0006C11.25 15.0006 8.33333 15.0006 8.33333 15.0006"
        stroke="#C0C0C0"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.9154"
        cy="4.58333"
        r="1.48333"
        stroke="#C0C0C0"
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const CommentInputIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
    >
      <path
        d="M38.0625 20.3438C38.0577 24.6935 36.3277 28.8637 33.2519 31.9394C30.1762 35.0152 26.006 36.7452 21.6562 36.75H7.875C7.17881 36.75 6.51113 36.4734 6.01884 35.9812C5.52656 35.4889 5.25 34.8212 5.25 34.125V20.3438C5.25 15.9925 6.97851 11.8195 10.0553 8.74278C13.132 5.66601 17.305 3.9375 21.6562 3.9375C26.0075 3.9375 30.1805 5.66601 33.2572 8.74278C36.334 11.8195 38.0625 15.9925 38.0625 20.3438Z"
        fill="#0E77D3"
      />
    </svg>
  );
};

export const ZoomPlus = (props: any) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1V15M1 8H15"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ZoomMinus = (props: any) => {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 16 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H15"
        stroke={props.color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
