const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const $ = require('jquery');

var reqInfo;
var dec = 0;
var count = 0;

var port = process.env.PORT || 3002;

let env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('engine', env);

require('useful-nunjucks-filters')(env);

app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/viewResponse', (req, res) => {

    res.send({status: 200, reqInfo: reqInfo, dec: dec, count: count});
});

app.post('/send', (req, res) => {
    try {
        console.log("Chegou request", req.body.info);

        reqInfo = req.body.info

        var sp = req.body.info.split(' + ')

        let bin = String(sp[0]);
        // let dec = 0;
        // let count = 0;

        for (let c = 0; c < bin.length; c++) {
            dec += Math.pow(2, c) * bin[bin.length - c - 1]; //calcula para pegar do último ao primeiro
            if (bin[c] == 1) {
                count++
            }
        }

        if (count % 2 == 0) {
            console.log("sp[1]", sp[1]);
            console.log("Paridade par");
        } else {
            console.log("Paridade ímpar");
        }

        console.log("Decimal: ", dec);
        console.log("Quantidade de 1: ", count);

        res.render('index.html', {info: dec});

    } catch (error) {
        console.log("Application Error: ", error);
        res.send({status: 500});
    }
});

app.listen(port, () => {
    console.log('ESCUTANDO NA PORTA -> localhost:' + port);
});