const express = require('express')
const app = express()
const port = 8080

app.listen(port, () => {
  console.debug(`KCal app server is up. Listens on port ${port}`)
})

app.get('/kcal-app', (req, res) => {
  console.debug(req)
  res.send({
    message: 'Hello from KCal app'
  })
})
