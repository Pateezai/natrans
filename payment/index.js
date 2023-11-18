import express from 'express'
import cors from 'cors'
// import dotenv from "dotenv"
import router from './routes/route.js';


// dotenv.config()
const app = express();
const PORT = 3000;


//middleware
app.use(express.json())
app.use(cors())


//api route
app.use('/payment', router)




app.listen(PORT, ()=>{
    console.log(`connected to Payment Server! localhost:${PORT}`)
})
