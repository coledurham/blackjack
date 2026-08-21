'use strict'

import express, { Application } from 'express'
import nconf from 'nconf'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import session from 'express-session'

import appRoutes from './routes/index.js'
import authRoutes from './routes/auth.js'

nconf.env()

const users:Array<Object> = []

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))

console.log("session secret is :: ", process.env.SESSION_SECRET)

app.use(session({
    secret: process?.env?.SESSION_SECRET || 'changemeyoulazypos',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: true },
}))

const cwd: string = process.cwd()

app.use("/css", express.static(path.join(cwd, "public/css/build")))
app.use("/scripts", express.static(path.join(cwd, "public/js/build")))

authRoutes(app, users)
appRoutes(app, users)

app.listen(3000)

export { app }
