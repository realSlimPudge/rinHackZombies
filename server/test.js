import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'images_db',  // Убедитесь, что это правильное имя базы данных
  password: '123',
  port: 5432,
});

client.connect();