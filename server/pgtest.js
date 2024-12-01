import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost', // Локальный хост
  port: 5432,        // Порт по умолчанию
  user: 'postgres',  // Имя пользователя
  password: '123', // Пароль
  database: 'images_db' // Имя базы
});

(async () => {
  try {
    await client.connect();
    console.log('Connected to the local database');
  } catch (error) {
    console.error('Connection error', error.stack);
  } finally {
    await client.end();
  }
})();
