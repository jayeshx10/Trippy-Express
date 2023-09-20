const express = require('express');
const initializeDatabase = require('./db.connection');
const destinationsRouter = require('./routers/destinations.router.js');

const app = express();
app.use(express.json());

initializeDatabase();

app.get('/', (req, res) => {
  res.send("Express app started.")
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

app.use('/destinations', destinationsRouter);