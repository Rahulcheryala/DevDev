export const QUILL_STYLES = `
.ql-bubble .ql-editor {
    background-color: transparent !important;
  }
  .ql-toolbar.ql-snow {
    border: none !important;; 
  }
  
  .quill-container {
    height: 100%;
    width: 100%;
  }
  
  .quill-container {
    width: 100%;
  }
  
  .quill-container .ql-editor {
    padding: 0;
  }
  
  
  .quill-container .ql-container {
    border: 0 !important;
    width: fit-content;
  }
  /* Quil Css */
  /** Apply snow theme to app */
  
  .ql-hidden {
    display: none;
  }
  .ql-out-bottom,
  .ql-out-top {
    visibility: hidden;
  }
  .ql-tooltip {
    position: absolute;
    transform: translateY(10px);
  }
  .ql-tooltip a {
    cursor: pointer;
    text-decoration: none;
  }
  .ql-tooltip.ql-flip {
    transform: translateY(-10px);
  }
  .ql-formats {
    display: inline-block;
    vertical-align: middle;
  }
  .ql-formats:after {
    clear: both;
    content: "";
    display: table;
  }
  .ql-stroke {
    fill: none;
    stroke: #444;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }
  .ql-stroke-miter {
    fill: none;
    stroke: #444;
    stroke-miterlimit: 10;
    stroke-width: 2;
  }
  .ql-fill,
  .ql-stroke.ql-fill {
    fill: #444;
  }
  .ql-empty {
    fill: none;
  }
  .ql-even {
    fill-rule: evenodd;
  }
  .ql-thin,
  .ql-stroke.ql-thin {
    stroke-width: 1;
  }
  .ql-transparent {
    opacity: 0.4;
  }
  .ql-direction svg:last-child {
    display: none;
  }
  .ql-direction.ql-active svg:last-child {
    display: inline;
  }
  .ql-direction.ql-active svg:first-child {
    display: none;
  }
  blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }
  code,
  pre {
    background-color: #f0f0f0;
    border-radius: 3px;
  }
  pre {
    white-space: pre-wrap;
    margin-bottom: 5px;
    margin-top: 5px;
    padding: 5px 10px;
  }
  code {
    font-size: 85%;
    padding: 2px 4px;
  }
  pre.ql-syntax {
    background-color: #23241f;
    color: #f8f8f2;
    overflow: visible;
  }
  img {
    max-width: 100%;
  }
  .ql-picker {
    color: #444;
    display: inline-block;
    float: left;
    font-size: 14px;
    font-weight: 500;
    height: 24px;
    position: relative;
    vertical-align: middle;
  }
  .ql-picker-label {
    cursor: pointer;
    display: inline-block;
    height: 100%;
    padding-left: 8px;
    padding-right: 2px;
    position: relative;
    width: 100%;
  }
  .ql-picker-label::before {
    display: inline-block;
    line-height: 22px;
  }
  .ql-picker-options {
    background-color: #fff;
    display: none;
    min-width: 100%;
    padding: 4px 8px;
    position: absolute;
    white-space: nowrap;
  }
  .ql-picker-options .ql-picker-item {
    cursor: pointer;
    display: block;
    padding-bottom: 5px;
    padding-top: 5px;
  }
  .ql-picker.ql-expanded .ql-picker-label {
    color: #ccc;
    z-index: 2;
  }
  .ql-picker.ql-expanded .ql-picker-label .ql-fill {
    fill: #ccc;
  }
  .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
    stroke: #ccc;
  }
  .ql-picker.ql-expanded .ql-picker-options {
    display: block;
    margin-top: -1px;
    top: 100%;
    z-index: 1;
  }
  .ql-clipboard{
    display: none;
  }
  .ql-color-picker,
  .ql-icon-picker {
    width: 28px;
  }
  .ql-color-picker .ql-picker-label,
  .ql-icon-picker .ql-picker-label {
    padding: 2px 4px;
  }
  .ql-color-picker .ql-picker-label svg,
  .ql-icon-picker .ql-picker-label svg {
    right: 4px;
  }
  .ql-icon-picker .ql-picker-options {
    padding: 4px 0px;
  }
  .ql-icon-picker .ql-picker-item {
    height: 24px;
    width: 24px;
    padding: 2px 4px;
  }
  .ql-color-picker .ql-picker-options {
    padding: 3px 5px;
    width: 152px;
  }
  .ql-color-picker .ql-picker-item {
    border: 1px solid transparent;
    float: left;
    height: 16px;
    margin: 2px;
    padding: 0px;
    width: 16px;
  }
  .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
    position: absolute;
    margin-top: -9px;
    right: 0;
    top: 50%;
    width: 18px;
  }
  .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=""])::before,
  .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=""])::before,
  .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=""])::before,
  .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=""])::before,
  .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=""])::before,
  .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=""])::before {
    content: attr(data-label);
  }
  .ql-picker.ql-header {
    width: 98px;
  }
  .ql-picker.ql-header .ql-picker-label::before,
  .ql-picker.ql-header .ql-picker-item::before {
    content: "Normal";
  }
  .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "Heading 1";
  }
  .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "Heading 2";
  }
  .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "Heading 3";
  }
  .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "Heading 4";
  }
  .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "Heading 5";
  }
  .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "Heading 6";
  }
  .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    font-size: 2em;
  }
  .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    font-size: 1.5em;
  }
  .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    font-size: 1.17em;
  }
  .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    font-size: 1em;
  }
  .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    font-size: 0.83em;
  }
  .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    font-size: 0.67em;
  }
  .ql-picker.ql-font {
    width: 108px;
  }
  .ql-picker.ql-font .ql-picker-label::before,
  .ql-picker.ql-font .ql-picker-item::before {
    content: "Sans Serif";
  }
  .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
  .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "Serif";
  }
  .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
  .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "Monospace";
  }
  .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    font-family: Georgia, Times New Roman, serif;
  }
  .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    font-family: Monaco, Courier New, monospace;
  }
  .ql-picker.ql-size {
    width: 98px;
  }
  .ql-picker.ql-size .ql-picker-label::before,
  .ql-picker.ql-size .ql-picker-item::before {
    content: "Normal";
  }
  .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
  .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "Small";
  }
  .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
  .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "Large";
  }
  .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
  .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "Huge";
  }
  .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    font-size: 10px;
  }
  .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    font-size: 18px;
  }
  .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    font-size: 32px;
  }
  .ql-color-picker.ql-background .ql-picker-item {
    background-color: #fff;
  }
  .ql-color-picker.ql-color .ql-picker-item {
    background-color: #000;
  }
  .ql-toolbar {
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    padding: 8px;
  }
  .ql-toolbar.ql-formats {
    margin-right: 15px;
  }
  .ql-toolbar.ql-picker-label {
    border: 1px solid transparent;
  }
  .ql-toolbar.ql-picker-options {
    border: 1px solid transparent;
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
  }
  .ql-toolbar.ql-picker.ql-expanded .ql-picker-label {
    border-color: #ccc;
  }
  .ql-toolbar.ql-picker.ql-expanded .ql-picker-options {
    border-color: #ccc;
  }
  .ql-toolbar.ql-color-picker .ql-picker-item.ql-selected,
  .ql-toolbar.ql-color-picker .ql-picker-item:hover {
    border-color: #000;
  }
  .ql-toolbar + .ql-container {
    border-top: 0px;
  }
  .ql-tooltip {
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 5px #ddd;
    color: #444;
    padding: 5px 12px;
    white-space: nowrap;
  }
  .ql-tooltip::before {
    content: "Visit URL:";
    line-height: 26px;
    margin-right: 8px;
  }
  .ql-tooltip input[type="text"] {
    display: none;
    border: 1px solid #ccc;
    font-size: 13px;
    height: 26px;
    margin: 0px;
    padding: 3px 5px;
    width: 170px;
  }
  .ql-tooltip a.ql-preview {
    display: inline-block;
    max-width: 200px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
  }
  .ql-tooltip a.ql-action::after {
    border-right: 1px solid #ccc;
    content: "Edit";
    margin-left: 16px;
    padding-right: 8px;
  }
  .ql-tooltip a.ql-remove::before {
    content: "Remove";
    margin-left: 8px;
  }
  .ql-tooltip a {
    line-height: 26px;
  }
  .ql-tooltip.ql-editing a.ql-preview,
  .ql-tooltip.ql-editing a.ql-remove {
    display: none;
  }
  .ql-tooltip.ql-editing input[type="text"] {
    display: inline-block;
  }
  .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: "Save";
    padding-right: 0px;
  }
  .ql-tooltip[data-mode="link"]::before {
    content: "Enter link:";
  }
  .ql-tooltip[data-mode="formula"]::before {
    content: "Enter formula:";
  }
  .ql-tooltip[data-mode="video"]::before {
    content: "Enter video:";
  }
  a {
    color: #06c;
  }
  .custom-quill-editor .ql-editor {
    background-color: transparent !important;
  }
  .ql-container {
    outline: none !important;
  }
  .ql-editor {
    outline: none !important;
    line-height: 1;
  }
  .text_property_toolbar{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding:4px;
  
  }
  .hide_toolbar{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding:4px;
    height:100vh;
    background-color: #1a1a1a;
  }
  
  .ql-toolbar .ql-bold,
  .ql-toolbar .ql-italic,
  .ql-toolbar .ql-underline {
    background-color: #333; /* Dark background */
    color: white; /* White icon/text */
    border: none; /* Remove default border */
    padding: 10px; /* Padding around the button */
    cursor: pointer; /* Cursor to indicate clickable button */
  }
  
  .ql-toolbar .ql-bold::before {
    content: 'B'; /* Icon/text for bold button */
  }
  
  .ql-toolbar .ql-italic::before {
    content: 'I'; /* Icon/text for italic button */
  }
  
  .ql-toolbar .ql-underline::before {
    content: 'U'; /* Icon/text for underline button */
  }
  
  .ql-toolbar button:hover {
    background-color: #444; /* Slightly lighter background on hover */
  }
  
  /* Numbered List */
  .ql-editor ol,
  .ql-editor ul {
  padding-left: 30px;
  }
  
  .ql-editor ol li,
  .ql-editor ul li {
  margin-bottom: 5px;
  }
  
  /* Bullet List */
  .ql-editor ul li::before {
  content: '\\2022'; 
  position: absolute;
  margin-left: -20px;
  }
  
  /* Numbered List */
  .ql-editor ol {
  list-style-type: decimal;
  }
  
  /* Superscript */
  .ql-editor .ql-superscript {
  vertical-align: super;
  font-size: smaller;
  }
  
  /* Subscript */
  .ql-editor .ql-subscript {
  vertical-align: sub;
  font-size: smaller;
  }
  .ql-editor .ql-align-left {
    text-align: left;
  }
  .ql-editor.ql-blank::before {
    content: attr(data-placeholder);
    color: #888; /* Placeholder text color */
    left: 0;
    position: absolute;
    right: 0;
    padding:0 0 0 10px
  }

  .ql-editor .ql-font-weight-200 {
    font-weight: 200;
  }
  .ql-editor .ql-font-weight-300 {
    font-weight: 300;
  }
  .ql-editor .ql-font-weight-400 {
    font-weight: 400;
  }
  .ql-editor .ql-font-weight-600 {
    font-weight: 600;
  }
  .ql-editor .ql-font-weight-700 {
    font-weight: 700;
  }
  .ql-editor .ql-font-weight-800 {
    font-weight: 800;
  }
  .ql-editor .ql-font-bold {
    font-weight: bold;
  }
  .ql-editor .ql-font-normal {
    font-weight: normal;
  }
  





  
`;
