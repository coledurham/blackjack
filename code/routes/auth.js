'use strict'

const path = require('path')
const nconf = require('nconf')

nconf.env()

module.exports = (app, users) => {

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'))
  })
  
  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../register.html'))
  })
  
  app.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, '../logout.html'))
  })
  
  app.post('/login', (req, res) => {
    const { email, password} = req.body

    if(email && session){
      // TODO: Loop through users away and find by email and check password
      req.session.user = {
        id: 1,
        email
      }

      return res.redirect('/game')
    }

    res.redirect('/login')
  })
  
  app.get('/verifyCredentials', (req, res) => {
    // TODO: verify password matches user by email in users array
    res.json(null)
  })
  
  app.post('/register', async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body
  
        
  
        if(resp && resp.data && resp.data.success){
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
  
  app.delete('/logout', (req, res) => {    
    res.clearCookie('sessionid')
    res.redirect('/')
  })
}
