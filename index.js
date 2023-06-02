require('dotenv').config(); // To load environment variables from .env file
const express = require('express'); // to import

const app = express(); // to initialize


const PORT = process.env.SERVER_PORT || 4000; //default PORT is 4000 incase .env fails

app.listen(
    PORT, 
    ()=>{
    console.log(`Server is running on PORT: ${PORT} at https://localhost/${PORT}`);
}
);