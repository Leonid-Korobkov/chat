import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../utils/consts'
import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../context'

export default function Navbar() {
  let { auth, user } = useContext(AuthContext)

  return (
    // sx={{ flexGrow: 1, position: 'fixed', left: 0, right: 0, zIndex: 1000 }
    <Box  sx={{ flexGrow: 1, flexShrink: 0}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Real-Time Chat
          </Typography>
          {user ? (
            <Button onClick={() => signOut(auth)} color="inherit" variant="outlined">
              Выйти
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button color="inherit" variant="outlined">
                Войти
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
