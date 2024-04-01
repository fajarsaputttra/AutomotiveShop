//Basic Routing express
const express = require('express')
const app = express()
const port = 3001
//Pemanggil Request body parse (Ternyarta Parse dan Parser berbeda! becarefull install)
const bodyParser = require('body-parser') 
//Pemanggil file config.js di index.js
const db = require('./config.js')
//Pemanggil file response.js
const response = require('./request.js')

//Membuat Penggunaan body parser 
app.use(bodyParser.json())

//Membuat Route Get Data tb_pelanggan
app.get('/pelanggan',(req,res)=>{
    const sql = 'SELECT * From tb_pelanggan'
    db.query(sql,(error,result)=>{
        response(200,result,'data pelanggan',res)
    })
})

//Membuat Route Detail Get Data tb_pelanggan
app.get('/pelanggan/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * From tb_pelanggan where id_pelanggan ='${id}' `
    db.query(sql,(err,result)=>{
        if (err) throw err
        response(200,result,"get detail pelanggan",res)
    })
})

//Membuat Route Get Data tb_produk
app.get('/produk',(req,res)=>{
    const sql = 'SELECT * From tb_produk'
    db.query(sql,(error,result)=>{
        response(200,result,'data produk',res)
    })
})

//Membuat Route Detail Get Data tb_produk
app.get('/produk/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * From tb_produk where id_produk ='${id}' `
    db.query(sql,(err,result)=>{
        if (err) throw err
        response(200,result,"get detail produk",res)
    })
})

//Membuat Route Get Data tb_transaksi
app.get('/transaksi',(req,res)=>{
    const sql = 'SELECT * From tb_transaksi'
    db.query(sql,(error,result)=>{
        response(200,result,'data transaksi',res)
    })
})
//Membuat Route Detail Get Data tb_transaksi
app.get('/transaksi/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * From tb_transaksi where id_transaksi ='${id}' `
    db.query(sql,(err,result)=>{
        if (err) throw err
        response(200,result,"get detail transaksi",res)
    })
})

//Membuat Route Post tb_pelanggan
app.post('/pelanggan', (req,res)=>{
    const {id, nama, alamat, jenis_member}=req.body
    const sql = `INSERT INTO tb_pelanggan (id_pelanggan, nama, alamat, jenis_member) values ('${id}','${nama}','${alamat}','${jenis_member}')`

    db.query(sql,(error,fields)=>{
        if(error) response(500, 'invalid', `pelanggan ${nama} dengan jenis member ${jenis_member} sudah ditambahkan`,res)
        if(fields?.affectedRows){
            const data ={
                isSuccess:fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data berhasil disimpan",res)
        }
    })

})

//Membuat Route Post tb_produk
app.post('/produk', (req,res)=>{
    const {id, nama, harga, stok}=req.body
    const sql = `INSERT INTO tb_produk (id_produk, nama_produk, harga, stok) values ('${id}','${nama}','${harga}','${stok}');`

    db.query(sql,(error,fields)=>{
        if(error) response(500, 'invalid', `produk ${nama} dengan harga ${harga} sudah ditambahkan`,res)
        if(fields?.affectedRows){
            const data ={
                isSuccess:fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data berhasil disimpan",res)
        }
    })

})

//Membuat Route Post tb_transaksi
app.post('/transaksi', (req,res)=>{
    const {id_transaksi,id_pelanggan,id_produk, tanggal_transaksi, jumlah_barang, total_harga}=req.body
    const sql = `INSERT INTO tb_transaksi (id_transaksi, id_pelanggan, id_produk, tanggal_transaksi,jumlah_barang,total_harga) 
                values ('${id_transaksi}','${id_pelanggan}','${id_produk}','${tanggal_transaksi}','${jumlah_barang}','${total_harga}');`

    db.query(sql,(error,fields)=>{
        if(error) response(500, 'invalid', `produk ${nama} dengan harga ${harga} sudah ditambahkan`,res)
        if(fields?.affectedRows){
            const data ={
                isSuccess:fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data berhasil disimpan",res)
        }
    })

})

app.listen(port,()=>{
    console.log(`Runing in port ${port}`)
})