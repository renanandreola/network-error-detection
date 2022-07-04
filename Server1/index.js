const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const axios = require('axios');

var port = process.env.PORT || 3001;

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

app.post('/send', async (req, res) => {
    try {
        console.log("req.body", req.body);

        var info = parseInt(req.body.info);

        var info2 = parseInt(info.toString(2));
    
        if (req.body &&  req.body.info && info2) {
            console.log("Informação: ", info2);

            let bin = String(info2);
            let dec = 0;
            let count = 0;

            for (let c = 0; c < bin.length; c++) {
                dec += Math.pow(2, c) * bin[bin.length - c - 1]; //calcula para pegar do último ao primeiro
                if (bin[c] == 1) {
                    count++
                } 
            }

            if (count % 2 == 0) {
                console.log("Paridade par");
                info2 = info2 + ' + 1'
            } else {
                console.log("Paridade ímpar");
                info2 = info2 + ' + 0'
            }

            console.log("Decimal: ", dec);
            console.log("Quantidade de 1: ", count);

            const response = await axios.post('http://localhost:3002/send', {
               info: info2
            });
            
            res.send({status: 200, information: req.body.info, infoParidade: info2, qtd1: count});
        }

    } catch (error) {
        console.log(error);
        res.send({status: 500});
    }
});

app.listen(port, () => {
    console.log('ESCUTANDO NA PORTA -> localhost:' + port);
});