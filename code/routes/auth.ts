'use strict'

import { fileURLToPath } from 'url'
import path from 'node:path'

import { readFile, writeFile } from 'node:fs/promises'

import { Request, Response, NextFunction, Application } from "express"

import { AuthSession, User } from '../types/session.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const __creds = await path.join(__dirname, `../../creds.json`)

export default (app: Application) => {

  app.get('/login', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../../login.html'))
  })
  
  app.get('/register', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../../register.html'))
  })
  
  app.get('/logout', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../../logout.html'))
  })
  
  app.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password }: {email: string, password: string } = req.body

    if(!email || !password || !req.session) {
      res.redirect('/login')
    }

    const creds: string = await readFile(__creds, { encoding: "utf8"})

    try{
      const parsed: Array<User> = JSON.parse(creds.toString())
      const user: User = parsed.filter((el: User) => el.email === email).slice(0,1)[0]

      if(user && user.password === password){
        req.session.auth = {
          id: user.email,
          kind: "auth",
          user: {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email
          }
        }

        res.redirect('/')
        return
      }

      res.redirect('/login')
      return
    }
    catch(err){
      res.redirect('/login')
      return
    }
  })
  
  app.get('/verifyCredentials', (req: Request, res: Response<AuthSession | null>): void => {
    
    if(req.session?.auth?.user && req.session.auth.user?.email){
      const email: string = req.session.auth.user.email
      const name: string = req.session.auth.user.name

      const authSession: AuthSession = {
        kind: "auth",
        id: email,
        email,
        user: {
          name,
          email
        }
      }

      res.json(authSession)
      return
    }

    res.status(401).json(null)
  })
  
  app.post('/register', async (req: Request, res: Response): Promise<void> => {
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
            firstName: firstName,
            lastName: lastName,
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
        console.error(`Error in register :: ${JSON.stringify(err)})}`)
        res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req: Request, res: Response, next: NextFunction): void => {    
    req.session.destroy((err: Error) => {
      if(err)
        return next(err)

      res.clearCookie('connect.sid', {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict'
      })

      res.redirect('/')
    })
  })
}
