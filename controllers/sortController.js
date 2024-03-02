const { pool } = require('../db');

const sortCustomers = async (req, res) => {
    // Extract sorting parameter from the query string
    const sort = req.query.sort || 'date'; // Default sort by date
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
        let query;
        if (sort === 'date') {
            query = 'SELECT * FROM customers ORDER BY created_at DESC';
        } else if (sort === 'time') {
            query = 'SELECT * FROM customers ORDER BY EXTRACT(HOUR FROM created_at), EXTRACT(MINUTE FROM created_at), EXTRACT(SECOND FROM created_at)';
        }

        // Execute the query
        const { rows } = await pool.query(query);
        
        // Render the index.ejs view with the sorted data
        res.render('index.ejs', { customers: rows , formatDate });
    } catch (err) {
        console.error('Error getting customers: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { sortCustomers };
