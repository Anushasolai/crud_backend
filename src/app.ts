import express,{Request,Response} from 'express';
import { checkConnection } from './dbConfig';
import userRoutes from './routes/userRoutes'

const app =express();

const PORT=3000;

app.get('/',(req:Request,res:Response)=>{
   res.send('SuccessFully Connected ')
})


app.use(express.json())

app.use('/user',userRoutes)


app.listen(PORT,()=>{
    console.log(`Listening port${PORT}`);
    checkConnection()
})