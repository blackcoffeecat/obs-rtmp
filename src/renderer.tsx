import {CssBaseline, Paper, ThemeProvider} from '@mui/material'
import React from 'react'
import {render} from 'react-dom'
import {theme} from './views/app-config'
import Main from './views/Main'
import NmsProvider from './views/NMSProvider'
const root = document.getElementById('root')

render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <NmsProvider>
      <Main />
    </NmsProvider>
  </ThemeProvider>,
  root,
)
