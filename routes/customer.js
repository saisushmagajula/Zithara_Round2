const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer');
const searchController = require('../controllers/searchController');
const sortController = require('../controllers/sortController');
// Route to get all customers
router.get('/customers', customerController.getAllCustomers);

// Route to handle search
router.get('/search', searchController.searchCustomers);

router.get('/sort', sortController.sortCustomers);

module.exports = router;
