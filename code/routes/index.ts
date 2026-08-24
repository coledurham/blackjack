'use strict'

import { fileURLToPath } from 'url'
import path from 'node:path'
import { Request, Response, Application } from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default (app: Application) => {

  app.get('/game', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, '../index.html'))
  })

  app.get('/', (req: Request, res: Response): void => {
    if(!req.session?.auth?.user){
      res.redirect('/splash')
      return
    }
    res.sendFile(path.join(__dirname, '../index.html'))
  })

  app.get('*', (req: Request, res: Response): void => {
    console.log(`* catch all to return - ${req.url} - ${path.join(__dirname, '../index.html')}`)
    res.sendFile(path.join(__dirname, '../index.html'))
  })
}
