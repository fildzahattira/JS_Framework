const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    port: 3307,
    password: '', 
    database: 'restaurant'
})

// db.connect()

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

// connection.end()

module.exports = db