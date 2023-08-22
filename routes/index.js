// Imports for express and api pathway
const router = require('express').Router();
const apiRoutes = require('./api');
// middleware for the routes
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));
// export
module.exports = router;