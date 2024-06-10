const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const db = require('./connection.js')
const response = require('./request.js')

app.use(bodyParser.json())

//PELANGGAN
// Route Get Data tb_pelanggan
app.get('/pelanggan', (req, res) => {
    const sql = 'SELECT * FROM tb_pelanggan'
    db.query(sql, (error, result) => {
        response(200, result, 'data pelanggan', res)
    })
})

// Route Detail Get Data tb_pelanggan
app.get('/pelanggan/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM tb_pelanggan WHERE id_pelanggan ='${id}'`
    db.query(sql, (err, result) => {
        if (err) throw err
        response(200, result, "get detail pelanggan", res)
    })
})

// Route Post tb_pelanggan
app.post('/pelanggan', (req, res) => {
    const { id, nama, alamat, jenis_member } = req.body
    const sql = `INSERT INTO tb_pelanggan (id_pelanggan, nama, alamat, jenis_member) VALUES ('${id}', '${nama}', '${alamat}', '${jenis_member}')`

    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `pelanggan ${nama} dengan jenis member ${jenis_member} sudah ditambahkan`, res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "Data berhasil disimpan", res)
        }
    })
})

// Route PUT tb_pelanggan
app.put('/pelanggan/edit/:id', (req, res) => {
    const id = req.params.id
    const { nama, alamat, jenis_member } = req.body
    const sql = `UPDATE tb_pelanggan SET nama='${nama}', alamat='${alamat}', jenis_member='${jenis_member}' WHERE id_pelanggan='${id}'`

    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Error updating pelanggan ${id}`, res)
        if (result.affectedRows) {
            response(200, { isSuccess: result.affectedRows }, "Data berhasil diupdate", res)
        } else {
            response(404, null, "Pelanggan tidak ditemukan", res)
        }
    })
})

// Route DELETE tb_pelanggan
app.delete('/pelanggan/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM tb_pelanggan WHERE id_pelanggan='${id}'`

    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Error deleting pelanggan ${id}`, res)
        if (result.affectedRows) {
            response(200, { isSuccess: result.affectedRows }, "Data berhasil dihapus", res)
        } else {
            response(404, null, "Pelanggan tidak ditemukan", res)
        }
    })
})

//PRODUK
// Route Get Data tb_produk
app.get('/produk', (req, res) => {
    const sql = 'SELECT * FROM tb_produk'
    db.query(sql, (error, result) => {
        response(200, result, 'data produk', res)
    })
})

// Route Detail Get Data tb_produk
app.get('/produk/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM tb_produk WHERE id_produk ='${id}'`
    db.query(sql, (err, result) => {
        if (err) throw err
        response(200, result, "get detail produk", res)
    })
})

// Route Post tb_produk
app.post('/produk', (req, res) => {
    const { id, nama, harga, stok } = req.body
    const sql = `INSERT INTO tb_produk (id_produk, nama_produk, harga, stok) VALUES ('${id}', '${nama}', '${harga}', '${stok}')`

    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `produk ${nama} dengan harga ${harga} sudah ditambahkan`, res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "Data berhasil disimpan", res)
        }
    })
})

// Route PUT tb_produk
app.put('/produk/edit/:id', (req, res) => {
    const id = req.params.id
    const { nama_produk, harga, stok } = req.body
    const sql = `UPDATE tb_produk SET nama_produk='${nama_produk}', harga='${harga}', stok='${stok}' WHERE id_produk='${id}'`

    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Error updating produk ${id}`, res)
        if (result.affectedRows) {
            response(200, { isSuccess: result.affectedRows }, "Data berhasil diupdate", res)
        } else {
            response(404, null, "Produk tidak ditemukan", res)
        }
    })
})

// Route DELETE tb_produk
app.delete('/produk/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM tb_produk WHERE id_produk='${id}'`

    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Error deleting produk ${id}`, res)
        if (result.affectedRows) {
            response(200, { isSuccess: result.affectedRows }, "Data berhasil dihapus", res)
        } else {
            response(404, null, "Produk tidak ditemukan", res)
        }
    })
})

//TRANSAKSI
// Route Get Data tb_transaksi
app.get('/transaksi', (req, res) => {
    const sql = 'SELECT * FROM tb_transaksi'
    db.query(sql, (error, result) => {
        response(200, result, 'data transaksi', res)
    })
})

// Route Detail Get Data tb_transaksi
app.get('/transaksi/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM tb_transaksi WHERE id_transaksi ='${id}'`
    db.query(sql, (err, result) => {
        if (err) throw err
        response(200, result, "get detail transaksi", res)
    })
})

// Route Post tb_transaksi
app.post('/transaksi', (req, res) => {
    const { id_transaksi, id_pelanggan, id_produk, tanggal_transaksi, jumlah_barang, total_harga } = req.body
    const sql = `INSERT INTO tb_transaksi (id_transaksi, id_pelanggan, id_produk, tanggal_transaksi, jumlah_barang, total_harga) 
                VALUES ('${id_transaksi}', '${id_pelanggan}', '${id_produk}', '${tanggal_transaksi}', '${jumlah_barang}', '${total_harga}')`

    db.query(sql, (error, fields) => {
        if (error) response(500, 'invalid', `produk ${nama} dengan harga ${harga} sudah ditambahkan`, res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "Data berhasil disimpan", res)
        }
    })
})

// Route PUT tb_transaksi
app.put('/transaksi/edit/:id', (req, res) => {
    const id = req.params.id
    const { id_pelanggan, id_produk, tanggal_transaksi, jumlah_barang, total_harga } = req.body
    const sql = `UPDATE tb_transaksi SET id_pelanggan='${id_pelanggan}', id_produk='${id_produk}', tanggal_transaksi='${tanggal_transaksi}', jumlah_barang='${jumlah_barang}', total_harga='${total_harga}' WHERE id_transaksi='${id}'`

    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Error updating transaksi ${id}`, res)
        if (result.affectedRows) {
            response(200, { isSuccess: result.affectedRows }, "Data berhasil diupdate", res)
        } else {
            response(404, null, "Transaksi tidak ditemukan", res)
        }
    })
})

// Route DELETE tb_transaksi
app.delete('/transaksi/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM tb_transaksi WHERE id_transaksi='${id}'`

    db.query(sql, (error, result) => {
        if (error) response(500, 'invalid', `Error deleting transaksi ${id}`, res)
        if (result.affectedRows) {
            response(200, { isSuccess: result.affectedRows }, "Data berhasil dihapus", res)
        } else {
            response(404, null, "Transaksi tidak ditemukan", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Running in port ${port}`)
})
