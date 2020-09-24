const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

let projectData = {};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

const port = 3000;
const listening = port => {
    console.log('listening on port', port)
}

app.get('/returnData', (req, res) => res.send(projectData))

app.post('/addData', addData);

function addData (req, res) {
    console.log(req);
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    res.send(projectData)
}

const server = app.listen(port, listening(port));
