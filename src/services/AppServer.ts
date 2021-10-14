import {EventEmitter} from 'events'
import getPort from 'get-port'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodeMediaServer = require('node-media-server')

export type NMSServerInfo = {
  os: {arch: string; platform: string; release: string}
  cpu: {num: number; load: number; model: string; speed: number}
  mem: {totle: number; free: number}
  net: {inbytes: number; outbytes: number}
  nodejs: {
    uptime: number
    version: string
    mem: {
      rss: number
      heapTotal: number
      heapUsed: number
      external: number
      arrayBuffers: number
    }
  }
  clients: {
    accepted: number
    active: number
    idle: number
    rtmp: number
    http: number
    ws: number
  }
  version: string
}

export type NMSStreamPublisher = {
  app: string
  stream: string
  clientId: string
  connectCreated: string
  bytes: number
  ip: string
  audio: {
    codec: string
    profile: string
    samplerate: number
    channels: number
  }
  video: {
    codec: string
    width: number
    height: number
    profile: string
    level: number
    fps: number
  }
}

export type NMSSubscriber = {
  app: string
  stream: string
  clientId: string
  connectCreated: string
  bytes: number
  ip: string
  protocol: string
}
export type NMSStreamInfo = {
  live: Record<
    string,
    {
      publisher: NMSStreamPublisher
      subscribers: NMSSubscriber[]
    }
  >
}

export type NMSPorts = {
  rtmp: number
  http: number
}

class AppServer extends EventEmitter {
  static appServer: AppServer = new AppServer()
  nms: any = null
  ports = {
    rtmp: 8991,
    http: 8992,
  }

  constructor() {
    super()
    if (AppServer.appServer) return AppServer.appServer
    AppServer.appServer = this
  }

  async startNMS() {
    if (this.nms) {
      await this.stopNMS()
    }

    const ports = this.ports
    ports.rtmp = await getPort({port: ports.rtmp})
    ports.http = ports.rtmp + 1
    this.nms = new NodeMediaServer({
      rtmp: {
        port: ports.rtmp,
      },
      http: {
        port: ports.http,
      },
    })
    this.ports = ports
    this.nms.run()
    this.emit('started')
  }

  async stopNMS() {
    if (!this.nms) return
    this.nms.stop()
    this.nms = null
    this.emit('stopped')
  }

  getPorts() {
    return {...this.ports}
  }
}

export default AppServer
