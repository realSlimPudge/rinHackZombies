import express  from 'express';
import nodemailer  from 'nodemailer';
import bodyParser  from 'body-parser';
import cors from 'cors'; //Cross-origin resource sharing
import dotenv from 'dotenv';
import {insertImage} from "./pgs.js"
dotenv.config();


const app = express();
const port = 3000;
// лимит для парсинга JSON
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));


const smtp_key = process.env.MAIL_KEY;
const mail_mail = process.env.MAIL_MAIL;
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',  
    port: 465,  
    secure: true, 
    auth: {
        user: `${mail_mail}`,
        pass: `${smtp_key}`,  
    }
});



app.post('/images', (req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    const { data } = req.body;
    insertImage(data);
})



// Обработка формы
app.post('/send-email', (req, res) => {
    const { email} = req.body;

    const mailOptions = {
        from: 'imnomakj@mail.ru', //почта откуда будут приходить сообщения
        to: email, //почта куда будут приходить сообщения 
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
