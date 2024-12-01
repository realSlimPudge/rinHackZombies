import fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;

// Настройки подключения к базе данных PostgreSQL
const client = new Client({
  host: '109.120.138.252',
  port: 5432,
  user: 'postgres',
  password: '123',
  database: 'images',
});


// Функция для вставки одного изображения в базу данных
export async function insertImage(imageData) {
  client.connect();
  try {

    // Предположим, что переданная строка imageData — это Base64 строка
    if (!imageData) {
      console.error('No Base64 data provided');
      return;
    }



    // Предположим, что нам нужно вставить только одно изображение с заранее заданными title, url и description
    const title = "Фотка";


    // SQL запрос для вставки данных
    const query = 'INSERT INTO images (title, url) VALUES ($1, $2)';
    const values = [title, imageData];

    // Вставляем данные в базу
    try {
      await client.query(query, values);
      console.log(`Inserted image with title: ${title}`);
    } catch (err) {
      console.error('Error inserting image:', err);
    }
  } catch (err) {
    console.error('Error inserting image data:', err);
  } finally {
    // Закрытие подключения после завершения работы
    client.end();
  }
}
