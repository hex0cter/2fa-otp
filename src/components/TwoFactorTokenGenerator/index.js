import { authenticator } from "otplib";
import React, { useState } from "react";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import styles from "./index.module.css";
import SecretField from "../SecretField";
import Footer from "../Footer";

const TwoFactorTokenGenerator = () => {
  const [secret, setSecret] = useState(
    localStorage.getItem("TwoFactorTokenSecret") || null
  );
  const totpCode = secret ? authenticator.generate(secret) : "";
  const [code, setCode] = useState(totpCode);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [refreshButtonText, setRefreshButtonText] = useState("Refresh");
  const [progress, setProgress] = useState(100);

  const updateSecret = (event) => {
    const newSecret = event.target.value;
    if (newSecret) {
      setSecret(newSecret);
      generateCode();
      localStorage.setItem("TwoFactorTokenSecret", newSecret);
    }
  };

  const copyToClipboard = (str) => {
    const element = document.createElement("textarea");
    element.value = str;
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);

    setCopyButtonText("Copied");
    setTimeout(() => setCopyButtonText("Copy"), 1500);
  };

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

  const updateProgress = () => {
    const secondElapsed = Math.round(Date.now() / 1000) % 30;
    const secondsRemain = 30 - secondElapsed;
    const percentage = (secondsRemain * 100) / 30;
    setProgress(percentage);

    if (percentage < 10) {
      setTimeout(generateCode, 2000);
    }
  };

  const generateCode = () => {
    setRefreshButtonText(<HourglassFullIcon />);
    const newTotpCode = secret ? authenticator.generate(secret) : "";
    if (newTotpCode !== code) {
      setCode(newTotpCode);
    }
    setTimeout(() => setRefreshButtonText("Refresh"), 100);
  };

  window.addEventListener("focus", generateCode);
  window.addEventListener("load", () => {
    setInterval(updateProgress, 2000);
  });

  return (
    <ThemeProvider theme={theme}>
      <Card variant="outlined">
        <AppBar position="static" color="secondary" className={styles.appBar}>
          <Toolbar>
            <Typography variant="subtitle2">
              Fill in your OTP secret to get the latest 2FA code. <br />
              Your secret is only cached locally and never sent over the
              internet.
            </Typography>
          </Toolbar>
        </AppBar>
        <CardContent>
          <div className={styles.twoFactorContainer}>
            <SecretField secret={secret} onChange={updateSecret} />
            <div className={styles.result}>
              <div>
                Token: {code} &nbsp;
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={20}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => copyToClipboard(code)}
                className={styles.refreshButton}
              >
                {copyButtonText}
              </Button>{" "}
              &nbsp;
              <Button
                variant="contained"
                color="primary"
                onClick={generateCode}
                className={styles.refreshButton}
              >
                {refreshButtonText}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Footer/>
    </ThemeProvider>
  );
};

export default TwoFactorTokenGenerator;
