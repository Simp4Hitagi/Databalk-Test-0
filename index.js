require('dotenv').config(); // To load environment variables from .env file
const express = require('express'); // to import
const {createToken, verifyAToken, authenticateToken} = require('./middleware/AuthenticatedUser')
const {errorHandling} = require('./middleware/ErrorHandling');
const cookieParser = require('cookie-parser');
const route = require('./controllers/index');
const cors = require('cors');

const app = express(); // to initialize



let corsOptions =  {
    origin: 'http://localhost:3000'
}

app.use( 
    (req, res, next)=> {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Credentials", "true")
        res.header("Access-Control-Allow-Methods", "*")
        res.header("Access-Control-Allow-Headers", "*")
        next();
    });


app.use(
    cookieParser(),
    cors(),
    route,
    express.json(),
    express.urlencoded({extended: true})
)
app.use(createToken, verifyAToken, authenticateToken)
app.use(errorHandling);


const PORT = process.env.SERVER_PORT || 4000; //default PORT is 4000 incase .env fails

app.listen(
    PORT, 
    ()=>{
    console.log(`Server is running on PORT: ${PORT} at http://localhost:${PORT}`);
}
);