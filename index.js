const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//
// MIDDLEWARE
// 

app.use(cors());
app.use(express.json());

//
// ROUTES: BILLS
//

// create bill

app.post('/bills', async (req, res) => {
    try {
        const { restaurant } = req.body;
        const newBill = await pool.query(
            `INSERT INTO bill (restaurant) 
                VALUES($1) 
                RETURNING *`, 
            [restaurant]
        );
        res.json(newBill.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

// get all bills

app.get('/bills', async (req, res) => {
    try {
        const allBills = await pool.query(
            `SELECT * FROM bill`
        );
        res.json(allBills.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a bill

app.get('/bills/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const bill = await pool.query(
            `SELECT * FROM bill WHERE bill_id = $1`,
            [id]
        );
        res.json(bill.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update a bill

app.put('/bills/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { restaurant } = req.body;
        const updateBill = await pool.query(
            `UPDATE bill SET restaurant = $1 
                WHERE bill_id = $2`,
            [restaurant, id]
        );
        res.json("Success");
    } catch (err) {
        console.error(err.message);
    }
})

// delete a bill

app.delete("/bills/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBill = await pool.query(
            `DELETE FROM bill WHERE bill_id = $1`,
            [id]
        );
        res.json("Success");
    } catch (err) {
        console.log(err.message);
    }
})


//
// ROUTES: PATRONS
//

// create patron

app.post('/patrons', async (req, res) => {
    try {
        const b = req.body;
        const newPatron = await pool.query(
            `INSERT INTO patron 
                (name_first, name_last, phone) 
                VALUES ($1, $2, $3) 
                RETURNING *`, 
            [ b.name_first, b.name_last, b.phone ]
        );
        res.json(newPatron.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

// get all patrons

app.get('/patrons', async (req, res) => {
    try {
        const allPatrons = await pool.query(
            `SELECT * FROM patron`
        );
        res.json(allPatrons.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a patron

app.get('/patrons/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patron = await pool.query(
            `SELECT * FROM patron 
                WHERE patron_id = $1`,
            [id]
        );
        res.json(patron.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update a patron

app.put('/patrons/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const b = req.body;
        const updatePatron = await pool.query(
            `UPDATE patron 
                SET (name_first, name_last, phone) 
                = ($1, $2, $3) 
                WHERE patron_id = $4`,
            [ b.name_first, b.name_last, b.phone, id ]
        );
        res.json("Success");
    } catch (err) {
        console.error(err.message);
    }
})

// delete a patron

app.delete("/patrons/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBill = await pool.query(
            `DELETE FROM patron 
                WHERE patron_id = $1`,
            [id]
        );
        res.json("Success");
    } catch (err) {
        console.log(err.message);
    }
})



app.listen(3000, () => console.log('App running on port 3000.'));
