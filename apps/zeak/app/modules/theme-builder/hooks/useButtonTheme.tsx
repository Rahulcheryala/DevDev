import { useNanoStore } from "~/hooks";
import { atom } from "nanostores";

export const buttonThemeStore = atom({
  primaryBackground: '#000',
  primaryText: '#fff',
  secondaryBackground: '#b0b0b0',
  warningBackground: '#f5c242',
  destructiveBackground: '#f54242',
  borderRadius: 12,
  borderWidth: 0,
  borderColor: '#007AF5',
  height: 56,
  fontSize: 14,

});

export const useButtonThemeStore = () => {
  const [state, setState] = useNanoStore(buttonThemeStore);

  const setButtonPrimaryBackground = (color: string) => {
    setState({
      ...state,
      primaryBackground: color,
    });
  };

  const setButtonPrimaryText = (color: string) => {
    setState({
      ...state,
      primaryText: color,
    });
  };

  const setSecondaryBackground = (color: string) => {
    setState({
      ...state,
      secondaryBackground: color,
    });
  };

  const setWarningBackground = (color: string) => {
    setState({
      ...state,
      warningBackground: color,
    });
  };

  const setDestructiveBackground = (color: string) => {
    setState({
      ...state,
      destructiveBackground: color,
    });
  };

  const setBorderRadius = (radius: number) => {
    setState({
      ...state,
      borderRadius: radius,
    });
  };

  const setBorderWidth = (width: number) => {
    setState({
      ...state,
      borderWidth: width,
    });
  };

  const setBorderColor = (color: string) => {
    setState({
      ...state,
      borderColor: color,
    });
  };

  const setHeight = (height: number) => {
    setState({
      ...state,
      height: height,
    });
  };
  const setFontSize = (size: number) => {
    setState({
      ...state,
      fontSize: size,
    });
  };
  return {
    ...state,
    setButtonPrimaryBackground,
    setButtonPrimaryText,
    setSecondaryBackground,
    setWarningBackground,
    setDestructiveBackground,
    setBorderRadius,
    setBorderWidth,
    setBorderColor,
    setHeight,
    setFontSize,
  };
};
