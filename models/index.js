const database = require('../config/database');
// bcrypt module
const {hash, compare, hashSync } = require('bcrypt');
// Middleware for creating a token
const {createToken} = require('../middleware/AuthenticatedUser');

// User
class User {
    login(req, res) {
        const {emailAddress, userPassword} = req.body;
        const strQry = 
        `
        SELECT userName, emailAddress, userPassword
        FROM Users
        WHERE emailAddress = '${emailAddress}';
        `;
        database.query(strQry, async (err, data)=>{
            if(err) throw err;
            if((!data.length) || (data == null)) {
                res.status(401).json({err: 
                    "You provided the wrong email address"});
            }else {
                await compare(userPassword, 
                    data[0].userPassword, 
                    (cErr, cResult)=> {
                        if(cErr) throw cErr;
                        // Create a token
                        const jwToken = 
                        createToken(
                            {
                                emailAddress, userPassword
                            }
                        );
                        // Saving
                        res.cookie('LegitUser',
                        jwToken, {
                            maxAge: 3600000,
                            httpOnly: true,
                            path: '/'
                        })
                        if(cResult) {
                            res.status(200).json({
                                msg: 'Logged in',
                                jwToken,
                                result: data[0]
                            })
                        }else {
                            res.status(401).json({
                                err: 'You entered an invalid password or you are not registered. '
                            })
                        }
                    })
            }
        })     
    }
    fetchUsers(req, res) {
        const strQry = 
        `
        SELECT userID, userName, emailAddress, userPassword
        FROM Users;
        `;
        //database
        database.query(strQry, (err, data)=>{
            if(err) console.log(err);
            else res.status(200).json( 
                {results: data} );
        })
    }

    
    fetchUser(req, res) {
        const strQry = 
        `
        SELECT userID, userName, emailAddress
        FROM Users
        WHERE userID = ?;
        `;
        //db
        database.query(strQry,[req.params.userID], 
            (err, data)=>{
            if(err) throw err;
            else res.status(200).json( 
                {results: data} );
        })

    }


    async createUser(req, res) {
        // Payload
        let details = req.body;
        // Hashing user password
        details.userPassword = await 
        hash(details.userPassword, 15);
        // This information will be used for authentication.
        let user = {
            emailAddress: details.emailAddress,
            userPassword: details.userPassword
        }
        // sql query
        const strQry =
        `INSERT INTO Users
        SET ?;`;
        database.query(strQry, [details], (err)=> {
            if(err) {
                res.status(401).json({err});
            }else {
                // Create a token
                const jwToken = createToken(user);
                // This token will be saved in the cookie. 
                // The duration is in milliseconds.
                res.cookie("LegitUser", jwToken, {
                    maxAge: 3600000,
                    httpOnly: true,
                    path: '/'
                });
                res.status(200).json({msg: "A user record was saved."})
            }
        })    
    }


    updateUser(req, res) {
        let data = req.body;
        if(data.userPassword !== null || 
            data.userPassword !== undefined)
            data.userPassword = hashSync(data.userPassword, 15);
        const strQry = 
        `
        UPDATE Users
        SET ?
        WHERE userID = ?;
        `;
        //database
        database.query(strQry,[data, req.params.userID], 
            (err)=>{
            if(err) throw err;
            res.status(200).json( {msg: 
                "A row was affected"} );
        })    
    }
    deleteUser(req, res) {
        const strQry = 
        `
        DELETE FROM Users
        WHERE userID = ?;
        `;
        //database
        database.query(strQry,[req.params.userID], 
            (err)=>{
            if(err) throw err;
            res.status(200).json( 
                {msg: 
                    "A record was removed from a database"
            } );
        })    
    }
}

// Houses
class Houses {
    fetchHouses(req, res) {
        const strQry = `SELECT houseID, houseDescription, 
        location, price, imgURL
        FROM Houses;`;
        database.query(strQry, (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });
    }
    fetchHouse(req, res) {
        const strQry = `SELECT houseID, houseDescription, 
        location, price, imgURL
        FROM Houses
        WHERE houseID = ?;`;
        database.query(strQry, [req.params.houseID], (err, results)=> {
            if(err) throw err;
            res.status(200).json({results: results})
        });

    }
    addHouse(req, res) {
        const strQry = 
        `
        INSERT INTO Houses
        SET ?;
        `;
        database.query(strQry,[req.body],
            (err)=> {
                if(err){
                    res.status(400).json({err: "Unable to insert a new record."});
                }else {
                    res.status(200).json({msg: "House saved"});
                }
            }
        );    

    }
    updateHouse(req, res) {
        const strQry = 
        `
        UPDATE Houses
        SET ?
        WHERE houseID = ?
        `;
        database.query(strQry,[req.body, req.params.houseID],
            (err)=> {
                if(err){
                    res.status(400).json({err: "Unable to update a record."});
                }else {
                    res.status(200).json({msg: "House updated"});
                }
            }
        );    

    }
    deleteHouse(req, res) {
        const houseId = req.params.houseID;
        const strQry = `DELETE FROM Houses WHERE houseID = ?`;
        database.query(strQry, [houseId], (err, result) => {
          if (err) throw err;
          if (result.affectedRows === 0) {
            console.log(`House ${houseId} not found or not authorized`);
            return res.status(404).json({ error: "House not found or not authorized" });
          }
          console.log(`House ${houseId} deleted successfully`);
          res.status(200).json({msg: "House deleted"});
          res.status(204).end();
        });
      }
      
      

}


// Exporting All classes
module.exports = {
    User,
    Houses
}