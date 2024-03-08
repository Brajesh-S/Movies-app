// const express = require('express');
// const axios = require('axios');
// const router = express.Router();

// const TMDB_API_ACCESS_TOKEN = process.env.TMDB_API_ACCESS_TOKEN


// // Fetch popular movies
// router.get('/popular', async (req, res) => {
//   try {
//     const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
//       params: {
//         language: 'en-US',
//         page: 1,
//       },
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,

//       },
//     });

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;