import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

app.options('*', cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const smtp_key = process.env.MAIL_KEY;
console.log(smtp_key);

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',  
    port: 465,  
    secure: true, 
    auth: {
        user: 'imnomakj@mail.ru',
        pass: smtp_key,  
    }
});

// Обработка формы
app.post('/send-email', (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: 'imnomakj@mail.ru', //почта откуда будут приходить сообщения
        to: 'stax1x@bk.ru', //почта куда будут приходить сообщения 
        subject: 'Сообщение от пользователя сайта',
        text: `Сообщение от: ${email}\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Ошибка при отправке сообщения');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Сообщение успешно отправлено');
        }
    });
});


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});