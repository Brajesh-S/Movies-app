const express = require('express');
const router = express.Router();
const axios = require('axios');

const TMDB_API_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN;

// Search movies
router.get('/', async (req, res) => {
    console.log('Search route accessed!');
    try {
        const searchQuery = req.query.query;

        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
              },
              params: {
                query: searchQuery,
              }
        };

        const response = await axios.request(options);

        res.status(200).json(response.data.results); // Send only the movie results
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
