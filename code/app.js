'use strict'

const express = require('express')
const nconf = require('nconf')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const appRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const session = require('express-session')

nconf.env()

const users = []

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(session({
    secret: nconf.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, sameSite: true },
}))

const cwd = process.cwd()

app.use("/css", express.static(path.join(cwd, "public/css/build")))
app.use("/scripts", express.static(path.join(cwd, "public/js/build")))

authRoutes(app, users)
appRoutes(app, users)

app.listen(3000)

module.exports = app
