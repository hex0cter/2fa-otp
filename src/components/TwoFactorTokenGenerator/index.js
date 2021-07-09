import { authenticator } from "otplib"
import React, { useState } from 'react'
import { IonCardContent, IonCardTitle } from '@ionic/react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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
    setRefreshButtonText('Refreshing')
    const newTotpCode = secret ? authenticator.generate(secret) : ''
    if (newTotpCode !== code) {
      setCode(newTotpCode)
    }
    setTimeout(() => setRefreshButtonText('Refresh'), 1500)
  }

  window.addEventListener("focus", generateCode)

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      color: "rgba(0, 0, 0, 0.54)",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          Fill in your OTP secret to get the latest One time password. Your secret is never sent over the internet.
          </Typography>
        </Toolbar>
        </AppBar>
      <CardActions>
        <IonCardTitle></IonCardTitle>
      </CardActions>
      <CardContent>
        <IonCardContent>
          <div className={styles.twoFactorContainer}>
            <SecretField secret={secret} onChange={updateSecret} />
            <div className={styles.result}>
              <div>Token: {code} </div>
              <div>
                <Button variant="contained" color="primary" onClick={() => copyToClipboard(code)}>{copyButtonText}</Button> &nbsp;
                <Button variant="contained" color="primary" onClick={generateCode}>{refreshButtonText}</Button>
              </div>
            </div>
          </div>
        </IonCardContent>
      </CardContent>
    </Card>

  )
}

export default TwoFactorTokenGenerator
