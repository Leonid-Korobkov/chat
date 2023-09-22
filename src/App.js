import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthContext } from './context'
import Loader from './components/Loader'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const firebaseConfig = {
  apiKey: 'AIzaSyDVEUrSdPmNW5zJO4aiXe7KCRZquZLy93U',
  authDomain: 'chat-react-krbln.firebaseapp.com',
  projectId: 'chat-react-krbln',
  storageBucket: 'chat-react-krbln.appspot.com',
  messagingSenderId: '771267870615',
  appId: '1:771267870615:web:9649f49e84cf76b7de0ed2'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const fireStore = getFirestore(app)

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loader />

  return (
    <AuthContext.Provider value={{ app, auth, fireStore, user, isLoading }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  )
}

export default App
