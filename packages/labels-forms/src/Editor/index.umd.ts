import * as modules from "./index";
const Editor = {};
for (const name in modules) {
  (Editor as any)[name] = (modules as any)[name];
}

export default Editor;
