import React, { ReactNode, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import { displayModeType } from "./types";
import { buildMuiTheme } from "./buildMuiTheme";
import { DisplayModeContext } from "./displayMode";

export { ThemeProvider };

const DEFAULT_DISPLAY_MODE = "darkMode";

const DISPLAY_MODE_STORAGE_KEY = "PELTA_DISPLAY_MODE";

function ThemeProvider(props: { defaultDisplayMode?: displayModeType, children: ReactNode }) {
  const INITIAL_DISPLAY_MODE = getInitialDisplayMode() || props.defaultDisplayMode || DEFAULT_DISPLAY_MODE;
  const [displayMode, setDisplayMode] =
    useState<displayModeType>(INITIAL_DISPLAY_MODE);
  const theme = buildMuiTheme(displayMode);
  const displayModeContext = {
    displayMode,
    setDisplayMode: setAndStoreDisplayMode,
  };
  const style = buildStyle();

  return (
    <DisplayModeContext.Provider value={displayModeContext}>
      <MuiThemeProvider theme={theme}>
        <div style={style}>{props.children}</div>
      </MuiThemeProvider>
    </DisplayModeContext.Provider>
  );

  function setAndStoreDisplayMode(displayMode: displayModeType) {
    localStorage.setItem(DISPLAY_MODE_STORAGE_KEY, displayMode);
    setDisplayMode(displayMode);
  }

  function getInitialDisplayMode() {
    return (localStorage.getItem(DISPLAY_MODE_STORAGE_KEY) || undefined) as
      | displayModeType
      | undefined;
  }

  function buildStyle() {
    return {
      height: "100vh",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    };
  }
}
