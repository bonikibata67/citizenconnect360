import express from 'express';
import cors from 'cors'; 
import authroutes from './routes/authroutes';
import { ensureRoles } from './ensureroles';
import viewsroutes from './routes/viewsroutes';
import incidentsRouter from './routes/incidentroutes';
import pollroutes from './routes/pollroutes'
import bodyParser from 'body-parser';


const app = express();




app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use('/polls', pollroutes);
app.use('/auth', authroutes); 
app.use('/views', viewsroutes);
app.use('/incidents', incidentsRouter); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
}

);
