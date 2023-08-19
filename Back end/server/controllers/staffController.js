const { json } = require('express');
const mysql = require('mysql');
var fs = require('fs');

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME

});

exports.addUnit = (req, res) => {

    const {code, name, description, date, time} = req.body;

    connection.query("INSERT into `unit` (`unit_id`, `name`, `description`, `date`, `time`) VALUES (?, ?, ?, ?, ?)",
        [code, name, description, date, time],
        (err, rows) => {
            if (!err) {
                res.status(200).send(JSON.stringify({message:"Adds successfully"}));
            } else if (err.errno == 1062) {
                res.status(422).send(JSON.stringify({message:"The unit is already added"}));
            } else {
                console.log(err);
            }
        })
}

exports.viewAppliedUnitList = (req, res) => {

    connection.query("SELECT applied_unit.unit_id AS \"code\", unit.name AS \"unitName\", applier.applierID AS \"applierId\", applier.name AS \"applierName\" FROM applied_unit INNER JOIN unit ON applied_unit.unit_id = unit.unit_id INNER JOIN applier ON applier.applierID = applied_unit.applier_id ORDER BY applied_unit.unit_id, applier.name ASC",
        (err, rows) => {
            res.send(JSON.stringify(rows));
        }
    );
}

exports.getApplierDetail = (req, res) => {

    connection.query("SELECT name, email, phone, address, age, gender, qualification, schedule FROM `applier` WHERE applierID=?",
        [req.params.id],
        (err, rows) => {

            // if (rows[0].schedule) {
            //     var file = fs.readFileSync(rows[0].schedule)
            //     rows[0].schedule = file.toString('base64');
            // }
            
            if (rows[0].schedule) {
                rows[0].schedule = rows[0].schedule.replace(/\s+/g, '').split(',');
            }

            res.send(JSON.stringify(rows));
        }
    );
};