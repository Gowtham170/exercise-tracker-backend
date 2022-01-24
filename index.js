const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const userRouter = require('./route/user');
const exerciseRouter = require('./route/exercise');


const app = express();
const env = require('dotenv');
env.config();


const connectionString = process.env.MONGODB_URL;
const port = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());

// connected to the mongoDB using the connection string
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log("MongoDB Connected");
})

app.use('/user', userRouter);
app.use('/exercise', exerciseRouter);

app.listen(port, () => {
    console.log(`Server is running on the http://localhost:${port}`);
}); 