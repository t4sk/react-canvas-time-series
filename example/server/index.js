const {readCSV} = require('./csv')

const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

async function main() {
  // TODO zmq
  const DATA = await readCSV('./data/huya0815.csv')

  wss.on('connection', socket => {
    socket.alive = true

    socket.on('pong', () => {
      socket.alive = true
    })

    socket.on('message', msg => {
      console.log('received: %s', msg)
      socket.send(`Hello, you sent -> ${msg}`)
    })

    socket.send('Hi there, I am a WebSocket server')
  })

  // ping each client
  setInterval(() => {
    wss.clients.forEach(socket => {
      if (!socket.alive) {
        return socket.terminate()
      }

      socket.alive = false
      socket.ping(null, false, true)
    })
  }, 10000)

  server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`)
  })
}

main()
