const { pool } = require('../db');

const searchCustomers = async (req, res) => {
    // Extract search query parameter from the query string
    const searchQuery = req.query.search ? `%${req.query.search}%` : '';

    try {
        // Construct the SQL query to search for customers by name or location
        const query = `
            SELECT * FROM customers
            WHERE customer_name ILIKE $1 OR location ILIKE $1
            ORDER BY created_at DESC;
        `;
        const { rows } = await pool.query(query, [searchQuery]);

        // Render the index.ejs view with the search results
        res.render('index.ejs', { 
            customers: rows, 
            search: req.query.search, 
            formatDate 
        });
    } catch (err) {
        console.error('Error searching customers: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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

module.exports = { searchCustomers };
