import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { darkTheme } from '../App'

function Loader() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="loader">
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Loader
