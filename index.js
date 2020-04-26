//aka server.js in class. 

const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

require('./db/db.js');

app.set('view engine',  'ejs');


const codexController = require('./controllers/codexController.js')
app.use('/codex', codexController)

const kindleController = require('./controllers/kindleController.js')
app.use('/kindle', kindleController)


app.get('/', (req, res) => {
    res.render('home.ejs')
})


















app.listen(3000, () => {

    console.log("app running on port 3000")

})