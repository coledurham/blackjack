'use strict'

import express, { Application } from 'express'
import path from 'node:path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import session from 'express-session'

import appRoutes from './routes/index.js'
import authRoutes from './routes/auth.js'

const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(session({
    secret: process?.env?.SESSION_SECRET ?? 'changemeyoulazypos',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: true },
}))

const cwd: string = process.cwd()

app.use("/css", express.static(path.join(cwd, "public/css/build")))
app.use("/scripts", express.static(path.join(cwd, "public/js/build")))

authRoutes(app)
appRoutes(app)

app.listen(process?.env?.PORT)

export { app }
