const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const userRouter = require('./route/user');
const exerciseRouter = require('./route/exercise');

const port = process.env.PORT;

const app = express();
const dotenv = require('dotenv');
dotenv.config();

//middleware
app.use(cors({
    origin: "https://62277279d969c4f6a462827d--netlify-thinks-gowtham170-is-great.netlify.app/"
}));
app.use(express.json());

// connected to the mongoDB using the connection string
mongoose.connect(process.env.MONGODB_URL, {
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
