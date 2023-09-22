import { Box, Button, Container, Grid } from '@mui/material'
import { useContext } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AuthContext } from '../context'

function Login() {
  const { auth } = useContext(AuthContext)

  const login = () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Container>
      <Grid container style={{ height: window.innerHeight - 50 }} alignItems={'center'} justifyContent={'center'}>
        <Grid sx={{ backgroundColor: '#3c3c3c', borderRadius: 5 }}>
          <Box p={5}>
            <Button onClick={login} variant="contained">
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
