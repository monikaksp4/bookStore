const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose')
const app = express();
let port = 1234;
const path=require('path');
const config = require('./DB');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
const BookRoute=require('./Routes/BookRoutes');


app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const wwwPath = path.join(__dirname, 'www');
app.use('/', express.static(wwwPath));
app.use('/book',BookRoute);
// var https = require('https');
// https.createServer(options, app).listen(process.env.PORT || PORT, () => {
//   console.log('Server is running on Port:',PORT);
// });

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});