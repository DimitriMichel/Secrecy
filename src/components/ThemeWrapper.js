import React from "react";
import { ThemeProvider } from "evergreen-ui";

const theme = {
  // eslint-disable-next-line no-undef
  ...defaultTheme,
  myNewButtonStyles: {
    color: "white",
    backgroundColor: "hotpink",
    height: 30,
    borderRadius: "5px",
  },
};
const ThemeWrapper = ({ children }) => {
  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
