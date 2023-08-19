// Routes 

const express = require('express');
const routes = express.Router();
const staffController = require("../controllers/staffController");
const applierControler = require("../controllers/applierController");

//back-up plan for the applier
routes.post('/login', applierControler.login);
routes.post('/register',applierControler.register);
routes.get('/applier/:id', applierControler.applierHome);
routes.get('/applier/applierProfile/:id', applierControler.applierGetProfile);
routes.post('/applier/applierProfile/:id', applierControler.applierUpdateProfile);
routes.get('/applier/unit/:id', applierControler.getUnit);
routes.post('/applier/unit/:id', applierControler.applyUnit);
routes.get('/applier/appliedUnit/:id', applierControler.getAppliedUnit);
routes.post('/applier/withdrawUnit/:id', applierControler.withdrawUnit);
routes.get('/logout/:id', applierControler.logout);

//staff server
routes.get('/GetApplierDetail/:id', staffController.getApplierDetail);
routes.get('/ViewAppliedUnitList', staffController.viewAppliedUnitList);
routes.post('/AddUnit', staffController.addUnit);

routes.get('/a',applierControler.a);

module.exports = routes;