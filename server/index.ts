import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';
import cors from 'cors';
import coookieParser from 'cookie-parser';

const app = express();

app.use(coookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})