const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.listen(3000, () => console.log(`App running on port 3000.`));

// middleware
app.use(cors());
app.use(express.json());

//
// ROUTES
//

// create bill

app.post('./bills', async (req, res) => {
    try {

        console.log(req.body);

    } catch (err) {
        console.log(err.message);
    }
})

// get all bills

// get a bill

// update a bill