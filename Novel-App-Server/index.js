const express = require('express');
const app = express();

app.use(express.json());

app.get(`/api`, (req, res) => {
    res.status(200).send('Welcome to the API');
})

app.use(`api/auth`, authRoute)

app.listen(3000, () => {
    console.log('Server started on port 3000!');
});