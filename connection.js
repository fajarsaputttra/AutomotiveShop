//Request library mysql 
const mysql = require('mysql')

//Variable konesksi untuk database
const db = mysql.createConnection ({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_otomotif',
})

//kirimkan variable keluar untuk digunakan diluar file
module.exports =db