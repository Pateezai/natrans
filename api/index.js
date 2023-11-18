import express from 'express';
import cors from "cors"
import morgan from 'morgan';
import router from './routes/route.js';


const app = express();
// Connect to MongoDB (make sure to replace 'your-database-uri' with your actual database URI)

const PORT = 4000;



// Middleware
app.use(cors())
app.use(express.json());
app.use(morgan('tiny'));


// //api route
app.use('/api', router)



app.listen(PORT, ()=>{
    console.log(`connected to Route Server! localhost:${PORT}`)
})
