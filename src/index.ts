import fastify from 'fastify'

const server = fastify()

server.get('/healtcheck', () => {
  return 'pong'
})
 
server.listen(({port: 8080}), (err, address) => {
  if(err) {
    console.log(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})

