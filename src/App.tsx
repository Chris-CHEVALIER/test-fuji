import React from 'react'
import './App.css'
import FujiForm from './components/FujiForm'
import { ConnectButton } from '@rainbow-me/rainbowkit'

function App () {
  return (
    <div className='App'>
      <div className='container'>
        <ConnectButton />
      </div>
      <header className='App-header'>
        <FujiForm />
      </header>
    </div>
  )
}

export default App
