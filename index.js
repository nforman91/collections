require('dotenv').config();
const server = require('./api/server');

const { PORT } = require('./api/secrets');

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})
