import {FileCopyOutlined, QrCode2Outlined} from '@mui/icons-material'
import {Box, CircularProgress, IconButton, TextField} from '@mui/material'
import Qrcode from 'qrcode.react'
import React, {useState} from 'react'
import NetSelect from './NetSelect'
import {usePorts} from './NMSProvider'
import {clipboard} from 'electron'

function Main() {
  const name = 'default'
  const [address, setAddress] = useState<string>('')
  const ports = usePorts()
  const rtmpUrl = `rtmp://${address}:${ports.rtmp}/live/${name}`
  const videoUrl = `http://localhost:${ports.http}/live/${name}.flv`

  if (ports.rtmp === 0) {
    return (
      <Box
        p={2}
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap={3}
      >
        <CircularProgress variant='indeterminate' />
      </Box>
    )
  }

  return (
    <Box
      p={2}
      display='flex'
      flexDirection='column'
      alignItems='center'
      gap={3}
    >
      <NetSelect fullWidth value={address} onChange={setAddress} />
      <TextField
        fullWidth
        label='推流地址'
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton
              color='primary'
              onClick={() => clipboard.write({text: rtmpUrl})}
            >
              <FileCopyOutlined />
            </IconButton>
          ),
        }}
        value={rtmpUrl}
      />
      <Qrcode value={rtmpUrl} />

      <TextField
        fullWidth
        label='播放地址'
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconButton
              color='primary'
              onClick={() => clipboard.write({text: videoUrl})}
            >
              <FileCopyOutlined />
            </IconButton>
          ),
        }}
        value={videoUrl}
      />
    </Box>
  )
}

export default Main
