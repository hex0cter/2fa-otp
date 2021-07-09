import { authenticator } from "otplib"
import React, { useState } from 'react'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
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

  return (
    <IonCard>
    <IonCardHeader>
      <IonCardTitle>Fill in your OTP secret to get the latest One time password. Your secret is never sent over the internet.</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <div className={styles.twoFactorContainer}>
        <SecretField secret={secret} onChange={updateSecret} />
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
