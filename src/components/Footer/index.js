import * as React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import styles from "./index.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Typography variant="body1">
        <Link href="https://github.com/hex0cter/2fa-otp">
          <GitHubIcon fontSize="small" />
        </Link>
      </Typography>
    </div>
  );
}
