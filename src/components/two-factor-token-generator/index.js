import { authenticator } from "otplib";
import React, { useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from '@ionic/react';
import styles from './index.module.css'

const TwoFactorTokenGenerator = (props) => {
  const [ secret, setSecret ] = useState(localStorage.getItem('TwoFactorTokenSecret') || null)
  const totpCode = secret ? authenticator.generate(secret) : ''
  const [ code, setCode ] = useState(totpCode)

  const updateSecret = (event) => {
    console.log('event happened')
    const newSecret = event.target.value
    if (newSecret) {
      setSecret(newSecret)
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
  }

  setInterval(() => {
    const newTotpCode = secret ? authenticator.generate(secret) : ''
    if (newTotpCode !== code) {
      setCode(newTotpCode)
    }
  }, 2000)

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
        <IonButton onClick={() => copyToClipboard(code)}>Copy</IonButton>
        </div>
      </div>
    </IonCardContent>
  </IonCard>

  )
}

export default TwoFactorTokenGenerator
