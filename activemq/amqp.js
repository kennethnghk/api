var container = require('rhea')
var fs = require('fs')
var path = require('path')

container.on('connection_open', function (context) {
  context.connection.open_receiver('examples')
  context.connection.open_sender('examples')
})
container.on('message', function (context) {
  console.log(context.message.body)
  context.connection.close()
})
container.once('sendable', function (context) {
  context.sender.send({ body: 'Hello World!' })
})

container.connect({
  port: 5671,
  host: 'b-aad32a5c-3362-4424-892a-16931f399f5c-1.mq.us-east-1.amazonaws.com',
  password: '<password>',
  username: '<username>',
  container_id:
    'mqttjs_blackie_' +
    Math.random()
      .toString(16)
      .substr(2, 8)

  // //   transport: 'ssl',
  //   transport: 'tls',
  //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),

  //   // This is necessary only if the server uses the self-signed certificate
  //   ca: [fs.readFileSync(path.resolve(__dirname, 'ca-cert.pem'))]
})
