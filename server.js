require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { insertInto } = require('./mysqlQueries');

const app = express();
app.use(express.json());


const corsOptions = {
    orgin: ['http://localhost:3000'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}

app.use(cors(corsOptions));

app.post('/rating', (req, res) => {
    insertInto(req.body);
    res.send({status: "Records successfully inserted"});
});

app.listen(process.env.PORT);