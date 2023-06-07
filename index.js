const express = require('express');
const router = require('./routers/router.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}/`); 
        })
    } catch (e) {
        console.log(e);
    }
}

start();