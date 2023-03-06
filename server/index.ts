import express from 'express';
import router from './routes/index';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})