
const mysql = require('mysql');
const login = require('..\\middleware\\login_session');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


//register
exports.register = (req, res) => {

    const {name, email, password} = req.body;

    connection.query("INSERT INTO `applier`(`name`, `email`, `pass`) VALUES (?,?,?)", 
        [name, email, password],
        (err, rows) => {
            if (!err) {
                res.status(200).send("Register successfully");
            } else if (err.errno == 1062) {
                res.status(422).send("This email is already being used");
            } else {
                console.log(err);
            }
    });
}


//login
exports.login = (req, res)=> {

    const {username, password} = req.body;

    connection.query("SELECT * FROM applier WHERE email = ? AND pass = ?",
        [username, password], 
        (err, rows) => {
            if (!err) {
                if (rows.length > 0) {

                    login.add_id(rows[0].applierID.toString());
                    
                    res.send(JSON.stringify({id:rows[0].applierID, message:"we are here!"}));
                } else {
                    res.status(422).send("Wrong username/password!!");
                }
            } else {
                console.log(err);
            } 
        });
}

//applier side
exports.applierHome = (req, res) => {

    if (login.search(req.params.id.toString()) !== null) {
        connection.query("SELECT name FROM applier WHERE applierID=?",
        [req.params.id],
        (err, rows) => {
            if (!err) {
                res.send(JSON.stringify({name: rows[0].name, result:true}));
            } else {
                throw err;
            }
        })
        
    } else {
        res.status(401).send(JSON.stringify({result:false}));
    }
}

//applier get profile
exports.applierGetProfile = (req, res) => {
    if (login.search(req.params.id.toString()) !== null) {
        connection.query("SELECT email, phone, address, age, gender, qualification, schedule FROM `applier` WHERE applierID=?",
        [req.params.id],
        (err, rows) => {
            if (!err) {
                if (rows[0].schedule) {
                    rows[0].schedule = rows[0].schedule.replace(/\s+/g, '').split(',');
                }
    
                res.status(200).send(JSON.stringify(rows));
            } else {
                throw err;
            }
        })
        
    } else {
        res.status(401).send(JSON.stringify({result:false}));
    }
}

//applier update profile
exports.applierUpdateProfile = (req, res) => {

    if (login.search(req.params.id.toString()) !== null) {

        const {phone, address, age, qualification, gender, schedule} = req.body;
        var schedule_string = "";

        if (schedule) {
            schedule_string = schedule.join(',');
        }
        
        connection.query("UPDATE `applier` SET `phone`=?,`address`=?,`age`=?,`gender`=?,`qualification`=?,`schedule`=? WHERE applierID=?",
        [phone, address, age, gender, qualification, schedule_string, req.params.id],
        (err, rows) => {
            if (!err) {
                res.status(200).send(JSON.stringify({message:"Update successfully!"}));
            } else {
                throw err;
            }
        })
        
    } else {
        res.status(401).send(JSON.stringify({result:false}));
    }
}

//get unit list for the applier to apply
exports.getUnit = (req, res) => {
    if (login.search(req.params.id.toString()) !== null) {
        connection.query("SELECT * FROM `unit` WHERE NOT (unit.unit_id  IN (SELECT applied_unit.unit_id FROM applied_unit WHERE applied_unit.applier_id = ?))",
        [req.params.id],
        (err, rows) => {
            if (!err) {
                res.send(JSON.stringify(rows));
            } else {
                throw err;
            }
            
        });
    } else {
        res.status(401).send(JSON.stringify({result:false}));
    }
}

//apply to the unit
exports.applyUnit = (req, res) => {

    if (login.search(req.params.id.toString()) !== null) {
        const {unit_code} = req.body;

        connection.query("INSERT INTO `applied_unit`(`applier_id`, `unit_id`) VALUES (?, ?)",
        [req.params.id, unit_code],
        (err, rows) => {
            if (!err) {
                res.send(JSON.stringify({message:"Apply unit " + unit_code.toUpperCase() + " successfully!"}));
            } else {
                throw err;
            }
        });
    } else {
        res.status(401).send(JSON.stringify({result:false}));
    }
}

//get unit list for the applier to apply
exports.getAppliedUnit = (req, res) => {
    if (login.search(req.params.id.toString()) !== null) {
        connection.query("SELECT * FROM `unit` WHERE (unit.unit_id  IN (SELECT applied_unit.unit_id FROM applied_unit WHERE applied_unit.applier_id = ?))",
        [req.params.id],
        (err, rows) => {
            if (!err) {
                res.send(JSON.stringify(rows));
            } else {
                throw err;
            }
            
        });
    } else {
        res.status(401).send(JSON.stringify({result:false}));
    }
}

//withdraw the unit
exports.withdrawUnit = (req, res) => {

    if (login.search(req.params.id.toString()) !== null) {
        const {unit_code} = req.body;

        connection.query("DELETE FROM applied_unit WHERE `applied_unit`.`applier_id` = ? AND `applied_unit`.`unit_id` = ?",
        [req.params.id, unit_code],
        (err, rows) => {
            if (!err) {
                res.send(JSON.stringify({message:"Withdraw unit " + unit_code.toUpperCase() + " successfully!"}));
            } else {
                throw err;
            }
        });
    } else {
        res.status(401).send(JSON.stringify({result:false}));
    }
}

//logout
exports.logout = (req, res) => {

    login.remove_id(req.params.id.toString())
    res.send("you logout successfully");
}

exports.a = (req, res) => {
    // login.add_id("www");
    // console.log(login.getAll());
    // res.status(200).send(login.get(0));
}