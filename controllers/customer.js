const { pool } = require('../db');

const getAllCustomers = async (req, res) => {
    // Define formatDate function
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return {
        date: formattedDate.split(',')[0],
        time: formattedDate.split(',')[1].trim()
    };
}

  try {
    const { rows } = await pool.query('SELECT * FROM customers');
    res.render('index.ejs', { customers: rows , formatDate });
  } catch (err) {
    console.error('Error getting customers: ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllCustomers };
