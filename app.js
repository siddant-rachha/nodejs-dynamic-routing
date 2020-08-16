const express = require('express');
const bodyParser = require('body-parser');
const uploadsHandler = require('./routes/uploadsHandler')
const path = require('path')


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}))


app.use(uploadsHandler)
// app.use(express.static(path.join(__dirname,'public'))) 
app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1><a href="uploads"><button>Go to Uploads</button></a>')
})
app.use('/',(req,res)=>{
    res.send('<h1>Page Not Found<br>404</h1>')
})

app.listen(3000);