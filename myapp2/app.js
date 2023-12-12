const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json())


app.get('/foodsmenu', (req, res) => {
  const sql = "SELECT * FROM foodsmenu"
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "LIST FOOD MENU", res)
  })
})

app.get('/:id_food', (req, res) => {
  const id_food = req.params.id_food
  const sql = `SELECT * FROM foodsmenu WHERE id_food = ${id_food}`
  db.query(sql, (err, fields) => {
    if (err) throw err
    response(200, fields, "LIST FOOD MENU by id", res)
  })
})

app.post('/', (req, res) => {
  const {name_food, category_food, price_food, calorie_food, description_food, id_certification} = req.body
  const sql = `INSERT INTO foodsmenu (name_food, category_food, price_food, calorie_food, description_food, id_certification) VALUES 
  ('${name_food}', '${category_food}', ${price_food}, ${calorie_food}, '${description_food}', ${id_certification})`

  db.query(sql, (err,fields) => {
    if (err) {
      response(500, "INVALID", "error", res)
    }
    if (fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
    }
    response(200, data, "POST SUCCESS", res)
    }
  })
})


app.put('/:id_food', (req, res) => {
  const {name_food, category_food, price_food, calorie_food, description_food, id_certification} = req.body
  const { id_food } = req.params;
  const sql = `UPDATE foodsmenu SET 
  name_food = '${name_food}', category_food = '${category_food}', price_food = ${price_food}, calorie_food = ${calorie_food}, description_food = '${description_food}', id_certification = ${id_certification}  
  WHERE id_food = ${id_food}`

  db.query(sql, (err, fields) => {
    if (err) {
      response(500, "INVALID", "error", res)
    }
    if (fields?.affectedRows){
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
    }
      response(200, data, "PUT SUCCESS", res)
    } else {
      response(404, "user not found", "error", res)
    }
  })
})

app.delete('/:id_food', (req, res) => {
  const { id_food } = req.params;
  const sql = `DELETE FROM foodsmenu WHERE id_food = ${id_food}`

  db.query(sql, (err, fields) => {
    if (err) {
      response(500, "INVALID", "error", res)
    }
    if (fields?.affectedRows){
      const data = {
        isDeleted: fields.affectedRows,
    }
      response(200, data, "DELETE SUCCESS", res)
    } else {
      response(404, "user not found", "error", res)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
