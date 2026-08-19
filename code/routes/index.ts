'use strict'

import { fileURLToPath } from 'url'
import path from 'node:path'
import { Request, Response, Application } from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default (app: Application, users: Array<Object>) => {

  app.get('/game', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  })

  app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  })

  app.get('*', (req: Request, res: Response) => {
    console.log('in * catch all to return ' + path.join(__dirname, '../index.html'))
    res.sendFile(path.join(__dirname, '../index.html'))
  })
}
