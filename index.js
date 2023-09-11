import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'  
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/books',booksRoute)

app.get('/', (req, res) => {
    res.status(418).json({ msg: "Hello there" })
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Connected to DB`)
        app.listen(process.env.PORT, () => {
            console.log(`Alive on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
