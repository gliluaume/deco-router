import express from 'express'
import bodyParser from 'body-parser'
import routerBind from './router'

const app = express()
routerBind(app)
// TODO pourquoi ça ne fonctionne pas avec import ?
const controllers = require('./controllers')
app.use(bodyParser.json())

export default app
