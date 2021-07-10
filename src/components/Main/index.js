import * as React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TwoFactorTokenGenerator from "../TwoFactorTokenGenerator";
import Footer from "../Footer";
import Banner from "../Banner";

export default function Main() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#009688",
      },
      secondary: {
        main: "#aed581",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Banner />
      <Card variant="outlined">
        <TwoFactorTokenGenerator />
      </Card>
      <Footer />
    </ThemeProvider>
  );
}
