import * as React from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./index.module.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default function Banner() {
  return (
    <AppBar position="static" color="secondary" className={styles.appBar}>
      <Toolbar>
        <Typography variant="subtitle2">
          Fill in your OTP secret to get the latest 2FA code. <br />
          Your secret is only cached locally and never sent over the internet.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
