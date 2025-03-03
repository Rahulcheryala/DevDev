import { jestPreviewConfigure } from "jest-preview";
// import '@testing-library/jest-dom/extend-expect'; // Extends Jest matchers
import "./src/styles/global.css";

jestPreviewConfigure({
  // Enable autoPreview so Jest Preview runs automatically
  // whenever your test fails, without you having to do anything!
  autoPreview: true,
});
