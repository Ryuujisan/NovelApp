import express from 'express';
import {dbConnection} from "./configs/db.js";
import userRoute from "./routes/user.route.js";
const app = express();

app.use(express.json());

app.use("/api/user", userRoute)

app.get(`/api`, (req, res) => {
    res.status(200).send('Welcome to the API');
})


dbConnection().then(() => {
    app.listen(3000, () => {
        console.log('Server started on port 3000!');
    });
})
