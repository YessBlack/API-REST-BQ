// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

const jsonServerAuth = require('json-server-auth')
const serverAuth = jsonServerAuth.create()
const routerAuth = jsonServerAuth.router('auth.json')
serverAuth.use(middlewares)
serverAuth.use(routerAuth)

serverAuth.listen(3001, () => {
  console.log('JSON Server Auth is running')
})

// Export the Server API
module.exports = { server, serverAuth }
