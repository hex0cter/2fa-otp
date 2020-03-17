import { authenticator } from "otplib"
import React, { useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from '@ionic/react'
import styles from './index.module.css'

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

  return (
    <IonCard>
    <IonCardHeader>
      <IonCardTitle>TOTP Secret</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <div className={styles.twoFactorContainer}>
        <IonInput className={styles.secret} value={secret} onIonChange={updateSecret} placeholder="Please fill in the secret here."/>
        <div className={styles.result}>
        <div>Token: {code} </div>
          <IonButton onClick={() => copyToClipboard(code)}>{copyButtonText}</IonButton>
          <IonButton onClick={generateCode}>{refreshButtonText}</IonButton>
        </div>
      </div>
    </IonCardContent>
  </IonCard>

  )
}

export default TwoFactorTokenGenerator
