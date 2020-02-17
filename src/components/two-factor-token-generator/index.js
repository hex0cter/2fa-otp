import React, { useState } from 'react'
import styles from './index.module.css'
import { authenticator } from "otplib";

const TwoFactorTokenGenerator = (props) => {
  const [ secret, setSecret ] = useState(localStorage.getItem('TwoFactorTokenSecret') || null)
  const totpCode = secret ? authenticator.generate(secret) : ''

  const updateSecret = (event) => {
    const newSecret = event.target.value
    console.log('update sec')
    if (newSecret) {
      setSecret(newSecret)
      console.log('update local storagge')
      localStorage.setItem('TwoFactorTokenSecret', newSecret)
    }
  }

  return (
    <div className={styles.twoFactorContainer}>
      totp_secret: <input className={styles.secret} defaultValue={secret} onChange={updateSecret}/>
      <div className={styles.result}>
      <div>Token: {totpCode} </div>
      </div>
    </div>
  )
}

export default TwoFactorTokenGenerator
