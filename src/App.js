import React from 'react';
import logo from './logo.svg';
import './App.css';
import TwoFactorTokenGenerator from './components/two-factor-token-generator'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TwoFactorTokenGenerator />
      </header>
    </div>
  );
}

export default App;
