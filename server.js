const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const {Pool} = require('pg')

const pool = new Pool({
    user: 'jacoblinson',
    host: 'localhost',
    database: 'houses',
    password: '',
    port: 5432
})

app.use(express.json())

app.get('/owners', async (req, res) => {
    try {
        const owners = await pool.query('SELECT * FROM owners INNER JOIN homes ON owners.owner_id = homes.owner_id')
        res.send(owners.rows)
    } catch (error) {
        res.send(error)
    }
})

app.get('/allowners', async (req, res) => {
    try {
        const owners = await pool.query('SELECT * FROM owners')
        res.send(owners.rows)
    } catch (error) {
        res.send(error)
    }
})

app.get('/owners/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows} = await pool.query('SELECT * FROM owners INNER JOIN homes ON owners.owner_id = homes.owner_id WHERE owners.owner_id = $1', [id])
        res.send(rows)
    } catch (error) {
        res.send(error)
    }
})

app.post('/homes', async (req, res) => {
    try {
        const {price, location, for_sale} = req.body
        const {newHome} = await pool.query('INSERT INTO homes (price, location, for_sale) VALUES ($1, $2, $3)', [price, location, for_sale])
        res.send(newHome)
    } catch (error) {
        res.send(error)
    }
})

app.put('/homes/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {price, location, for_sale} = req.body
        const {updatedHome} = await pool.query('UPDATE homes SET price = $1, location = $2, for_sale = $3 WHERE home_id = $4', [price, location, for_sale, id])
        res.send(updatedHome)
    } catch (error) {
        res.send(error)
    }
})

app.patch('/homes/:id', async (req, res) => {
    try {
        const {id} = req.params
        let {body} = req
        for (key in body) {
            await pool.query(`UPDATE homes SET ${key} = '${body[key]}' WHERE home_id = ${id}`)
        }
        const {patchedHome} = await pool.query(`SELECT * FROM homes WHERE home_id = ${id}`)
        res.send(patchedHome)
    } catch (error) {
        res.send(error)
    }
})

app.delete('/homes/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {deletedHome} = await pool.query('DELETE FROM homes WHERE home_id = $1', [id])
        res.send(deletedHome)
    } catch (error) {
        res.send(error)
    }
})

app.listen(PORT)