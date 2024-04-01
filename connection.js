//Request library mysql 
const mysql = require('mysql')

//Variable konesksi untuk database
const db = mysql.createConnection ({
    host:'sql6.freesqldatabase.com',
    user:'sql6695735',
    password:'yAFC7Lu2yN',
    database:'sql6695735'
})

//kirimkan variable keluar untuk digunakan diluar file
module.exports =db