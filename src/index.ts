import 'dotenv/config';
import express from 'express';
import cors from 'cors';

//import participanteRouter from './api/participante.api';
//import reuniaoRouter from './api/reuniao.api';
import userRouter from './api/users.api';

const app = express();

app.use(cors());
app.use(express.json());

//app.use('/api/participante', participanteRouter);
//app.use('/api/reuniao', reuniaoRouter);
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
},);
