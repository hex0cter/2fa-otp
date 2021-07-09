import { authenticator } from "otplib"
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './index.module.css'
import SecretField from '../SecretField'


const TwoFactorTokenGenerator = () => {
  const [ secret, setSecret ] = useState(localStorage.getItem('TwoFactorTokenSecret') || null)
  const totpCode = secret ? authenticator.generate(secret) : ''
  const [ code, setCode ] = useState(totpCode)
  const [ copyButtonText, setCopyButtonText ] = useState('Copy')
  const [ refreshButtonText, setRefreshButtonText ] = useState('Refresh')

  const updateSecret = (event) => {
    const newSecret = event.target.value
    if (newSecret) {
      setSecret(newSecret)
      generateCode()
      localStorage.setItem('TwoFactorTokenSecret', newSecret)
    }
  }

  const copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    setCopyButtonText('Copied')
    setTimeout(() => setCopyButtonText('Copy'), 1500)
  }

  const generateCode = () => {
    setRefreshButtonText(<HourglassFullIcon />)
    const newTotpCode = secret ? authenticator.generate(secret) : ''
    if (newTotpCode !== code) {
      setCode(newTotpCode)
    }
    setTimeout(() => setRefreshButtonText('Refresh'), 100)
  }

  window.addEventListener("focus", generateCode);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <Card variant="outlined" >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="subtitle2">
          Fill in your OTP secret to get the latest One time password. <br/>
          Your secret is only cached locally and never sent over the internet.
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <div className={styles.twoFactorContainer}>
          <SecretField secret={secret} onChange={updateSecret} />
          <div className={styles.result}>
            <div>Token: {code} </div>
            <div>
              <Button variant="contained" color="primary" onClick={() => copyToClipboard(code)} className={classes.button}>{copyButtonText}</Button>
              <Button variant="contained" color="default" onClick={generateCode}>{refreshButtonText}</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

  )
}

export default TwoFactorTokenGenerator
