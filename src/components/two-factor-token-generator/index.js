import { authenticator } from "otplib"
import React, { useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from '@ionic/react'
import styles from './index.module.css'

const TwoFactorTokenGenerator = (props) => {
  const [ secret, setSecret ] = useState(localStorage.getItem('TwoFactorTokenSecret') || null)
  const totpCode = secret ? authenticator.generate(secret) : ''
  const [ code, setCode ] = useState(totpCode)
  const [ buttonText, setButtonText ] = useState('Copy')

  const updateSecret = (event) => {
    console.log('event happened')
    const newSecret = event.target.value
    if (newSecret) {
      setSecret(newSecret)
      console.log('update secret to', newSecret)
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

    setButtonText('Copied')
    setTimeout(() => setButtonText('Copy'), 1500)
  }

  const generateCode = () => {
    console.log('generateCode called')
    const newTotpCode = secret ? authenticator.generate(secret) : ''
    if (newTotpCode !== code) {
      setCode(newTotpCode)
    }
  }

  // setInterval(() => {
  //   console.log('timeout')
  //   generateCode()
  // }, 5000)

  return (
    <IonCard>
    <IonCardHeader>
      <IonCardTitle>TOPT Secret</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <div className={styles.twoFactorContainer}>
        <IonInput className={styles.secret} value={secret} onIonChange={updateSecret} placeholder="Please fill in the secret here."/>
        <div className={styles.result}>
        <div>Token: {code} </div>
          <IonButton onClick={generateCode}>Refresh</IonButton>
          <IonButton onClick={() => copyToClipboard(code)}>{buttonText}</IonButton>
        </div>
      </div>
    </IonCardContent>
  </IonCard>

  )
}

export default TwoFactorTokenGenerator
