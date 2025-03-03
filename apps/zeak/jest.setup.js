import { jestPreviewConfigure } from "jest-preview";
// import '@testing-library/jest-dom/extend-expect'; // Extends Jest matchers
import "./app/styles/global.css";
import '@testing-library/jest-dom';
import { installGlobals } from "@remix-run/node";
installGlobals();

jestPreviewConfigure({
  // Enable autoPreview so Jest Preview runs automatically
  // whenever your test fails, without you having to do anything!
  autoPreview: true,
});
