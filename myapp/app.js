const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  db.query("SELECT * FROM foodsmenu", (error, result) => {
    //hasil data mysql
    if (error) {
      console.error(error)
      res.status(500).send('Error executing query')
      return
    }
    // console.log(result)
    // res.send(result)
    response(200, result, "get all data from foodsmenu", res)

  })
    // res.send('Hello World!')

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})