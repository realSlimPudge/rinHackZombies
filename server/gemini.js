import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// Получение пути к текущей директории в ES-модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Путь к JSON-файлу
const jsonFilePath = path.join(__dirname, 'images.json');

// Функция для чтения файла как бинарные данные
async function convertImageToBinary(imagePath) {
    return fs.readFileSync(imagePath);
}

async function saveImages() {
    try {
        // Пример данных с изображениями
        const images = [
            {
                id: 1,
                image: (await convertImageToBinary(path.join(__dirname, "siski.jpg"))).toString('base64'), // Конвертация в Base64
                description: 'Цветы',
            },
            {
                id: 2,
                image: (await convertImageToBinary(path.join(__dirname, "lina.jpg"))).toString('base64'), // Конвертация в Base64
                description: 'Цветы',
            },
        ];

        // Сохранение данных в JSON-файл
        fs.writeFileSync(jsonFilePath, JSON.stringify(images, null, 2));
        console.log('Изображения сохранены в JSON-файл:', jsonFilePath);
    } catch (err) {
        console.error('Ошибка при сохранении изображений:', err);
    }
}

saveImages();
