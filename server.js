require('dotenv').config();
const express = require('express');
const cors = require('cors');;
const app = express();
app.use(express.json());

const corsOptions = {
    orgin: ['http://localhost:3000'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}

app.use(cors(corsOptions));

app.post('/rating', (req, res) => {
    const { body } = req;
    console.log(body.userMsg);
    console.log(body.botMsg);
    console.log(body.ratingValue);
    res.send({status: "It worked!"});
});

app.listen(process.env.PORT);

