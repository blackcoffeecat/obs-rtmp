const NodeMediaServer = require('node-media-server')

const nms = new NodeMediaServer({
  rtmp: {
    port: 8991,
  },
  http: {
    port: 8992,
  },
})

nms.run()
