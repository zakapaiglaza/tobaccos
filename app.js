const mysql = require('mysql')
const express = require('express')
const Routes = require('./routes/routes');


const port = 3000;
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '1',
    database: 'hookah'
})

connection.connect((err) => {
    if(err) {
        console.error('err:', err);
        return;
    }
    
    console.log('connect to db');
})

const routes = Routes(connection);
app.use('/',routes);



app.listen(port, (err) =>{
    err ? console.log(err) : console.log(`listening port ${port}`);
});



module.exports = connection; 