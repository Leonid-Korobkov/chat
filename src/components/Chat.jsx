import { Box, TextField, Button, Typography, Avatar, Grid, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context'
import { collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore'
// import { collection, query, where, onSnapshot } from "firebase/firestore";

import Loader from './Loader'
import LoaderButton from './LoaderButton'

// import { collection, getDocs } from "firebase/firestore";

function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(null)
  const [isLoadingMessage, setIsLoadingMessage] = useState(false)
  // const messegesRef = useRef(null)
  let { fireStore, user } = useContext(AuthContext)

  useEffect(() => {
    async function getMessages() {
      const q = query(collection(fireStore, 'messages'), orderBy('createAt'))
      onSnapshot(q, (querySnapshot) => {
        const messages = []
        querySnapshot.forEach((doc) => {
          messages.push(doc.data())
        })
        setMessages(messages)
        // console.log(messegesRef.current.clientHeight)
        // messegesRef.current.scrollTo({
        //   top: document.body.scrollHeight,
        //   left: 0,
        //   behavior: 'smooth'
        // });
      })
    }
    getMessages()
  }, [])

  async function sendMessage(e) {
    if (input.trim() !== '') {
      setIsLoadingMessage(true)
      try {
        const newMessage = {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          text: input.trim(),
          createAt: serverTimestamp()
        }
        await addDoc(collection(fireStore, 'messages'), newMessage)
      } catch (e) {
        console.error('Error adding message: ', e)
      }
      setInput('')
      setIsLoadingMessage(false)
    }
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    setInput(event.target.value)
  }

  return (
    <>
      <Box
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 1,
          overflow: 'scroll'
        }}
      >
        <Box sx={{ flexGrow: 1, p: 2 }}>
          {messages ? messages.map((message, index) => <Message key={message.createAt} message={message} />) : <Loader />}
          {/* <div ref={messegesRef} /> */}
        </Box>
      </Box>
      {/* sx={{ p: 2, position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1000, background: '#272727' } */}
      <Box sx={{ p: 2, flexShrink: 0, background: '#272727' }}>
        <form action="#" name="chatForm">
          <Grid container spacing={2} style={{ alignItems: 'center' }}>
            <Grid item style={{ flex: '1 1 auto' }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Введите сообщение"
                variant="outlined"
                value={input}
                multiline
                maxRows={4}
                onChange={handleInputChange}
                disabled={isLoadingMessage ? true : false}
              />
            </Grid>
            <div>
              <div className="header"></div>
              <div className="content"></div>
              <div className="footer"></div>
            </div>
            <Grid item>
              {isLoadingMessage ? (
                <Button disabled type="button" fullWidth color="primary" variant="contained" onClick={sendMessage}>
                  <LoaderButton />
                </Button>
              ) : (
                <Button type="button" fullWidth color="primary" variant="contained" onClick={sendMessage}>
                  <SendIcon />
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

const Message = ({ message }) => {
  let { user } = useContext(AuthContext)

  const isBot = !(message.uid === user.uid)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        flexDirection: 'column',
        alignItems: isBot ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isBot ? 'row' : 'row-reverse',
          maxWidth: 400,
          alignItems: 'flex-end'
        }}
      >
        <Avatar src={message.photoURL}></Avatar>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isBot ? 1 : 0,
            mr: isBot ? 0 : 1,
            backgroundColor: isBot ? 'primary.dark' : 'secondary.dark',
            borderRadius: isBot ? '20px 20px 20px 5px' : '20px 20px 5px 20px'
          }}
        >
          <Typography style={{ wordBreak: 'break-word' }} variant="body1">
            {message.text}
          </Typography>
        </Paper>
      </Box>
      <Typography style={{ color: '#c2c2c2' }} variant="body2">
        {message.displayName}
      </Typography>
    </Box>
  )
}

export default Chat
