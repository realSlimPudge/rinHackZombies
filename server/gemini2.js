import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к JSON-файлу
const jsonFilePath = path.join(__dirname, 'images.json');

async function saveImageToFile(imageId, outputPath) {
    try {
        // Чтение данных из JSON-файла
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

        // Поиск изображения по ID
        const image = data.find((img) => img.id === imageId);

        if (image) {
            // Конвертация Base64 обратно в бинарные данные и сохранение в файл
            const buffer = Buffer.from(image.image, 'base64');
            fs.writeFileSync(outputPath, buffer);
            console.log(`Изображение с ID ${imageId} сохранено в файл ${outputPath}`);
        } else {
            console.log('Изображение не найдено');
        }
    } catch (err) {
        console.error('Ошибка при извлечении изображения:', err);
    }
}

// Пример сохранения изображения с ID 1
saveImageToFile(1, 'output_image.jpg');