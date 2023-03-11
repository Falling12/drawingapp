import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';
import coookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(coookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})