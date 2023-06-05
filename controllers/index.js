const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const route = express.Router();
const {User, Houses} = require('../models/index');

const user = new User();
const house = new Houses();

// Home route

route.get('^/$|/home', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, '../view/index.html'))
})


// ===Users====

// Retrieve all users

route.get('/users', (req, res)=>{
    user.fetchUsers(req, res);
});
// Retrieve single user
route.get('/user/:userID', (req, res)=>{
    user.fetchUser(req, res);
});
// Login
route.post('/login', bodyParser.json(),(req, res)=>{
    user.login(req, res);
});
// Register
route.post('/register', bodyParser.json(), (req, res)=> {
    user.createUser(req, res);
})

// Update
route.put('/user/:userID',bodyParser.json(), (req, res)=>{
    user.updateUser(req, res);
});
// Delete
route.delete('/user/:userID', (req, res)=>{
    user.deleteUser(req, res);
});
// =====Houses======
// Fetch all houses
route.get('/houses', (req, res)=> {
    house.fetchHouses(req, res);
})
// Fetch a single house
route.get('/house/:houseID',
(req, res)=> {
    house.fetchHouse(req, res);
})
// Add a new house
route.post('/house', 
bodyParser.json(), 
(req, res)=> {
    house.addHouse(req, res);
})
// Update a house
route.put('/house/:houseID', 
bodyParser.json(),
(req, res)=> {
    house.updateHouse(req, res);
})
// Delete a house
route.delete('/house/:houseID',
(req, res)=> {
    house.deleteHouse(req, res);
})

module.exports = route;