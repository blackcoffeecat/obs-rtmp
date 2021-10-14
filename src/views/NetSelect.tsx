import {MenuItem, Select, SelectProps, Typography} from '@mui/material'
import * as os from 'os'
import React, {useEffect, useMemo, useState} from 'react'

const getOptions = () => {
  const interfaces = os.networkInterfaces()

  const options: {value: string; label: string}[] = []
  for (const name in interfaces) {
    const list = interfaces[name]
    list.forEach((item) => {
      if (!item.internal && item.family === 'IPv4') {
        options.push({value: item.address, label: name})
      }
    })
  }
  return options
}
interface NetSelectProps extends Omit<SelectProps, 'onChange'> {
  onChange?(value: string): void
}

function NetSelect(props: NetSelectProps) {
  const options = useMemo(getOptions, [])
  useEffect(() => {
    props.onChange?.(options[0].value)
  }, [])

  return (
    <Select
      {...props}
      onChange={(e) => props.onChange?.(e.target.value as string)}
    >
      {options.map((item) => (
        <MenuItem dense key={item.value} value={item.value}>
          {item.label}:
          <Typography component='span' variant='body2' color='text.secondary'>
            {item.value}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  )
}

export default NetSelect
