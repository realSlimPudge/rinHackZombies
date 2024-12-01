import fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;

// Настройки подключения к базе данных PostgreSQL
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123',
  database: 'images',
});

// Создание таблицы, если она не существует
async function createTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS images (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      url TEXT NOT NULL,
      description TEXT,
      image_data BYTEA
    );
  `;
  try {
    await client.query(createTableQuery);
    console.log('Table "images" created or already exists');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

// Чтение данных из файла images.json
function readImagesDataFromFile(api_data) {
  return new Promise((resolve, reject) => {
    fs.readFile('images.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Функция для вставки данных в базу данных
export async function insertImages(api_data) {
  client.connect();
  try {
    // Создаем таблицу, если она не существует
    await createTable();

    // Чтение данных из JSON файла
    console.log("Images Data:", api_data);  // Выводим данные для проверки

    // Перебираем все изображения и вставляем их в базу данных
    for (const image of api_data) {
      // Проверяем, что все обязательные поля заполнены
      if (!image.title || !image.url || !image.base64Image) {
        console.error(`Skipping image due to missing data:`, image);
        continue;  // Пропускаем изображения с пустыми полями
      }

      // Преобразуем base64 строку в массив байтов
      let imageData;
      try {
        imageData = Buffer.from(image.base64Image, 'base64');
      } catch (err) {
        console.error('Error decoding base64:', err);
        continue;
      }

      // SQL запрос для вставки данных
      const query = 'INSERT INTO images (title, url, description, image_data) VALUES ($1, $2, $3, $4)';
      const values = [image.title, image.url, image.description, imageData];

      try {
        await client.query(query, values);
        console.log(`Inserted image: ${image.title}`);
      } catch (err) {
        console.error('Error inserting image:', err);
      }
    }
  } catch (err) {
    console.error('Error reading images data:', err);
  } finally {
    // Закрытие подключения после завершения работы
    client.end();
  }
}
