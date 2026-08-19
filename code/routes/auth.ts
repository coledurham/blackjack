'use strict'

import { fileURLToPath } from 'url'
import path from 'node:path'

import { Request, Response, Application } from "express"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default (app: Application, users: Array<Object>) => {

  app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../login.html'))
  })
  
  app.get('/register', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../register.html'))
  })
  
  app.get('/logout', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../logout.html'))
  })
  
  app.post('/login', (req: Request, res: Response) => {
    const { email, password} = req.body

    if(email && req.session){
      // TODO: Loop through users away and find by email and check password
      /*req.session.user = {
        id: 1,
        email
      }*/

      return res.redirect('/game')
    }

    res.redirect('/login')
  })
  
  /*app.get('/verifyCredentials', (req: Request, res: Response) => {
    // TODO: verify password matches user by email in users array
    res.json(null)
  })*/
  
  app.post('/register', async (req: Request, res: Response) => {
    try{
        const {firstName, lastName, email, password} = req.body
  
        //if(req && req.data && req.data.success){
        if(firstName && lastName && email && password) {
          //res.redirect('/login')

          res.redirect('/game')
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
  
  /*app.delete('/logout', (req: Request, res: Response) => {    
    res.clearCookie('sessionid')
    res.redirect('/')
  })*/
}
