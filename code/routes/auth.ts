'use strict'

import { fileURLToPath } from 'url'
import path from 'node:path'

import { readFile, writeFile } from 'node:fs/promises'

import { Request, Response, Application } from "express"

import { User, SessionUser } from '../types/session'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __creds = await path.join(__dirname, `../creds.json`)

export default (app: Application, users: Array<Object>) => {

  app.get('/splash', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../splash.html'))
  })

  app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../login.html'))
  })
  
  app.get('/register', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../register.html'))
  })
  
  app.get('/logout', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../logout.html'))
  })
  
  app.post('/login', async (req: Request, res: Response) => {
    const { email, password} = req.body

    if(!email || !password || !req.session) {
      res.redirect('/login')
    }

    const creds = await readFile(__creds, { encoding: "utf8"})

    try{
      const parsed: Array<User> = JSON.parse(creds.toString())
      const user: User = parsed.filter((el: User) => el.email === email).slice(0,1)[0]

      if(user && user.password === password){
        req.session.auth = {
          id: user.email,
          kind: "auth",
          user: {
            name: user.name,
            email: user.email
          }
        }

        return res.redirect('/')
      }

      return res.redirect('/login')
    }
    catch(err){
      return res.redirect('/login')
    }
  })
  
  app.get('/verifyCredentials', (req: Request, res: Response) => {
    if(req.session?.auth?.user && req.session.auth.user?.name === req.body.user){
      return res.json(JSON.stringify({
        user: {
          firstName: req.session.auth.user.firstName,
          lastName: req.session.auth.user.lastName,
          email: req.session.auth.user.email
        }
      }))
    }

    return res.status(401).json(null)
  })
  
  app.post('/register', async (req: Request, res: Response) => {
    try{
        const {firstName, lastName, email, password} = req.body

        const creds: string = await readFile(__creds, { encoding: "utf8"})

        if(!creds){
          res.redirect("/regsiter")
        }

        const parsed: Array<User> = JSON.parse(creds.toString())
        const user: User = parsed.filter((el: User) => el.email === email).slice(0,1)[0]

        if(user){
          res.redirect('/register')
        }

        if(firstName && lastName && email && password) {
          parsed.push({
            name: `${firstName} ${lastName}`,
            email: email,
            password: password
          })

          await writeFile(__creds, JSON.stringify(parsed))

          res.redirect('/login')
        }
        else{
          res.redirect('/register')
        }
    }
    catch(err) {
        console.error(`:: Error in register :: ${JSON.stringify(err)})}`)
        res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req: Request, res: Response) => {    
    res.clearCookie('sessionid')
    res.redirect('/')
  })
}
