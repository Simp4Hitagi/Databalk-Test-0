const express = require('express'); // to import
const app = express(); // to initialize

const port = 1000;

app.listen(port, ()=>{
    console.log(`Server is running on ${port} at https://localhost/${port}`);
})