import {ipcRenderer} from 'electron'
import React, {createContext, useContext, useEffect, useState} from 'react'
import {NMSPorts} from '../services'

interface NMSProviderCtx {
  started: boolean
  ports: NMSPorts
}

const Ctx = createContext<NMSProviderCtx>({
  started: false,
  ports: {rtmp: 0, http: 0},
})

function NmsProvider(props: any) {
  const [started, setStarted] = useState(false)
  const [ports, setPorts] = useState({rtmp: 0, http: 0})
  const getPort = () => {
    ipcRenderer.invoke('nms-ports').then(setPorts)
  }
  useEffect(() => {
    getPort()
    const onStarted = () => {
      setStarted(true)
      getPort()
    }
    const onStopped = () => {
      setStarted(false)
    }
    ipcRenderer.on('nms-started', onStarted)
    ipcRenderer.on('nms-stopped', onStopped)
    return () => {
      ipcRenderer.off('nms-started', onStarted)
      ipcRenderer.off('nms-stopped', onStopped)
    }
  })

  return <Ctx.Provider value={{started, ports}}>{props.children}</Ctx.Provider>
}

export function usePorts() {
  return useContext(Ctx).ports
}
export function useStarted() {
  return useContext(Ctx).started
}

export default NmsProvider
