import express from 'express';
import cron from 'node-cron';
// import { sqlConfig } from "../config/Emailservice";
// import { run as runEmailService } from './config/Emailservice';
import cors from 'cors'; 
import authroutes from './routes/authroutes';

const app = express();


// cron.schedule('*/10 * * * * *', async () => {
//     await runEmailService();
// });

app.use(cors());
app.use(express.json());

app.use('/auth', authroutes); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});