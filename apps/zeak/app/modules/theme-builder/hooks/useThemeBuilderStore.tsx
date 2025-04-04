import { useNanoStore } from "~/hooks";
import { atom } from "nanostores";

export const themeBuilderStore = atom({
  component: "buttons",
});

export const useThemeBuilderStore = () => {
  const [state, setState] = useNanoStore(themeBuilderStore);
  const setComponent = (component: string) => {
    setState({
      ...state,
      component,
    });
  };


  return {
    ...state,
    setState,
    setComponent,
  };
};


